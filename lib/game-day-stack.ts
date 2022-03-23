import {Stack, StackProps, Tags} from "aws-cdk-lib";
import {Construct} from "constructs";
import {Vpc} from "./nested-stacks/vpc";
import {Security} from "./nested-stacks/security";
import {Bastion} from "./nested-stacks/bastion";
import {Kms} from "./nested-stacks/kms";
import {Rds} from "./nested-stacks/rds";
import {Efs} from "./nested-stacks/efs";
import {Alb} from "./nested-stacks/alb";
import {Fargate} from "./nested-stacks/fargate";


export class GameDayStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        Tags.of(this).add('Author', '3HTP');
        Tags.of(this).add('Project', 'GameDay')
        Tags.of(this).add('Environment', this.node.tryGetContext("env"))

        const vpc = new Vpc(this, "Vpc");

        const security = new Security(
            this,
            "Security",
            {vpc: vpc.vpc}
        );

        new Bastion(this, "Bastion", {
            vpc: vpc.vpc,
            bastionSg: security.bastionSG,
        });

        const kms = new Kms(this, "Kms");

        const rds = new Rds(this, "Rds", {
            vpc: vpc.vpc,
            bastionSG: security.bastionSG,
            appSG: security.appSG,
            rdsKey: kms.rdsKey,
        });


        const efs = new Efs(this, "Efs", {sg: security.efsSG, vpc: vpc.vpc});

        new Alb(this, 'Alb', {
            vpc: vpc.vpc,
            sg: security.albSG
        })

        new Fargate(this, 'FargateNS', {
            vpc: vpc.vpc,
            sg: security.appSG,
            rdsSecret: rds.rdsSecret,
            efs: efs.fs,
            efsAccessPoint: efs.accessPoint
        });
    }
}