import {Fn, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {Vpc} from "aws-cdk-lib/aws-ec2";


export class GameDayModernizationStack extends Stack{
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const vpc = Vpc.fromVpcAttributes(this, "VPC", {
          vpcId: Fn.importValue("vpc-id"),
          availabilityZones: Stack.of(this).availabilityZones,
          // publicSubnetIds: Fn.importValue("public-subnet-ids").split(","),
        });




    }
}