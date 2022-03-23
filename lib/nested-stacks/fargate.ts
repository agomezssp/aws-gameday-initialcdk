import {NestedStack, NestedStackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {ISecurityGroup, IVpc, SecurityGroup} from "aws-cdk-lib/aws-ec2";
import {Cluster, ContainerImage, Secret} from "aws-cdk-lib/aws-ecs";
import {ApplicationLoadBalancedFargateService} from "aws-cdk-lib/aws-ecs-patterns";
import {ISecret} from "aws-cdk-lib/aws-secretsmanager";
import {IFileSystem} from "aws-cdk-lib/aws-efs/lib/efs-file-system";
import {IAccessPoint} from "aws-cdk-lib/aws-efs";


export class Fargate extends NestedStack {
    constructor(scope: Construct, id: string, props: NestedStackProps & { vpc: IVpc, sg: ISecurityGroup, rdsSecret: ISecret, efs: IFileSystem, efsAccessPoint: IAccessPoint }) {
        super(scope, id, props);

        const cluster = new Cluster(this, "EcsCluster", {
            vpc: props.vpc
        });


        const sg = SecurityGroup.fromSecurityGroupId(this, 'FargateSG', props.sg.securityGroupId);

        const loadBalancedFargateService = new ApplicationLoadBalancedFargateService(this, 'FargateService', {
            cluster,
            memoryLimitMiB: 1024,
            taskImageOptions: {
                image: ContainerImage.fromRegistry("bitnami/wordpress"),
                environment: {
                    PHP_MEMORY_LIMIT: "512M",
                    enabled: "false",
                    ALLOW_EMPTY_PASSWORD: "yes",
                },
                secrets: {
                    MARIADB_HOST: Secret.fromSecretsManager(props.rdsSecret, 'host'),
                    WORDPRESS_DATABASE_USER: Secret.fromSecretsManager(props.rdsSecret, 'username'),
                    WORDPRESS_DATABASE_PASSWORD: Secret.fromSecretsManager(props.rdsSecret, 'password'),
                    WORDPRESS_DATABASE_NAME: Secret.fromSecretsManager(props.rdsSecret, 'dbname'),
                },
                containerPort: 8080,

            },
            securityGroups: [sg],
        })

        loadBalancedFargateService.taskDefinition.addVolume({
            name: 'wordpress',
            efsVolumeConfiguration: {
                fileSystemId: props.efs.fileSystemId,
                transitEncryption: 'ENABLED',
                authorizationConfig: {
                    iam: 'DISABLED',
                    accessPointId: props.efsAccessPoint.accessPointId,
                }
            },

        })

        loadBalancedFargateService.taskDefinition.defaultContainer?.addMountPoints({
            readOnly: false,
            containerPath: '/bitnami/wordpress',
            sourceVolume: 'wordpress'
        });


        loadBalancedFargateService.targetGroup.configureHealthCheck({
            path: "/",
        });

    }

}