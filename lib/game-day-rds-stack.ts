import {
  aws_ec2,
  aws_kms,
  aws_rds,
  aws_secretsmanager,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class GameDayRdsStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: StackProps & { vpc: aws_ec2.IVpc, rdsKey: aws_kms.IKey, bastionSecurityGroup: aws_ec2.ISecurityGroup }
  ) {
    super(scope, id, props);

    const projectName = this.node.tryGetContext("project-name");
    const env = this.node.tryGetContext("env");
    const { vpc, rdsKey, bastionSecurityGroup } = props;

    const templatedSecret = new aws_secretsmanager.Secret(
      this,
      "TemplatedSecret",
      {
        description: "Templated secret used for RDS password",
        generateSecretString: {
          excludePunctuation: true,
          includeSpace: false,
          generateStringKey: "password",
          passwordLength: 12,
          secretStringTemplate: JSON.stringify({ username: "dbuser" }),
        },
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    const cluster = new aws_rds.DatabaseCluster(this, "Database", {
      engine: aws_rds.DatabaseClusterEngine.auroraMysql({
        version: aws_rds.AuroraMysqlEngineVersion.VER_5_7_12,
      }),
      instanceProps: {
        vpc: vpc,
        instanceType: aws_ec2.InstanceType.of(
          aws_ec2.InstanceClass.T3,
          aws_ec2.InstanceSize.SMALL
        ),
        vpcSubnets: {
          subnetType: aws_ec2.SubnetType.PRIVATE_ISOLATED,
        },
      },
      defaultDatabaseName: `${projectName}${env}`,
      instances: 1,
      removalPolicy: RemovalPolicy.DESTROY,
      storageEncryptionKey: rdsKey,
      credentials: aws_rds.Credentials.fromSecret(templatedSecret)
    });
    
    // Permitir conectarse desde los securityGroups
    cluster.connections.allowDefaultPortFrom(bastionSecurityGroup, 'Allow access from bastion host');
    
  }
}
