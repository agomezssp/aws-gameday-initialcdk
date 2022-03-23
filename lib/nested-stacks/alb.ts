import {CfnOutput, NestedStack, NestedStackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {
    ApplicationLoadBalancer,
    ApplicationProtocol,
    ApplicationTargetGroup,
    ListenerAction,
    TargetType
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import {IApplicationLoadBalancer} from "aws-cdk-lib/aws-elasticloadbalancingv2/lib/alb/application-load-balancer";
import {ISecurityGroup, IVpc} from "aws-cdk-lib/aws-ec2";
import {oneSubnetByAz} from "../helpers/vpc-helper";

export class Alb extends NestedStack {
    public readonly alb: IApplicationLoadBalancer;

    constructor(scope: Construct, id: string, props: NestedStackProps & {vpc: IVpc, sg: ISecurityGroup}) {
        super(scope, id, props);


        this.alb = new ApplicationLoadBalancer(this, "GameDayALB", {
            vpc: props.vpc,
            deletionProtection: false,
            internetFacing: true,
            securityGroup: props.sg,
            vpcSubnets: props.vpc.selectSubnets({subnets: oneSubnetByAz(props.vpc.publicSubnets)})
        })

        const tg = new ApplicationTargetGroup(this, 'GameDayALB-TG', {
            targetType: TargetType.IP,
            port: 8080,
            protocol: ApplicationProtocol.HTTP,
            healthCheck: {
                port: '8080'
            },
            vpc: props.vpc,
        })

        this.alb.addListener('GameDay-ALB-Listener', {
            port: 80,
            protocol: ApplicationProtocol.HTTP,
            defaultAction: ListenerAction.forward([tg])
        })


        new CfnOutput(this, `ALB-Target-Group`, {
            value: tg.toString(),
            description: `ALB Target Group`,
            exportName: `alb-target-group`,
        })

    }

}