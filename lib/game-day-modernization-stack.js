"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDayModernizationStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
class GameDayModernizationStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = aws_ec2_1.Vpc.fromVpcAttributes(this, "VPC", {
            vpcId: aws_cdk_lib_1.Fn.importValue("vpc-id"),
            availabilityZones: aws_cdk_lib_1.Stack.of(this).availabilityZones,
        });
    }
}
exports.GameDayModernizationStack = GameDayModernizationStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS1kYXktbW9kZXJuaXphdGlvbi1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUtZGF5LW1vZGVybml6YXRpb24tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXdEO0FBRXhELGlEQUF3QztBQUd4QyxNQUFhLHlCQUEwQixTQUFRLG1CQUFLO0lBQ2hELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBaUI7UUFDdkQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxHQUFHLEdBQUcsYUFBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDN0MsS0FBSyxFQUFFLGdCQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUMvQixpQkFBaUIsRUFBRSxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUI7U0FFcEQsQ0FBQyxDQUFDO0lBS1AsQ0FBQztDQUNKO0FBZEQsOERBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZuLCBTdGFjaywgU3RhY2tQcm9wcywgVGFnc30gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQge0NvbnN0cnVjdH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCB7VnBjfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVjMlwiO1xuXG5cbmV4cG9ydCBjbGFzcyBHYW1lRGF5TW9kZXJuaXphdGlvblN0YWNrIGV4dGVuZHMgU3RhY2t7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgdnBjID0gVnBjLmZyb21WcGNBdHRyaWJ1dGVzKHRoaXMsIFwiVlBDXCIsIHtcbiAgICAgICAgICB2cGNJZDogRm4uaW1wb3J0VmFsdWUoXCJ2cGMtaWRcIiksXG4gICAgICAgICAgYXZhaWxhYmlsaXR5Wm9uZXM6IFN0YWNrLm9mKHRoaXMpLmF2YWlsYWJpbGl0eVpvbmVzLFxuICAgICAgICAgIC8vIHB1YmxpY1N1Ym5ldElkczogRm4uaW1wb3J0VmFsdWUoXCJwdWJsaWMtc3VibmV0LWlkc1wiKS5zcGxpdChcIixcIiksXG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgfVxufSJdfQ==