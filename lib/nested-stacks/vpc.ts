import {aws_ec2, CfnOutput, NestedStack, NestedStackProps} from "aws-cdk-lib";
import {Construct} from "constructs";


export class Vpc extends NestedStack{
    vpc: aws_ec2.IVpc;
    
    constructor(scope: Construct, id: string, props?: NestedStackProps){
        super(scope, id, props);
        
        
        this.vpc = new aws_ec2.Vpc(this, "game-day-vpc", {
            vpcName: 'game-day-vpc',
            natGateways: 1,
            maxAzs: 2,
            subnetConfiguration: [
                {
                    name: 'private',
                    subnetType: aws_ec2.SubnetType.PRIVATE_WITH_NAT,
                    cidrMask: 24,
                },
                {
                    name: 'public',
                    subnetType: aws_ec2.SubnetType.PUBLIC,
                    cidrMask: 24,
                },
                // {
                //     name: 'staging',
                //     subnetType: aws_ec2.SubnetType.PUBLIC,
                //     cidrMask: 24,
                // },
                {
                    name: 'isolate',
                    subnetType: aws_ec2.SubnetType.PRIVATE_ISOLATED,
                    cidrMask: 28,
                }
            ]
        })
        this.vpc.addFlowLog('FlowLog')

        new CfnOutput(this, "output-vpc-id", {
            value: this.vpc.vpcId,
            description: "ID de la VPC",
            exportName: 'vpc-id'
        });
        this.vpc.publicSubnets.forEach((s,i) => new CfnOutput(this, `PublicSubnetId${i}`, {
            value: s.subnetId,
            description: `SubnetId of public subnet ${i}`,
            exportName: `public-subnet-id-${i}`,
        }));

        this.vpc.privateSubnets.forEach((s,i) => new CfnOutput(this, `PrivateSubnetId${i}`, {
            value: s.subnetId,
            description: `SubnetId of private subnet ${i}`,
            exportName: `private-subnet-id-${i}`,
        }));

        this.vpc.isolatedSubnets.forEach((s,i) => new CfnOutput(this, `IsolateSubnetId${i}`, {
            value: s.subnetId,
            description: `SubnetId of isolate subnet ${i}`,
            exportName: `isolate-subnet-id-${i}`,
        }));
        
    }

}