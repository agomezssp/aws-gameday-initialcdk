"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDayStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const vpc_1 = require("./nested-stacks/vpc");
const security_1 = require("./nested-stacks/security");
const bastion_1 = require("./nested-stacks/bastion");
const kms_1 = require("./nested-stacks/kms");
const rds_1 = require("./nested-stacks/rds");
const alb_1 = require("./nested-stacks/alb");
class GameDayStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        aws_cdk_lib_1.Tags.of(this).add('Author', '3HTP');
        aws_cdk_lib_1.Tags.of(this).add('Project', 'GameDay');
        aws_cdk_lib_1.Tags.of(this).add('Environment', this.node.tryGetContext("env"));
        const vpc = new vpc_1.Vpc(this, "Vpc");
        const security = new security_1.Security(this, "Security", { vpc: vpc.vpc });
        new bastion_1.Bastion(this, "Bastion", {
            vpc: vpc.vpc,
            bastionSg: security.bastionSG,
        });
        const kms = new kms_1.Kms(this, "Kms");
        new rds_1.Rds(this, "Rds", {
            vpc: vpc.vpc,
            bastionSG: security.bastionSG,
            rdsKey: kms.rdsKey,
        });
        //new Efs(this, "Efs", {sg: security.efsSG, vpc: vpc.vpc})
        new alb_1.Alb(this, 'Alb', {
            vpc: vpc.vpc,
            sg: security.albSG
        });
    }
}
exports.GameDayStack = GameDayStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS1kYXktc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lLWRheS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBb0Q7QUFFcEQsNkNBQXdDO0FBQ3hDLHVEQUFrRDtBQUNsRCxxREFBZ0Q7QUFDaEQsNkNBQXdDO0FBQ3hDLDZDQUF3QztBQUV4Qyw2Q0FBd0M7QUFHeEMsTUFBYSxZQUFhLFNBQVEsbUJBQUs7SUFDbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFpQjtRQUN2RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixrQkFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLGtCQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDdkMsa0JBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBRWhFLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQ3pCLElBQUksRUFDSixVQUFVLEVBQ1YsRUFBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUNsQixDQUFDO1FBRUYsSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDekIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO1lBQ1osU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1NBQ2hDLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVqQyxJQUFJLFNBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ2pCLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztZQUNaLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztZQUM3QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUFDO1FBR0gsMERBQTBEO1FBRTFELElBQUksU0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDakIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO1lBQ1osRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFLO1NBQ3JCLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQXJDRCxvQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0YWNrLCBTdGFja1Byb3BzLCBUYWdzfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7Q29uc3RydWN0fSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHtWcGN9IGZyb20gXCIuL25lc3RlZC1zdGFja3MvdnBjXCI7XG5pbXBvcnQge1NlY3VyaXR5fSBmcm9tIFwiLi9uZXN0ZWQtc3RhY2tzL3NlY3VyaXR5XCI7XG5pbXBvcnQge0Jhc3Rpb259IGZyb20gXCIuL25lc3RlZC1zdGFja3MvYmFzdGlvblwiO1xuaW1wb3J0IHtLbXN9IGZyb20gXCIuL25lc3RlZC1zdGFja3Mva21zXCI7XG5pbXBvcnQge1Jkc30gZnJvbSBcIi4vbmVzdGVkLXN0YWNrcy9yZHNcIjtcbmltcG9ydCB7RWZzfSBmcm9tIFwiLi9uZXN0ZWQtc3RhY2tzL2Vmc1wiO1xuaW1wb3J0IHtBbGJ9IGZyb20gXCIuL25lc3RlZC1zdGFja3MvYWxiXCI7XG5cblxuZXhwb3J0IGNsYXNzIEdhbWVEYXlTdGFjayBleHRlbmRzIFN0YWNre1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIFRhZ3Mub2YodGhpcykuYWRkKCdBdXRob3InLCAnM0hUUCcpO1xuICAgICAgICBUYWdzLm9mKHRoaXMpLmFkZCgnUHJvamVjdCcsICdHYW1lRGF5JylcbiAgICAgICAgVGFncy5vZih0aGlzKS5hZGQoJ0Vudmlyb25tZW50JywgdGhpcy5ub2RlLnRyeUdldENvbnRleHQoXCJlbnZcIikpXG5cbiAgICAgICAgY29uc3QgdnBjID0gbmV3IFZwYyh0aGlzLCBcIlZwY1wiKTtcblxuICAgICAgICBjb25zdCBzZWN1cml0eSA9IG5ldyBTZWN1cml0eShcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBcIlNlY3VyaXR5XCIsXG4gICAgICAgICAgICB7dnBjOiB2cGMudnBjIH1cbiAgICAgICAgKTtcblxuICAgICAgICBuZXcgQmFzdGlvbih0aGlzLCBcIkJhc3Rpb25cIiwge1xuICAgICAgICAgICAgdnBjOiB2cGMudnBjLFxuICAgICAgICAgICAgYmFzdGlvblNnOiBzZWN1cml0eS5iYXN0aW9uU0csXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGttcyA9IG5ldyBLbXModGhpcywgXCJLbXNcIik7XG5cbiAgICAgICAgbmV3IFJkcyh0aGlzLCBcIlJkc1wiLCB7XG4gICAgICAgICAgICB2cGM6IHZwYy52cGMsXG4gICAgICAgICAgICBiYXN0aW9uU0c6IHNlY3VyaXR5LmJhc3Rpb25TRyxcbiAgICAgICAgICAgIHJkc0tleToga21zLnJkc0tleSxcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvL25ldyBFZnModGhpcywgXCJFZnNcIiwge3NnOiBzZWN1cml0eS5lZnNTRywgdnBjOiB2cGMudnBjfSlcblxuICAgICAgICBuZXcgQWxiKHRoaXMsICdBbGInLCB7XG4gICAgICAgICAgICB2cGM6IHZwYy52cGMsXG4gICAgICAgICAgICBzZzogc2VjdXJpdHkuYWxiU0dcbiAgICAgICAgfSlcbiAgICB9XG59Il19