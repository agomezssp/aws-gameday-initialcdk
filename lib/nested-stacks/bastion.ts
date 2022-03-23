import {Aws, aws_ec2, CfnOutput, NestedStack, NestedStackProps} from "aws-cdk-lib";
import {BastionHostLinux} from "aws-cdk-lib/aws-ec2";
import {Construct} from "constructs";

export class Bastion extends NestedStack {
  constructor(scope: Construct, id: string, props: NestedStackProps & {vpc: aws_ec2.IVpc, bastionSg: aws_ec2.ISecurityGroup}) {
    super(scope, id, props);

    // const vpc = Vpc.fromVpcAttributes(this, "VPC", {
    //   vpcId: Fn.importValue("vpc-id"),
    //   availabilityZones: Stack.of(this).availabilityZones,
    //   //publicSubnetIds: Fn.importValue("public-subnet-ids").split(","),
    // });

    const {vpc, bastionSg} = props;
    
    const bastion = new BastionHostLinux(this, "GameDayBastionHost", {
      instanceName: "GameDayBastionHost",
      vpc,
      securityGroup: bastionSg,
      subnetSelection: {
        subnetType: aws_ec2.SubnetType.PUBLIC,
      },
    });

    new CfnOutput(this, "BastionhostId", {
      value: bastion.instanceId,
      description: "ID del bastion",
      exportName: "bastion-instance-id",
    });

    // new CfnOutput(this, "PublicIp", {
    //   value: bastion.instancePublicIp,
    //   description: "IP Publico del bastion",
    //   exportName: "bastion-public-ip",
    // });

    const profile = this.node.tryGetContext("profile");
    const createSshKeyCommand = "ssh-keygen -t rsa -f my_rsa_key";
    const pushSshKeyCommand = `aws ec2-instance-connect send-ssh-public-key --region ${
      Aws.REGION
    } --instance-id ${bastion.instanceId} --availability-zone ${
      bastion.instanceAvailabilityZone
    } --instance-os-user ec2-user --ssh-public-key file://my_rsa_key.pub ${
      profile ? `--profile ${profile}` : ""
    }`;
    const sshCommand = `ssh -o "IdentitiesOnly=yes" -i my_rsa_key ec2-user@${bastion.instancePublicDnsName}`;

    new CfnOutput(this, "CreateSshKeyCommand", { value: createSshKeyCommand });
    new CfnOutput(this, "PushSshKeyCommand", { value: pushSshKeyCommand });
    new CfnOutput(this, "SshCommand", { value: sshCommand });
  }
}
