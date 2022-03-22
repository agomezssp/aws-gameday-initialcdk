import { Stack, StackProps } from "aws-cdk-lib";
import {
  ISecurityGroup,
  IVpc,
  Peer,
  Port,
  SecurityGroup,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

interface SecurityStackProps extends StackProps {
  vpc: IVpc;
}

export class GameDaySecurityStack extends Stack {
  public readonly bastionSecurityGroup: ISecurityGroup;

  constructor(scope: Construct, id: string, props: SecurityStackProps) {
    super(scope, id, props);

    const { vpc } = props;

    // SG para el bastion
    const bastionSecurityGroup = new SecurityGroup(
      this,
      "BastionSecurityGroup",
      {
        vpc: vpc,
        allowAllOutbound: true,
        description: "Security group for bastion host",
        securityGroupName: "BastionSecurityGroup",
      }
    );

    // ssh
    bastionSecurityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(22),
      "SSH access"
    );

    this.bastionSecurityGroup = bastionSecurityGroup;
  }
}
