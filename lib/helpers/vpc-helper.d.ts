import { ISubnet } from "aws-cdk-lib/aws-ec2";
declare const oneSubnetByAz: (vpcSubnets: ISubnet[]) => ISubnet[];
export { oneSubnetByAz };
