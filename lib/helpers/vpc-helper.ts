import {ISubnet} from "aws-cdk-lib/aws-ec2";


const oneSubnetByAz = (vpcSubnets: ISubnet[]): ISubnet[] => {
    // Handle one subnet per AZ
    const subnets: ISubnet[] = [] as ISubnet[];
    vpcSubnets.forEach(subnet => {
        if (subnets.length == 0) {
            subnets.push(subnet);
        } else if (
            subnets.length < 2 &&
            subnets.find(v => {
                return v.availabilityZone != subnet.availabilityZone;
            })
        ) {
            subnets.push(subnet);
        }
    });
    return subnets;
}


export {oneSubnetByAz}