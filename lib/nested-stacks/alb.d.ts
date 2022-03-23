import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IApplicationLoadBalancer } from "aws-cdk-lib/aws-elasticloadbalancingv2/lib/alb/application-load-balancer";
import { ISecurityGroup, IVpc } from "aws-cdk-lib/aws-ec2";
export declare class Alb extends NestedStack {
    readonly alb: IApplicationLoadBalancer;
    constructor(scope: Construct, id: string, props: NestedStackProps & {
        vpc: IVpc;
        sg: ISecurityGroup;
    });
}
