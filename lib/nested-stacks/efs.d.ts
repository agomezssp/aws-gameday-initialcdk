import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ISecurityGroup, IVpc } from "aws-cdk-lib/aws-ec2";
import { IFileSystem } from "aws-cdk-lib/aws-efs/lib/efs-file-system";
export declare class Efs extends NestedStack {
    readonly fs: IFileSystem;
    constructor(scope: Construct, id: string, props: NestedStackProps & {
        vpc: IVpc;
        sg: ISecurityGroup;
    });
}
