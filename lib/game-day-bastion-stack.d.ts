import { aws_ec2, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
export declare class GameDayBastionStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps & {
        vpc: aws_ec2.IVpc;
    });
}
