#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {StackProps} from "aws-cdk-lib";
import {GameDayStack} from "../lib/game-day-stack";
import {GameDayModernizationStack} from "../lib/game-day-modernization-stack";

const stackProps: StackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

console.log('process.env.CDK_DEFAULT_REGION', process.env.CDK_DEFAULT_REGION)

const app = new cdk.App();


new GameDayStack(app, 'GDApp', stackProps);
// new GameDayModernizationStack(app, 'GDModernizationApp', stackProps);


