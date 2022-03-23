import {
    aws_ec2,
    aws_kms,
    aws_rds,
    aws_secretsmanager,
    CfnOutput,
    NestedStack,
    NestedStackProps,
    RemovalPolicy,
} from "aws-cdk-lib";
import {Construct} from "constructs";
import {DatabaseClusterProps} from "aws-cdk-lib/aws-rds/lib/cluster";
import {IPeer} from "aws-cdk-lib/aws-ec2";
import {oneSubnetByAz} from "../helpers/vpc-helper";
import {ISecret} from "aws-cdk-lib/aws-secretsmanager";

export class Rds extends NestedStack {
    public readonly rdsSecret: ISecret;

    constructor(
        scope: Construct,
        id: string,
        props: NestedStackProps & { vpc: aws_ec2.IVpc, rdsKey: aws_kms.IKey, bastionSG: aws_ec2.ISecurityGroup , appSG: aws_ec2.ISecurityGroup }
    ) {
        super(scope, id, props);

        const projectName = this.node.tryGetContext("project-name");
        const env = this.node.tryGetContext("env");
        const {vpc, rdsKey, bastionSG, appSG} = props;

        this.rdsSecret = new aws_secretsmanager.Secret(
            this,
            "TemplatedSecret",
            {
                description: "Templated secret used for RDS password",
                generateSecretString: {
                    excludePunctuation: true,
                    includeSpace: false,
                    generateStringKey: "password",
                    passwordLength: 12,
                    secretStringTemplate: JSON.stringify({username: "dbuser"}),
                },
                removalPolicy: RemovalPolicy.DESTROY,
            }
        );

        const cluster = new aws_rds.DatabaseCluster(this, "Database", <DatabaseClusterProps>{
            engine: aws_rds.DatabaseClusterEngine.auroraMysql({
                version: aws_rds.AuroraMysqlEngineVersion.VER_5_7_12,
            }),
            instanceProps: {
                vpc: vpc,
                instanceType: aws_ec2.InstanceType.of(
                    aws_ec2.InstanceClass.T3,
                    aws_ec2.InstanceSize.SMALL,
                ),
                vpcSubnets: props.vpc.selectSubnets({subnets: oneSubnetByAz(props.vpc.isolatedSubnets)})
            },
            defaultDatabaseName: `${projectName}${env}`,
            instances: 2,
            removalPolicy: RemovalPolicy.DESTROY,
            storageEncryptionKey: rdsKey,
            credentials: aws_rds.Credentials.fromSecret(this.rdsSecret),
        });

        // Permitir conectarse desde los securityGroups
        cluster.connections.allowDefaultPortFrom(<IPeer>bastionSG, 'Allow access from bastion host');
        cluster.connections.allowDefaultPortFrom(<IPeer>appSG, 'Allow access from app');

        new CfnOutput(this, `RDSEndpointAddress`, {
            value: `https://${cluster.clusterEndpoint.hostname}:${cluster.clusterEndpoint.port}`,
            description: `RDS Endpoint Address`,
            exportName: `rds-endpoint-address`,
        })

    }
}
