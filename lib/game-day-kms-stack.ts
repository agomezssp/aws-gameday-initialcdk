import { aws_kms, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { IKey } from "aws-cdk-lib/aws-kms";
import { Construct } from "constructs";


export class GameDayKmsStack extends Stack {
    public readonly rdsKey: IKey;
  
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
  
      const projectName = this.node.tryGetContext('project-name');
      const env = this.node.tryGetContext('env');
      
      // llave para RDS
      const rdsKey = new aws_kms.Key(this, 'RdsKey', {
        alias: `${projectName}/${env}/rds`,
        description: 'Encryption key for RDS',
        enableKeyRotation: true,
        removalPolicy: RemovalPolicy.DESTROY
      });
  
      this.rdsKey = rdsKey;
    }
  }