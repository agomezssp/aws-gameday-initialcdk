"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bastion = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
class Bastion extends aws_cdk_lib_1.NestedStack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // const vpc = Vpc.fromVpcAttributes(this, "VPC", {
        //   vpcId: Fn.importValue("vpc-id"),
        //   availabilityZones: Stack.of(this).availabilityZones,
        //   //publicSubnetIds: Fn.importValue("public-subnet-ids").split(","),
        // });
        const { vpc, bastionSg } = props;
        const bastion = new aws_ec2_1.BastionHostLinux(this, "GameDayBastionHost", {
            instanceName: "GameDayBastionHost",
            vpc,
            securityGroup: bastionSg,
            subnetSelection: {
                subnetType: aws_cdk_lib_1.aws_ec2.SubnetType.PUBLIC,
            },
        });
        new aws_cdk_lib_1.CfnOutput(this, "BastionhostId", {
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
        const pushSshKeyCommand = `aws ec2-instance-connect send-ssh-public-key --region ${aws_cdk_lib_1.Aws.REGION} --instance-id ${bastion.instanceId} --availability-zone ${bastion.instanceAvailabilityZone} --instance-os-user ec2-user --ssh-public-key file://my_rsa_key.pub ${profile ? `--profile ${profile}` : ""}`;
        const sshCommand = `ssh -o "IdentitiesOnly=yes" -i my_rsa_key ec2-user@${bastion.instancePublicDnsName}`;
        new aws_cdk_lib_1.CfnOutput(this, "CreateSshKeyCommand", { value: createSshKeyCommand });
        new aws_cdk_lib_1.CfnOutput(this, "PushSshKeyCommand", { value: pushSshKeyCommand });
        new aws_cdk_lib_1.CfnOutput(this, "SshCommand", { value: sshCommand });
    }
}
exports.Bastion = Bastion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQW1GO0FBQ25GLGlEQUFxRDtBQUdyRCxNQUFhLE9BQVEsU0FBUSx5QkFBVztJQUN0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWdGO1FBQ3hILEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLG1EQUFtRDtRQUNuRCxxQ0FBcUM7UUFDckMseURBQXlEO1FBQ3pELHVFQUF1RTtRQUN2RSxNQUFNO1FBRU4sTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsR0FBRyxLQUFLLENBQUM7UUFFL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDL0QsWUFBWSxFQUFFLG9CQUFvQjtZQUNsQyxHQUFHO1lBQ0gsYUFBYSxFQUFFLFNBQVM7WUFDeEIsZUFBZSxFQUFFO2dCQUNmLFVBQVUsRUFBRSxxQkFBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbkMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxVQUFVO1lBQ3pCLFdBQVcsRUFBRSxnQkFBZ0I7WUFDN0IsVUFBVSxFQUFFLHFCQUFxQjtTQUNsQyxDQUFDLENBQUM7UUFFSCxvQ0FBb0M7UUFDcEMscUNBQXFDO1FBQ3JDLDJDQUEyQztRQUMzQyxxQ0FBcUM7UUFDckMsTUFBTTtRQUVOLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sbUJBQW1CLEdBQUcsaUNBQWlDLENBQUM7UUFDOUQsTUFBTSxpQkFBaUIsR0FBRyx5REFDeEIsaUJBQUcsQ0FBQyxNQUNOLGtCQUFrQixPQUFPLENBQUMsVUFBVSx3QkFDbEMsT0FBTyxDQUFDLHdCQUNWLHVFQUNFLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDckMsRUFBRSxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsc0RBQXNELE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRXpHLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGO0FBaERELDBCQWdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXdzLCBhd3NfZWMyLCBDZm5PdXRwdXQsIE5lc3RlZFN0YWNrLCBOZXN0ZWRTdGFja1Byb3BzfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7QmFzdGlvbkhvc3RMaW51eH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1lYzJcIjtcbmltcG9ydCB7Q29uc3RydWN0fSBmcm9tIFwiY29uc3RydWN0c1wiO1xuXG5leHBvcnQgY2xhc3MgQmFzdGlvbiBleHRlbmRzIE5lc3RlZFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IE5lc3RlZFN0YWNrUHJvcHMgJiB7dnBjOiBhd3NfZWMyLklWcGMsIGJhc3Rpb25TZzogYXdzX2VjMi5JU2VjdXJpdHlHcm91cH0pIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIGNvbnN0IHZwYyA9IFZwYy5mcm9tVnBjQXR0cmlidXRlcyh0aGlzLCBcIlZQQ1wiLCB7XG4gICAgLy8gICB2cGNJZDogRm4uaW1wb3J0VmFsdWUoXCJ2cGMtaWRcIiksXG4gICAgLy8gICBhdmFpbGFiaWxpdHlab25lczogU3RhY2sub2YodGhpcykuYXZhaWxhYmlsaXR5Wm9uZXMsXG4gICAgLy8gICAvL3B1YmxpY1N1Ym5ldElkczogRm4uaW1wb3J0VmFsdWUoXCJwdWJsaWMtc3VibmV0LWlkc1wiKS5zcGxpdChcIixcIiksXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCB7dnBjLCBiYXN0aW9uU2d9ID0gcHJvcHM7XG4gICAgXG4gICAgY29uc3QgYmFzdGlvbiA9IG5ldyBCYXN0aW9uSG9zdExpbnV4KHRoaXMsIFwiR2FtZURheUJhc3Rpb25Ib3N0XCIsIHtcbiAgICAgIGluc3RhbmNlTmFtZTogXCJHYW1lRGF5QmFzdGlvbkhvc3RcIixcbiAgICAgIHZwYyxcbiAgICAgIHNlY3VyaXR5R3JvdXA6IGJhc3Rpb25TZyxcbiAgICAgIHN1Ym5ldFNlbGVjdGlvbjoge1xuICAgICAgICBzdWJuZXRUeXBlOiBhd3NfZWMyLlN1Ym5ldFR5cGUuUFVCTElDLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJCYXN0aW9uaG9zdElkXCIsIHtcbiAgICAgIHZhbHVlOiBiYXN0aW9uLmluc3RhbmNlSWQsXG4gICAgICBkZXNjcmlwdGlvbjogXCJJRCBkZWwgYmFzdGlvblwiLFxuICAgICAgZXhwb3J0TmFtZTogXCJiYXN0aW9uLWluc3RhbmNlLWlkXCIsXG4gICAgfSk7XG5cbiAgICAvLyBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiUHVibGljSXBcIiwge1xuICAgIC8vICAgdmFsdWU6IGJhc3Rpb24uaW5zdGFuY2VQdWJsaWNJcCxcbiAgICAvLyAgIGRlc2NyaXB0aW9uOiBcIklQIFB1YmxpY28gZGVsIGJhc3Rpb25cIixcbiAgICAvLyAgIGV4cG9ydE5hbWU6IFwiYmFzdGlvbi1wdWJsaWMtaXBcIixcbiAgICAvLyB9KTtcblxuICAgIGNvbnN0IHByb2ZpbGUgPSB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dChcInByb2ZpbGVcIik7XG4gICAgY29uc3QgY3JlYXRlU3NoS2V5Q29tbWFuZCA9IFwic3NoLWtleWdlbiAtdCByc2EgLWYgbXlfcnNhX2tleVwiO1xuICAgIGNvbnN0IHB1c2hTc2hLZXlDb21tYW5kID0gYGF3cyBlYzItaW5zdGFuY2UtY29ubmVjdCBzZW5kLXNzaC1wdWJsaWMta2V5IC0tcmVnaW9uICR7XG4gICAgICBBd3MuUkVHSU9OXG4gICAgfSAtLWluc3RhbmNlLWlkICR7YmFzdGlvbi5pbnN0YW5jZUlkfSAtLWF2YWlsYWJpbGl0eS16b25lICR7XG4gICAgICBiYXN0aW9uLmluc3RhbmNlQXZhaWxhYmlsaXR5Wm9uZVxuICAgIH0gLS1pbnN0YW5jZS1vcy11c2VyIGVjMi11c2VyIC0tc3NoLXB1YmxpYy1rZXkgZmlsZTovL215X3JzYV9rZXkucHViICR7XG4gICAgICBwcm9maWxlID8gYC0tcHJvZmlsZSAke3Byb2ZpbGV9YCA6IFwiXCJcbiAgICB9YDtcbiAgICBjb25zdCBzc2hDb21tYW5kID0gYHNzaCAtbyBcIklkZW50aXRpZXNPbmx5PXllc1wiIC1pIG15X3JzYV9rZXkgZWMyLXVzZXJAJHtiYXN0aW9uLmluc3RhbmNlUHVibGljRG5zTmFtZX1gO1xuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIkNyZWF0ZVNzaEtleUNvbW1hbmRcIiwgeyB2YWx1ZTogY3JlYXRlU3NoS2V5Q29tbWFuZCB9KTtcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiUHVzaFNzaEtleUNvbW1hbmRcIiwgeyB2YWx1ZTogcHVzaFNzaEtleUNvbW1hbmQgfSk7XG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlNzaENvbW1hbmRcIiwgeyB2YWx1ZTogc3NoQ29tbWFuZCB9KTtcbiAgfVxufVxuIl19