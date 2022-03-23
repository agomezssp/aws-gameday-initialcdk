"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kms = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
class Kms extends aws_cdk_lib_1.NestedStack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const projectName = this.node.tryGetContext('project-name');
        const env = this.node.tryGetContext('env');
        // llave para RDS
        this.rdsKey = new aws_cdk_lib_1.aws_kms.Key(this, 'RdsKey', {
            alias: `${projectName}/${env}/rds`,
            description: 'Encryption key for RDS',
            enableKeyRotation: true,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY
        });
    }
}
exports.Kms = Kms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsia21zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFrRjtBQUtsRixNQUFhLEdBQUksU0FBUSx5QkFBVztJQUdoQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXdCO1FBQ2hFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLGlCQUFpQjtRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQzVDLEtBQUssRUFBRSxHQUFHLFdBQVcsSUFBSSxHQUFHLE1BQU07WUFDbEMsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87U0FDdkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakJILGtCQWlCRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXdzX2ttcywgTmVzdGVkU3RhY2ssIE5lc3RlZFN0YWNrUHJvcHMsIFJlbW92YWxQb2xpY3l9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHtJS2V5fSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWttc1wiO1xuaW1wb3J0IHtDb25zdHJ1Y3R9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cblxuZXhwb3J0IGNsYXNzIEttcyBleHRlbmRzIE5lc3RlZFN0YWNrIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmRzS2V5OiBJS2V5O1xuICBcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IE5lc3RlZFN0YWNrUHJvcHMpIHtcbiAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICBcbiAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGhpcy5ub2RlLnRyeUdldENvbnRleHQoJ3Byb2plY3QtbmFtZScpO1xuICAgICAgY29uc3QgZW52ID0gdGhpcy5ub2RlLnRyeUdldENvbnRleHQoJ2VudicpO1xuICAgICAgXG4gICAgICAvLyBsbGF2ZSBwYXJhIFJEU1xuICAgICAgICB0aGlzLnJkc0tleSA9IG5ldyBhd3Nfa21zLktleSh0aGlzLCAnUmRzS2V5Jywge1xuICAgICAgICAgIGFsaWFzOiBgJHtwcm9qZWN0TmFtZX0vJHtlbnZ9L3Jkc2AsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdFbmNyeXB0aW9uIGtleSBmb3IgUkRTJyxcbiAgICAgICAgICBlbmFibGVLZXlSb3RhdGlvbjogdHJ1ZSxcbiAgICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1lcbiAgICAgIH0pO1xuICAgIH1cbiAgfSJdfQ==