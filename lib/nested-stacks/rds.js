"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rds = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
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
                vpcSubnets: {
                    subnetType: aws_cdk_lib_1.aws_ec2.SubnetType.PRIVATE_ISOLATED,
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQVFxQjtBQUtyQixNQUFhLEdBQUksU0FBUSx5QkFBVztJQUNoQyxZQUNJLEtBQWdCLEVBQ2hCLEVBQVUsRUFDVixLQUF3RztRQUV4RyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxNQUFNLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsR0FBRyxLQUFLLENBQUM7UUFFdkMsTUFBTSxlQUFlLEdBQUcsSUFBSSxnQ0FBa0IsQ0FBQyxNQUFNLENBQ2pELElBQUksRUFDSixpQkFBaUIsRUFDakI7WUFDSSxXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELG9CQUFvQixFQUFFO2dCQUNsQixrQkFBa0IsRUFBRSxJQUFJO2dCQUN4QixZQUFZLEVBQUUsS0FBSztnQkFDbkIsaUJBQWlCLEVBQUUsVUFBVTtnQkFDN0IsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7YUFDN0Q7WUFDRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1NBQ3ZDLENBQ0osQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLElBQUkscUJBQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBd0I7WUFDaEYsTUFBTSxFQUFFLHFCQUFPLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDO2dCQUM5QyxPQUFPLEVBQUUscUJBQU8sQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVO2FBQ3ZELENBQUM7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsWUFBWSxFQUFFLHFCQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FDakMscUJBQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUN4QixxQkFBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQzdCO2dCQUNELFVBQVUsRUFBRTtvQkFDUixVQUFVLEVBQUUscUJBQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO2lCQUVsRDthQUNKO1lBQ0QsbUJBQW1CLEVBQUUsR0FBRyxXQUFXLEdBQUcsR0FBRyxFQUFFO1lBQzNDLFNBQVMsRUFBRSxDQUFDO1lBQ1osYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztZQUNwQyxvQkFBb0IsRUFBRSxNQUFNO1lBQzVCLFdBQVcsRUFBRSxxQkFBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDO1NBQy9ELENBQUMsQ0FBQztRQUVILCtDQUErQztRQUMvQyxPQUFPLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFRLFNBQVMsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO1FBRTdGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDdEMsS0FBSyxFQUFFLFdBQVcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUU7WUFDcEYsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxVQUFVLEVBQUUsc0JBQXNCO1NBQ3JDLENBQUMsQ0FBQTtJQUVOLENBQUM7Q0FDSjtBQTVERCxrQkE0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGF3c19lYzIsXG4gICAgYXdzX2ttcyxcbiAgICBhd3NfcmRzLFxuICAgIGF3c19zZWNyZXRzbWFuYWdlciwgQ2ZuT3V0cHV0LFxuICAgIE5lc3RlZFN0YWNrLFxuICAgIE5lc3RlZFN0YWNrUHJvcHMsXG4gICAgUmVtb3ZhbFBvbGljeSxcbn0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQge0NvbnN0cnVjdH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCB7RGF0YWJhc2VDbHVzdGVyUHJvcHN9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtcmRzL2xpYi9jbHVzdGVyXCI7XG5pbXBvcnQge0lQZWVyfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVjMlwiO1xuXG5leHBvcnQgY2xhc3MgUmRzIGV4dGVuZHMgTmVzdGVkU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzY29wZTogQ29uc3RydWN0LFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBwcm9wczogTmVzdGVkU3RhY2tQcm9wcyAmIHsgdnBjOiBhd3NfZWMyLklWcGMsIHJkc0tleTogYXdzX2ttcy5JS2V5LCBiYXN0aW9uU0c6IGF3c19lYzIuSVNlY3VyaXR5R3JvdXAgfVxuICAgICkge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRoaXMubm9kZS50cnlHZXRDb250ZXh0KFwicHJvamVjdC1uYW1lXCIpO1xuICAgICAgICBjb25zdCBlbnYgPSB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dChcImVudlwiKTtcbiAgICAgICAgY29uc3Qge3ZwYywgcmRzS2V5LCBiYXN0aW9uU0d9ID0gcHJvcHM7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVkU2VjcmV0ID0gbmV3IGF3c19zZWNyZXRzbWFuYWdlci5TZWNyZXQoXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgXCJUZW1wbGF0ZWRTZWNyZXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZWQgc2VjcmV0IHVzZWQgZm9yIFJEUyBwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlU2VjcmV0U3RyaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVQdW5jdHVhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZVNwYWNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVTdHJpbmdLZXk6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRMZW5ndGg6IDEyLFxuICAgICAgICAgICAgICAgICAgICBzZWNyZXRTdHJpbmdUZW1wbGF0ZTogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiBcImRidXNlclwifSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgY2x1c3RlciA9IG5ldyBhd3NfcmRzLkRhdGFiYXNlQ2x1c3Rlcih0aGlzLCBcIkRhdGFiYXNlXCIsIDxEYXRhYmFzZUNsdXN0ZXJQcm9wcz57XG4gICAgICAgICAgICBlbmdpbmU6IGF3c19yZHMuRGF0YWJhc2VDbHVzdGVyRW5naW5lLmF1cm9yYU15c3FsKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBhd3NfcmRzLkF1cm9yYU15c3FsRW5naW5lVmVyc2lvbi5WRVJfNV83XzEyLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBpbnN0YW5jZVByb3BzOiB7XG4gICAgICAgICAgICAgICAgdnBjOiB2cGMsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VUeXBlOiBhd3NfZWMyLkluc3RhbmNlVHlwZS5vZihcbiAgICAgICAgICAgICAgICAgICAgYXdzX2VjMi5JbnN0YW5jZUNsYXNzLlQzLFxuICAgICAgICAgICAgICAgICAgICBhd3NfZWMyLkluc3RhbmNlU2l6ZS5TTUFMTCxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHZwY1N1Ym5ldHM6IHtcbiAgICAgICAgICAgICAgICAgICAgc3VibmV0VHlwZTogYXdzX2VjMi5TdWJuZXRUeXBlLlBSSVZBVEVfSVNPTEFURUQsXG4gICAgICAgICAgICAgICAgICAgIC8vIHN1Ym5ldHM6IHZwYy5pc29sYXRlZFN1Ym5ldHMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHREYXRhYmFzZU5hbWU6IGAke3Byb2plY3ROYW1lfSR7ZW52fWAsXG4gICAgICAgICAgICBpbnN0YW5jZXM6IDIsXG4gICAgICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICAgICAgICBzdG9yYWdlRW5jcnlwdGlvbktleTogcmRzS2V5LFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IGF3c19yZHMuQ3JlZGVudGlhbHMuZnJvbVNlY3JldCh0ZW1wbGF0ZWRTZWNyZXQpLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQZXJtaXRpciBjb25lY3RhcnNlIGRlc2RlIGxvcyBzZWN1cml0eUdyb3Vwc1xuICAgICAgICBjbHVzdGVyLmNvbm5lY3Rpb25zLmFsbG93RGVmYXVsdFBvcnRGcm9tKDxJUGVlcj5iYXN0aW9uU0csICdBbGxvdyBhY2Nlc3MgZnJvbSBiYXN0aW9uIGhvc3QnKTtcblxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIGBSRFNFbmRwb2ludEFkZHJlc3NgLCB7XG4gICAgICAgICAgICB2YWx1ZTogYGh0dHBzOi8vJHtjbHVzdGVyLmNsdXN0ZXJFbmRwb2ludC5ob3N0bmFtZX06JHtjbHVzdGVyLmNsdXN0ZXJFbmRwb2ludC5wb3J0fWAsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogYFJEUyBFbmRwb2ludCBBZGRyZXNzYCxcbiAgICAgICAgICAgIGV4cG9ydE5hbWU6IGByZHMtZW5kcG9pbnQtYWRkcmVzc2AsXG4gICAgICAgIH0pXG5cbiAgICB9XG59XG4iXX0=