import { aws_ec2, aws_kms, NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
export declare class Rds extends NestedStack {
    constructor(scope: Construct, id: string, props: NestedStackProps & {
        vpc: aws_ec2.IVpc;
        rdsKey: aws_kms.IKey;
        bastionSG: aws_ec2.ISecurityGroup;
    });
}
