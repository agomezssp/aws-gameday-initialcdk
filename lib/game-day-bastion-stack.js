"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDayBastionStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
class GameDayBastionStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // const vpc = Vpc.fromVpcAttributes(this, "VPC", {
        //   vpcId: Fn.importValue("vpc-id"),
        //   availabilityZones: Stack.of(this).availabilityZones,
        //   //publicSubnetIds: Fn.importValue("public-subnet-ids").split(","),
        // });
        const { vpc } = props;
        const bastionSecurityGroup = new aws_cdk_lib_1.aws_ec2.SecurityGroup(this, "BastionSecurityGroup", {
            vpc: vpc,
            allowAllOutbound: true,
            description: "Security group for bastion host",
            securityGroupName: "BastionHostSecurityGroup",
        });
        bastionSecurityGroup.addIngressRule(aws_cdk_lib_1.aws_ec2.Peer.anyIpv4(), aws_cdk_lib_1.aws_ec2.Port.tcp(22), "SSH access");
        const bastion = new aws_ec2_1.BastionHostLinux(this, "GameDayBastionHost", {
            instanceName: "GameDayBastionHost",
            vpc,
            securityGroup: bastionSecurityGroup,
            subnetSelection: {
                subnetType: aws_cdk_lib_1.aws_ec2.SubnetType.PUBLIC,
            },
        });
        new aws_cdk_lib_1.CfnOutput(this, "BastionhostId", {
            value: bastion.instanceId,
            description: "ID del bastion",
            exportName: "bastion-instance-id",
        });
        new aws_cdk_lib_1.CfnOutput(this, "PublicIp", {
            value: bastion.instancePublicIp,
            description: "IP Publico del bastion",
            exportName: "bastion-public-ip",
        });
        const profile = this.node.tryGetContext("profile");
        const createSshKeyCommand = "ssh-keygen -t rsa -f my_rsa_key";
        const pushSshKeyCommand = `aws ec2-instance-connect send-ssh-public-key --region ${aws_cdk_lib_1.Aws.REGION} --instance-id ${bastion.instanceId} --availability-zone ${bastion.instanceAvailabilityZone} --instance-os-user ec2-user --ssh-public-key file://my_rsa_key.pub ${profile ? `--profile ${profile}` : ""}`;
        const sshCommand = `ssh -o "IdentitiesOnly=yes" -i my_rsa_key ec2-user@${bastion.instancePublicDnsName}`;
        new aws_cdk_lib_1.CfnOutput(this, "CreateSshKeyCommand", { value: createSshKeyCommand });
        new aws_cdk_lib_1.CfnOutput(this, "PushSshKeyCommand", { value: pushSshKeyCommand });
        new aws_cdk_lib_1.CfnOutput(this, "SshCommand", { value: sshCommand });
    }
}
exports.GameDayBastionStack = GameDayBastionStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS1kYXktYmFzdGlvbi1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUtZGF5LWJhc3Rpb24tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQTZFO0FBQzdFLGlEQUE0RDtBQUc1RCxNQUFhLG1CQUFvQixTQUFRLG1CQUFLO0lBQzVDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBdUM7UUFDL0UsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFJeEIsbURBQW1EO1FBQ25ELHFDQUFxQztRQUNyQyx5REFBeUQ7UUFDekQsdUVBQXVFO1FBQ3ZFLE1BQU07UUFFTixNQUFNLEVBQUMsR0FBRyxFQUFDLEdBQUcsS0FBSyxDQUFDO1FBRXBCLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxxQkFBTyxDQUFDLGFBQWEsQ0FDcEQsSUFBSSxFQUNKLHNCQUFzQixFQUN0QjtZQUNFLEdBQUcsRUFBRSxHQUFHO1lBQ1IsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLGlCQUFpQixFQUFFLDBCQUEwQjtTQUM5QyxDQUNGLENBQUM7UUFDRixvQkFBb0IsQ0FBQyxjQUFjLENBQ2pDLHFCQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUN0QixxQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQ3BCLFlBQVksQ0FDYixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDL0QsWUFBWSxFQUFFLG9CQUFvQjtZQUNsQyxHQUFHO1lBQ0gsYUFBYSxFQUFFLG9CQUFvQjtZQUNuQyxlQUFlLEVBQUU7Z0JBQ2YsVUFBVSxFQUFFLHFCQUFPLENBQUMsVUFBVSxDQUFDLE1BQU07YUFDdEM7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNuQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFVBQVU7WUFDekIsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixVQUFVLEVBQUUscUJBQXFCO1NBQ2xDLENBQUMsQ0FBQztRQUVILElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQzlCLEtBQUssRUFBRSxPQUFPLENBQUMsZ0JBQWdCO1lBQy9CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsVUFBVSxFQUFFLG1CQUFtQjtTQUNoQyxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxNQUFNLG1CQUFtQixHQUFHLGlDQUFpQyxDQUFDO1FBQzlELE1BQU0saUJBQWlCLEdBQUcseURBQ3hCLGlCQUFHLENBQUMsTUFDTixrQkFBa0IsT0FBTyxDQUFDLFVBQVUsd0JBQ2xDLE9BQU8sQ0FBQyx3QkFDVix1RUFDRSxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3JDLEVBQUUsQ0FBQztRQUNILE1BQU0sVUFBVSxHQUFHLHNEQUFzRCxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUV6RyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDRjtBQWxFRCxrREFrRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBd3MsIGF3c19lYzIsIENmbk91dHB1dCwgRm4sIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBCYXN0aW9uSG9zdExpbnV4LCBWcGMgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVjMlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIEdhbWVEYXlCYXN0aW9uU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFja1Byb3BzICYge3ZwYzogYXdzX2VjMi5JVnBjfSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgXG5cbiAgICAvLyBjb25zdCB2cGMgPSBWcGMuZnJvbVZwY0F0dHJpYnV0ZXModGhpcywgXCJWUENcIiwge1xuICAgIC8vICAgdnBjSWQ6IEZuLmltcG9ydFZhbHVlKFwidnBjLWlkXCIpLFxuICAgIC8vICAgYXZhaWxhYmlsaXR5Wm9uZXM6IFN0YWNrLm9mKHRoaXMpLmF2YWlsYWJpbGl0eVpvbmVzLFxuICAgIC8vICAgLy9wdWJsaWNTdWJuZXRJZHM6IEZuLmltcG9ydFZhbHVlKFwicHVibGljLXN1Ym5ldC1pZHNcIikuc3BsaXQoXCIsXCIpLFxuICAgIC8vIH0pO1xuXG4gICAgY29uc3Qge3ZwY30gPSBwcm9wcztcblxuICAgIGNvbnN0IGJhc3Rpb25TZWN1cml0eUdyb3VwID0gbmV3IGF3c19lYzIuU2VjdXJpdHlHcm91cChcbiAgICAgIHRoaXMsXG4gICAgICBcIkJhc3Rpb25TZWN1cml0eUdyb3VwXCIsXG4gICAgICB7XG4gICAgICAgIHZwYzogdnBjLFxuICAgICAgICBhbGxvd0FsbE91dGJvdW5kOiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJTZWN1cml0eSBncm91cCBmb3IgYmFzdGlvbiBob3N0XCIsXG4gICAgICAgIHNlY3VyaXR5R3JvdXBOYW1lOiBcIkJhc3Rpb25Ib3N0U2VjdXJpdHlHcm91cFwiLFxuICAgICAgfVxuICAgICk7XG4gICAgYmFzdGlvblNlY3VyaXR5R3JvdXAuYWRkSW5ncmVzc1J1bGUoXG4gICAgICBhd3NfZWMyLlBlZXIuYW55SXB2NCgpLFxuICAgICAgYXdzX2VjMi5Qb3J0LnRjcCgyMiksXG4gICAgICBcIlNTSCBhY2Nlc3NcIlxuICAgICk7XG5cbiAgICBjb25zdCBiYXN0aW9uID0gbmV3IEJhc3Rpb25Ib3N0TGludXgodGhpcywgXCJHYW1lRGF5QmFzdGlvbkhvc3RcIiwge1xuICAgICAgaW5zdGFuY2VOYW1lOiBcIkdhbWVEYXlCYXN0aW9uSG9zdFwiLFxuICAgICAgdnBjLFxuICAgICAgc2VjdXJpdHlHcm91cDogYmFzdGlvblNlY3VyaXR5R3JvdXAsXG4gICAgICBzdWJuZXRTZWxlY3Rpb246IHtcbiAgICAgICAgc3VibmV0VHlwZTogYXdzX2VjMi5TdWJuZXRUeXBlLlBVQkxJQyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQmFzdGlvbmhvc3RJZFwiLCB7XG4gICAgICB2YWx1ZTogYmFzdGlvbi5pbnN0YW5jZUlkLFxuICAgICAgZGVzY3JpcHRpb246IFwiSUQgZGVsIGJhc3Rpb25cIixcbiAgICAgIGV4cG9ydE5hbWU6IFwiYmFzdGlvbi1pbnN0YW5jZS1pZFwiLFxuICAgIH0pO1xuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlB1YmxpY0lwXCIsIHtcbiAgICAgIHZhbHVlOiBiYXN0aW9uLmluc3RhbmNlUHVibGljSXAsXG4gICAgICBkZXNjcmlwdGlvbjogXCJJUCBQdWJsaWNvIGRlbCBiYXN0aW9uXCIsXG4gICAgICBleHBvcnROYW1lOiBcImJhc3Rpb24tcHVibGljLWlwXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9maWxlID0gdGhpcy5ub2RlLnRyeUdldENvbnRleHQoXCJwcm9maWxlXCIpO1xuICAgIGNvbnN0IGNyZWF0ZVNzaEtleUNvbW1hbmQgPSBcInNzaC1rZXlnZW4gLXQgcnNhIC1mIG15X3JzYV9rZXlcIjtcbiAgICBjb25zdCBwdXNoU3NoS2V5Q29tbWFuZCA9IGBhd3MgZWMyLWluc3RhbmNlLWNvbm5lY3Qgc2VuZC1zc2gtcHVibGljLWtleSAtLXJlZ2lvbiAke1xuICAgICAgQXdzLlJFR0lPTlxuICAgIH0gLS1pbnN0YW5jZS1pZCAke2Jhc3Rpb24uaW5zdGFuY2VJZH0gLS1hdmFpbGFiaWxpdHktem9uZSAke1xuICAgICAgYmFzdGlvbi5pbnN0YW5jZUF2YWlsYWJpbGl0eVpvbmVcbiAgICB9IC0taW5zdGFuY2Utb3MtdXNlciBlYzItdXNlciAtLXNzaC1wdWJsaWMta2V5IGZpbGU6Ly9teV9yc2Ffa2V5LnB1YiAke1xuICAgICAgcHJvZmlsZSA/IGAtLXByb2ZpbGUgJHtwcm9maWxlfWAgOiBcIlwiXG4gICAgfWA7XG4gICAgY29uc3Qgc3NoQ29tbWFuZCA9IGBzc2ggLW8gXCJJZGVudGl0aWVzT25seT15ZXNcIiAtaSBteV9yc2Ffa2V5IGVjMi11c2VyQCR7YmFzdGlvbi5pbnN0YW5jZVB1YmxpY0Ruc05hbWV9YDtcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJDcmVhdGVTc2hLZXlDb21tYW5kXCIsIHsgdmFsdWU6IGNyZWF0ZVNzaEtleUNvbW1hbmQgfSk7XG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlB1c2hTc2hLZXlDb21tYW5kXCIsIHsgdmFsdWU6IHB1c2hTc2hLZXlDb21tYW5kIH0pO1xuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJTc2hDb21tYW5kXCIsIHsgdmFsdWU6IHNzaENvbW1hbmQgfSk7XG4gIH1cbn1cbiJdfQ==