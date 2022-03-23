"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rds = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const vpc_helper_1 = require("../helpers/vpc-helper");
class Rds extends aws_cdk_lib_1.NestedStack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const projectName = this.node.tryGetContext("project-name");
        const env = this.node.tryGetContext("env");
        const { vpc, rdsKey, bastionSG } = props;
        const templatedSecret = new aws_cdk_lib_1.aws_secretsmanager.Secret(this, "TemplatedSecret", {
            description: "Templated secret used for RDS password",
            generateSecretString: {
                excludePunctuation: true,
                includeSpace: false,
                generateStringKey: "password",
                passwordLength: 12,
                secretStringTemplate: JSON.stringify({ username: "dbuser" }),
            },
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
        });
        const cluster = new aws_cdk_lib_1.aws_rds.DatabaseCluster(this, "Database", {
            engine: aws_cdk_lib_1.aws_rds.DatabaseClusterEngine.auroraMysql({
                version: aws_cdk_lib_1.aws_rds.AuroraMysqlEngineVersion.VER_5_7_12,
            }),
            instanceProps: {
                vpc: vpc,
                instanceType: aws_cdk_lib_1.aws_ec2.InstanceType.of(aws_cdk_lib_1.aws_ec2.InstanceClass.T3, aws_cdk_lib_1.aws_ec2.InstanceSize.SMALL),
                vpcSubnets: props.vpc.selectSubnets({ subnets: vpc_helper_1.oneSubnetByAz(props.vpc.isolatedSubnets) })
                // vpcSubnets: {
                //     subnetType: aws_ec2.SubnetType.PRIVATE_ISOLATED,
                //     // subnets: vpc.isolatedSubnets,
                // }
            },
            defaultDatabaseName: `${projectName}${env}`,
            instances: 2,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            storageEncryptionKey: rdsKey,
            credentials: aws_cdk_lib_1.aws_rds.Credentials.fromSecret(templatedSecret),
        });
        // Permitir conectarse desde los securityGroups
        cluster.connections.allowDefaultPortFrom(bastionSG, 'Allow access from bastion host');
        new aws_cdk_lib_1.CfnOutput(this, `RDSEndpointAddress`, {
            value: `https://${cluster.clusterEndpoint.hostname}:${cluster.clusterEndpoint.port}`,
            description: `RDS Endpoint Address`,
            exportName: `rds-endpoint-address`,
        });
    }
}
exports.Rds = Rds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQVFxQjtBQUlyQixzREFBb0Q7QUFFcEQsTUFBYSxHQUFJLFNBQVEseUJBQVc7SUFDaEMsWUFDSSxLQUFnQixFQUNoQixFQUFVLEVBQ1YsS0FBd0c7UUFFeEcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsTUFBTSxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLEdBQUcsS0FBSyxDQUFDO1FBRXZDLE1BQU0sZUFBZSxHQUFHLElBQUksZ0NBQWtCLENBQUMsTUFBTSxDQUNqRCxJQUFJLEVBQ0osaUJBQWlCLEVBQ2pCO1lBQ0ksV0FBVyxFQUFFLHdDQUF3QztZQUNyRCxvQkFBb0IsRUFBRTtnQkFDbEIsa0JBQWtCLEVBQUUsSUFBSTtnQkFDeEIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGlCQUFpQixFQUFFLFVBQVU7Z0JBQzdCLGNBQWMsRUFBRSxFQUFFO2dCQUNsQixvQkFBb0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDO2FBQzdEO1lBQ0QsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztTQUN2QyxDQUNKLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLHFCQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQXdCO1lBQ2hGLE1BQU0sRUFBRSxxQkFBTyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQztnQkFDOUMsT0FBTyxFQUFFLHFCQUFPLENBQUMsd0JBQXdCLENBQUMsVUFBVTthQUN2RCxDQUFDO1lBQ0YsYUFBYSxFQUFFO2dCQUNYLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFlBQVksRUFBRSxxQkFBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQ2pDLHFCQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFDeEIscUJBQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUM3QjtnQkFDRCxVQUFVLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBQyxPQUFPLEVBQUUsMEJBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFDLENBQUM7Z0JBQ3hGLGdCQUFnQjtnQkFDaEIsdURBQXVEO2dCQUN2RCx1Q0FBdUM7Z0JBQ3ZDLElBQUk7YUFDUDtZQUNELG1CQUFtQixFQUFFLEdBQUcsV0FBVyxHQUFHLEdBQUcsRUFBRTtZQUMzQyxTQUFTLEVBQUUsQ0FBQztZQUNaLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsb0JBQW9CLEVBQUUsTUFBTTtZQUM1QixXQUFXLEVBQUUscUJBQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztTQUMvRCxDQUFDLENBQUM7UUFFSCwrQ0FBK0M7UUFDL0MsT0FBTyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBUSxTQUFTLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztRQUU3RixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3RDLEtBQUssRUFBRSxXQUFXLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3BGLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsVUFBVSxFQUFFLHNCQUFzQjtTQUNyQyxDQUFDLENBQUE7SUFFTixDQUFDO0NBQ0o7QUE3REQsa0JBNkRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBhd3NfZWMyLFxuICAgIGF3c19rbXMsXG4gICAgYXdzX3JkcyxcbiAgICBhd3Nfc2VjcmV0c21hbmFnZXIsIENmbk91dHB1dCxcbiAgICBOZXN0ZWRTdGFjayxcbiAgICBOZXN0ZWRTdGFja1Byb3BzLFxuICAgIFJlbW92YWxQb2xpY3ksXG59IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHtDb25zdHJ1Y3R9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQge0RhdGFiYXNlQ2x1c3RlclByb3BzfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXJkcy9saWIvY2x1c3RlclwiO1xuaW1wb3J0IHtJUGVlcn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1lYzJcIjtcbmltcG9ydCB7b25lU3VibmV0QnlBen0gZnJvbSBcIi4uL2hlbHBlcnMvdnBjLWhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgUmRzIGV4dGVuZHMgTmVzdGVkU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzY29wZTogQ29uc3RydWN0LFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBwcm9wczogTmVzdGVkU3RhY2tQcm9wcyAmIHsgdnBjOiBhd3NfZWMyLklWcGMsIHJkc0tleTogYXdzX2ttcy5JS2V5LCBiYXN0aW9uU0c6IGF3c19lYzIuSVNlY3VyaXR5R3JvdXAgfVxuICAgICkge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRoaXMubm9kZS50cnlHZXRDb250ZXh0KFwicHJvamVjdC1uYW1lXCIpO1xuICAgICAgICBjb25zdCBlbnYgPSB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dChcImVudlwiKTtcbiAgICAgICAgY29uc3Qge3ZwYywgcmRzS2V5LCBiYXN0aW9uU0d9ID0gcHJvcHM7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVkU2VjcmV0ID0gbmV3IGF3c19zZWNyZXRzbWFuYWdlci5TZWNyZXQoXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgXCJUZW1wbGF0ZWRTZWNyZXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZWQgc2VjcmV0IHVzZWQgZm9yIFJEUyBwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlU2VjcmV0U3RyaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVQdW5jdHVhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZVNwYWNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVTdHJpbmdLZXk6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRMZW5ndGg6IDEyLFxuICAgICAgICAgICAgICAgICAgICBzZWNyZXRTdHJpbmdUZW1wbGF0ZTogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiBcImRidXNlclwifSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgY2x1c3RlciA9IG5ldyBhd3NfcmRzLkRhdGFiYXNlQ2x1c3Rlcih0aGlzLCBcIkRhdGFiYXNlXCIsIDxEYXRhYmFzZUNsdXN0ZXJQcm9wcz57XG4gICAgICAgICAgICBlbmdpbmU6IGF3c19yZHMuRGF0YWJhc2VDbHVzdGVyRW5naW5lLmF1cm9yYU15c3FsKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBhd3NfcmRzLkF1cm9yYU15c3FsRW5naW5lVmVyc2lvbi5WRVJfNV83XzEyLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBpbnN0YW5jZVByb3BzOiB7XG4gICAgICAgICAgICAgICAgdnBjOiB2cGMsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VUeXBlOiBhd3NfZWMyLkluc3RhbmNlVHlwZS5vZihcbiAgICAgICAgICAgICAgICAgICAgYXdzX2VjMi5JbnN0YW5jZUNsYXNzLlQzLFxuICAgICAgICAgICAgICAgICAgICBhd3NfZWMyLkluc3RhbmNlU2l6ZS5TTUFMTCxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHZwY1N1Ym5ldHM6IHByb3BzLnZwYy5zZWxlY3RTdWJuZXRzKHtzdWJuZXRzOiBvbmVTdWJuZXRCeUF6KHByb3BzLnZwYy5pc29sYXRlZFN1Ym5ldHMpfSlcbiAgICAgICAgICAgICAgICAvLyB2cGNTdWJuZXRzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHN1Ym5ldFR5cGU6IGF3c19lYzIuU3VibmV0VHlwZS5QUklWQVRFX0lTT0xBVEVELFxuICAgICAgICAgICAgICAgIC8vICAgICAvLyBzdWJuZXRzOiB2cGMuaXNvbGF0ZWRTdWJuZXRzLFxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZhdWx0RGF0YWJhc2VOYW1lOiBgJHtwcm9qZWN0TmFtZX0ke2Vudn1gLFxuICAgICAgICAgICAgaW5zdGFuY2VzOiAyLFxuICAgICAgICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgICAgICAgc3RvcmFnZUVuY3J5cHRpb25LZXk6IHJkc0tleSxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBhd3NfcmRzLkNyZWRlbnRpYWxzLmZyb21TZWNyZXQodGVtcGxhdGVkU2VjcmV0KSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUGVybWl0aXIgY29uZWN0YXJzZSBkZXNkZSBsb3Mgc2VjdXJpdHlHcm91cHNcbiAgICAgICAgY2x1c3Rlci5jb25uZWN0aW9ucy5hbGxvd0RlZmF1bHRQb3J0RnJvbSg8SVBlZXI+YmFzdGlvblNHLCAnQWxsb3cgYWNjZXNzIGZyb20gYmFzdGlvbiBob3N0Jyk7XG5cbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCBgUkRTRW5kcG9pbnRBZGRyZXNzYCwge1xuICAgICAgICAgICAgdmFsdWU6IGBodHRwczovLyR7Y2x1c3Rlci5jbHVzdGVyRW5kcG9pbnQuaG9zdG5hbWV9OiR7Y2x1c3Rlci5jbHVzdGVyRW5kcG9pbnQucG9ydH1gLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGBSRFMgRW5kcG9pbnQgQWRkcmVzc2AsXG4gICAgICAgICAgICBleHBvcnROYW1lOiBgcmRzLWVuZHBvaW50LWFkZHJlc3NgLFxuICAgICAgICB9KVxuXG4gICAgfVxufVxuIl19