import {CfnOutput, NestedStack, NestedStackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {
    AccessPoint,
    FileSystem,
    LifecyclePolicy,
    OutOfInfrequentAccessPolicy,
    PerformanceMode,
    ThroughputMode
} from "aws-cdk-lib/aws-efs";
import {ISecurityGroup, IVpc, Vpc} from "aws-cdk-lib/aws-ec2";
import {IFileSystem} from "aws-cdk-lib/aws-efs/lib/efs-file-system";
import {oneSubnetByAz} from "../helpers/vpc-helper";


export class Efs extends NestedStack {
    public readonly fs: IFileSystem;

    constructor(scope: Construct, id: string, props: NestedStackProps & { vpc: IVpc, sg: ISecurityGroup }) {
        super(scope, id, props);

        const fileSystem = new FileSystem(this, 'MyEfsFileSystem', {
            // vpc: new Vpc(this, 'VPC'),
            vpc: props.vpc,
            lifecyclePolicy: LifecyclePolicy.AFTER_14_DAYS, // files are not transitioned to infrequent access (IA) storage by default
            performanceMode: PerformanceMode.GENERAL_PURPOSE, // default
            throughputMode: ThroughputMode.BURSTING,
            outOfInfrequentAccessPolicy: OutOfInfrequentAccessPolicy.AFTER_1_ACCESS, // files are not transitioned back from (infrequent access) IA to primary storage by default
            encrypted: true,
            fileSystemName: 'SiteFileSystem',
            securityGroup: props.sg,
            vpcSubnets: props.vpc.selectSubnets({subnets: oneSubnetByAz(props.vpc.publicSubnets)})
            // vpcSubnets: {
            //     subnets: props.vpc.publicSubnets,
            //     // subnetType: SubnetType.PUBLIC,
            //     //availabilityZones: props.vpc.availabilityZones,
            //     // subnetGroupName: 'PublicEFS'
            //     onePerAz: true,
            // }
        });

        const accesPoint = new AccessPoint(this, 'EFSAccessPoint', {
            fileSystem: fileSystem,
            posixUser: {gid: '1000', uid: '1000'},
            createAcl: {ownerGid: "1000", ownerUid: "1000", permissions: "0777"},
            path: '/bitnami'
        });

        this.fs = fileSystem;

        new CfnOutput(this, `EFS-FileSystem-ID`, {
            value: this.fs.fileSystemId,
            description: `ID of EFS FS`,
            exportName: `efs-fs-id`,
        })

        new CfnOutput(this, `EFS-Access-Point`, {
            value: accesPoint.accessPointId,
            description: `EFS Access Point ID`,
            exportName: `efs-access-point-id`,
        })
    }

}