import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { IKey } from "aws-cdk-lib/aws-kms";
import { Construct } from "constructs";
export declare class Kms extends NestedStack {
    readonly rdsKey: IKey;
    constructor(scope: Construct, id: string, props?: NestedStackProps);
}
