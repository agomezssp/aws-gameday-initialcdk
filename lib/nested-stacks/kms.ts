import {aws_kms, NestedStack, NestedStackProps, RemovalPolicy} from "aws-cdk-lib";
import {IKey} from "aws-cdk-lib/aws-kms";
import {Construct} from "constructs";


export class Kms extends NestedStack {
    public readonly rdsKey: IKey;
  
    constructor(scope: Construct, id: string, props?: NestedStackProps) {
      super(scope, id, props);
  
      const projectName = this.node.tryGetContext('project-name');
      const env = this.node.tryGetContext('env');
      
      // llave para RDS
        this.rdsKey = new aws_kms.Key(this, 'RdsKey', {
          alias: `${projectName}/${env}/rds`,
          description: 'Encryption key for RDS',
          enableKeyRotation: true,
          removalPolicy: RemovalPolicy.DESTROY
      });
    }
  }