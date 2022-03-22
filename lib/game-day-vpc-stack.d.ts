import { aws_ec2, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
export declare class GameDayVpcStack extends Stack {
    vpc: aws_ec2.IVpc;
    constructor(scope: Construct, id: string, props?: StackProps);
}
