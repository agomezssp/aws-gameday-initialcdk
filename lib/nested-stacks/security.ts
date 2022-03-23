import {CfnOutput, NestedStack, NestedStackProps, Tags} from "aws-cdk-lib";
import {ISecurityGroup, IVpc, Peer, Port, SecurityGroup,} from "aws-cdk-lib/aws-ec2";
import {Construct} from "constructs";

interface SecurityStackProps extends NestedStackProps {
    vpc: IVpc;
}

export class Security extends NestedStack {
    public readonly bastionSG: ISecurityGroup;
    public readonly efsSG: ISecurityGroup;
    public readonly albSG: ISecurityGroup;
    public readonly appSG: ISecurityGroup;

    constructor(scope: Construct, id: string, props: SecurityStackProps) {
        super(scope, id, props);

        const {vpc} = props;
        this.bastionSG = this.sgBastion({vpc});
        this.efsSG = this.sgEFS({vpc});
        this.albSG = this.sgAlb({vpc});
        this.appSG = this.sgApp({vpc});
    }

    sgBastion(props: { vpc: IVpc }): ISecurityGroup {
        return this.sg({
            vpc: props.vpc,
            name: "BastionSG",
            port: Port.tcp(22),
            description: "BastionSG"
        });
    }

    sgApp(props: { vpc: IVpc }): ISecurityGroup {
        return this.sg({
            vpc: props.vpc,
            name: "AppSG",
            port: Port.tcp(8080),
            description: "AppSG"
        });
    }

    sgEFS(props: { vpc: IVpc }): ISecurityGroup {
        return this.sg({
            vpc: props.vpc,
            name: "MountTargetSG",
            port: Port.tcpRange(2049, 2049),
            description: "FileSystem Security Group"
        });
    }

    sgAlb(props: { vpc: IVpc }): ISecurityGroup {
        return this.sg({
            vpc: props.vpc,
            name: "Alb-SG",
            port: Port.tcpRange(80, 80),
            description: "Application Load Balance Security Group",
        });
    }

    sg(props: { vpc: IVpc, description: string, name: string, port: Port }) {
        const sg = new SecurityGroup(
            this,
            props.name,
            {
                vpc: props.vpc,
                allowAllOutbound: true,
                description: props.description,
                securityGroupName: props.name,
            }
        );
        Tags.of(sg).add("Name", props.name);
        sg.addIngressRule(
            Peer.anyIpv4(),
            props.port,
        );


        new CfnOutput(this, `SG-${props.name}-ID`, {
            value: sg.securityGroupId,
            description: `Security Group ID of ${props.name}`,
            exportName: `sg-${props.name}-id`,
        })
        return sg;
    }


}
