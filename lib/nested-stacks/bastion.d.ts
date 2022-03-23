import { aws_ec2, NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
export declare class Bastion extends NestedStack {
    constructor(scope: Construct, id: string, props: NestedStackProps & {
        vpc: aws_ec2.IVpc;
        bastionSg: aws_ec2.ISecurityGroup;
    });
}
