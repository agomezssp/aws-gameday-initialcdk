#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { GameDayCdkStack } from "../lib/game-day-cdk-stack";
import { GameDayVpcStack } from "../lib/game-day-vpc-stack";
import { GameDayBastionStack } from "../lib/game-day-bastion-stack";
import { StackProps } from "aws-cdk-lib";
import { GameDaySecurityStack } from "../lib/game-day-security-stack";
import { GameDayRdsStack } from "../lib/game-day-rds-stack";
import { GameDayKmsStack } from "../lib/game-day-kms-stack";

const stackProps: StackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

const app = new cdk.App();
// new GameDayCdkStack(app, 'GameDayCdkStack', {
/* If you don't specify 'env', this stack will be environment-agnostic.
 * Account/Region-dependent features and context lookups will not work,
 * but a single synthesized template can be deployed anywhere. */

/* Uncomment the next line to specialize this stack for the AWS Account
 * and Region that are implied by the current CLI configuration. */
// env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

/* Uncomment the next line if you know exactly what Account and Region you
 * want to deploy the stack to. */
// env: { account: '123456789012', region: 'us-east-1' },

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

const gameDayVpcStack = new GameDayVpcStack(app, "GameDayVpcStack", stackProps);
const gameDaySecurityStack = new GameDaySecurityStack(
  app,
  "GameDaySecurityStack",
  { ...stackProps, vpc: gameDayVpcStack.vpc }
);
new GameDayBastionStack(app, "GameDayBastionStack", {
  ...stackProps,
  vpc: gameDayVpcStack.vpc,
  bastionSecurityGroup: gameDaySecurityStack.bastionSecurityGroup,
});
const gameDayKmsStack = new GameDayKmsStack(app, "GameDayKmsStack", stackProps);
new GameDayRdsStack(app, "GameDayRdsStack", {
  ...stackProps,
  vpc: gameDayVpcStack.vpc,
  bastionSecurityGroup: gameDaySecurityStack.bastionSecurityGroup,
  rdsKey: gameDayKmsStack.rdsKey,
});
