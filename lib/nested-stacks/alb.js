"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alb = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_elasticloadbalancingv2_1 = require("aws-cdk-lib/aws-elasticloadbalancingv2");
const vpc_helper_1 = require("../helpers/vpc-helper");
class Alb extends aws_cdk_lib_1.NestedStack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.alb = new aws_elasticloadbalancingv2_1.ApplicationLoadBalancer(this, "GameDayALB", {
            vpc: props.vpc,
            deletionProtection: false,
            internetFacing: true,
            securityGroup: props.sg,
            vpcSubnets: props.vpc.selectSubnets({ subnets: vpc_helper_1.oneSubnetByAz(props.vpc.publicSubnets) })
        });
        const tg = new aws_elasticloadbalancingv2_1.ApplicationTargetGroup(this, 'GameDayALB-TG', {
            targetType: aws_elasticloadbalancingv2_1.TargetType.IP,
            port: 8080,
            protocol: aws_elasticloadbalancingv2_1.ApplicationProtocol.HTTP,
            healthCheck: {
                port: '8080'
            },
            vpc: props.vpc,
        });
        this.alb.addListener('GameDay-ALB-Listener', {
            port: 80,
            protocol: aws_elasticloadbalancingv2_1.ApplicationProtocol.HTTP,
            defaultAction: aws_elasticloadbalancingv2_1.ListenerAction.forward([tg])
        });
        new aws_cdk_lib_1.CfnOutput(this, `ALB-Target-Group`, {
            value: tg.toString(),
            description: `ALB Target Group`,
            exportName: `alb-target-group`,
        });
    }
}
exports.Alb = Alb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFxRTtBQUVyRSx1RkFNZ0Q7QUFHaEQsc0RBQW9EO0FBRXBELE1BQWEsR0FBSSxTQUFRLHlCQUFXO0lBR2hDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBeUQ7UUFDL0YsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFHeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLG9EQUF1QixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDdkQsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2Qsa0JBQWtCLEVBQUUsS0FBSztZQUN6QixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDdkIsVUFBVSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUMsT0FBTyxFQUFFLDBCQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDO1NBQ3pGLENBQUMsQ0FBQTtRQUVGLE1BQU0sRUFBRSxHQUFHLElBQUksbURBQXNCLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN6RCxVQUFVLEVBQUUsdUNBQVUsQ0FBQyxFQUFFO1lBQ3pCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLGdEQUFtQixDQUFDLElBQUk7WUFDbEMsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxNQUFNO2FBQ2Y7WUFDRCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7U0FDakIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUU7WUFDekMsSUFBSSxFQUFFLEVBQUU7WUFDUixRQUFRLEVBQUUsZ0RBQW1CLENBQUMsSUFBSTtZQUNsQyxhQUFhLEVBQUUsMkNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QyxDQUFDLENBQUE7UUFHRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ3BDLEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3BCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsVUFBVSxFQUFFLGtCQUFrQjtTQUNqQyxDQUFDLENBQUE7SUFFTixDQUFDO0NBRUo7QUF4Q0Qsa0JBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDZm5PdXRwdXQsIE5lc3RlZFN0YWNrLCBOZXN0ZWRTdGFja1Byb3BzfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7Q29uc3RydWN0fSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHtcbiAgICBBcHBsaWNhdGlvbkxvYWRCYWxhbmNlcixcbiAgICBBcHBsaWNhdGlvblByb3RvY29sLFxuICAgIEFwcGxpY2F0aW9uVGFyZ2V0R3JvdXAsXG4gICAgTGlzdGVuZXJBY3Rpb24sXG4gICAgVGFyZ2V0VHlwZVxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjJcIjtcbmltcG9ydCB7SUFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjIvbGliL2FsYi9hcHBsaWNhdGlvbi1sb2FkLWJhbGFuY2VyXCI7XG5pbXBvcnQge0lTZWN1cml0eUdyb3VwLCBJVnBjfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVjMlwiO1xuaW1wb3J0IHtvbmVTdWJuZXRCeUF6fSBmcm9tIFwiLi4vaGVscGVycy92cGMtaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBbGIgZXh0ZW5kcyBOZXN0ZWRTdGFjayB7XG4gICAgcHVibGljIHJlYWRvbmx5IGFsYjogSUFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyO1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IE5lc3RlZFN0YWNrUHJvcHMgJiB7dnBjOiBJVnBjLCBzZzogSVNlY3VyaXR5R3JvdXB9KSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG5cbiAgICAgICAgdGhpcy5hbGIgPSBuZXcgQXBwbGljYXRpb25Mb2FkQmFsYW5jZXIodGhpcywgXCJHYW1lRGF5QUxCXCIsIHtcbiAgICAgICAgICAgIHZwYzogcHJvcHMudnBjLFxuICAgICAgICAgICAgZGVsZXRpb25Qcm90ZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGludGVybmV0RmFjaW5nOiB0cnVlLFxuICAgICAgICAgICAgc2VjdXJpdHlHcm91cDogcHJvcHMuc2csXG4gICAgICAgICAgICB2cGNTdWJuZXRzOiBwcm9wcy52cGMuc2VsZWN0U3VibmV0cyh7c3VibmV0czogb25lU3VibmV0QnlBeihwcm9wcy52cGMucHVibGljU3VibmV0cyl9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHRnID0gbmV3IEFwcGxpY2F0aW9uVGFyZ2V0R3JvdXAodGhpcywgJ0dhbWVEYXlBTEItVEcnLCB7XG4gICAgICAgICAgICB0YXJnZXRUeXBlOiBUYXJnZXRUeXBlLklQLFxuICAgICAgICAgICAgcG9ydDogODA4MCxcbiAgICAgICAgICAgIHByb3RvY29sOiBBcHBsaWNhdGlvblByb3RvY29sLkhUVFAsXG4gICAgICAgICAgICBoZWFsdGhDaGVjazoge1xuICAgICAgICAgICAgICAgIHBvcnQ6ICc4MDgwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZwYzogcHJvcHMudnBjLFxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYWxiLmFkZExpc3RlbmVyKCdHYW1lRGF5LUFMQi1MaXN0ZW5lcicsIHtcbiAgICAgICAgICAgIHBvcnQ6IDgwLFxuICAgICAgICAgICAgcHJvdG9jb2w6IEFwcGxpY2F0aW9uUHJvdG9jb2wuSFRUUCxcbiAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IExpc3RlbmVyQWN0aW9uLmZvcndhcmQoW3RnXSlcbiAgICAgICAgfSlcblxuXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgYEFMQi1UYXJnZXQtR3JvdXBgLCB7XG4gICAgICAgICAgICB2YWx1ZTogdGcudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgQUxCIFRhcmdldCBHcm91cGAsXG4gICAgICAgICAgICBleHBvcnROYW1lOiBgYWxiLXRhcmdldC1ncm91cGAsXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn0iXX0=