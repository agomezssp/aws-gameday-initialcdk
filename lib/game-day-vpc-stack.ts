import { aws_ec2, CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";


export class GameDayVpcStack extends Stack{
    vpc: aws_ec2.IVpc;
    
    constructor(scope: Construct, id: string, props?: StackProps){
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
                {
                    name: 'staging',
                    subnetType: aws_ec2.SubnetType.PUBLIC,
                    cidrMask: 24,
                },
                {
                    name: 'isolate',
                    subnetType: aws_ec2.SubnetType.PRIVATE_ISOLATED,
                    cidrMask: 28,
                }
            ]
        })
        
        this.vpc.addFlowLog('FlowLog')
        
        const publicSubnetIds = this.vpc.publicSubnets.map(s => s.subnetId).join(",")
        
        new CfnOutput(this, "output-vpc-id", {
            value: this.vpc.vpcId,
            description: "ID de la VPC",
            exportName: 'vpc-id'
        });
        new CfnOutput(this, "PublicSubnetIds", {
            value: publicSubnetIds,
            description: "publicSubnetIds",
            exportName: 'public-subnet-ids',
            
        });
        
    }

}