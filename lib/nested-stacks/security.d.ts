import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { ISecurityGroup, IVpc, Port, SecurityGroup } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
interface SecurityStackProps extends NestedStackProps {
    vpc: IVpc;
}
export declare class Security extends NestedStack {
    readonly bastionSG: ISecurityGroup;
    readonly efsSG: ISecurityGroup;
    readonly albSG: ISecurityGroup;
    constructor(scope: Construct, id: string, props: SecurityStackProps);
    sgBastion(props: {
        vpc: IVpc;
    }): ISecurityGroup;
    sgEFS(props: {
        vpc: IVpc;
    }): ISecurityGroup;
    sgAlb(props: {
        vpc: IVpc;
    }): ISecurityGroup;
    sg(props: {
        vpc: IVpc;
        description: string;
        name: string;
        port: Port;
    }): SecurityGroup;
}
export {};
