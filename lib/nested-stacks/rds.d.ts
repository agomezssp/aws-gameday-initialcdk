import { aws_ec2, aws_kms, NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ISecret } from "aws-cdk-lib/aws-secretsmanager";
export declare class Rds extends NestedStack {
    readonly rdsSecret: ISecret;
    constructor(scope: Construct, id: string, props: NestedStackProps & {
        vpc: aws_ec2.IVpc;
        rdsKey: aws_kms.IKey;
        bastionSG: aws_ec2.ISecurityGroup;
        appSG: aws_ec2.ISecurityGroup;
    });
}
