import { aws_ec2, NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
export declare class Vpc extends NestedStack {
    vpc: aws_ec2.IVpc;
    constructor(scope: Construct, id: string, props?: NestedStackProps);
}
