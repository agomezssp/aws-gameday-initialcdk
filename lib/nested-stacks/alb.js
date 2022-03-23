"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alb = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_elasticloadbalancingv2_1 = require("aws-cdk-lib/aws-elasticloadbalancingv2");
class Alb extends aws_cdk_lib_1.NestedStack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.alb = new aws_elasticloadbalancingv2_1.ApplicationLoadBalancer(this, "GameDayALB", {
            vpc: props.vpc,
            deletionProtection: false,
            internetFacing: true,
            securityGroup: props.sg,
            vpcSubnets: {
                subnets: props.vpc.publicSubnets,
                // subnetType: SubnetType.PUBLIC,
                onePerAz: true,
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFxRTtBQUVyRSx1RkFNZ0Q7QUFJaEQsTUFBYSxHQUFJLFNBQVEseUJBQVc7SUFHaEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF5RDtRQUMvRixLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUd4QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksb0RBQXVCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUN2RCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUN2QixVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYTtnQkFDaEMsaUNBQWlDO2dCQUNqQyxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUMsQ0FBQTtRQUVGLE1BQU0sRUFBRSxHQUFHLElBQUksbURBQXNCLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN6RCxVQUFVLEVBQUUsdUNBQVUsQ0FBQyxFQUFFO1lBQ3pCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLGdEQUFtQixDQUFDLElBQUk7WUFDbEMsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxNQUFNO2FBQ2Y7WUFDRCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7U0FDakIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUU7WUFDekMsSUFBSSxFQUFFLEVBQUU7WUFDUixRQUFRLEVBQUUsZ0RBQW1CLENBQUMsSUFBSTtZQUNsQyxhQUFhLEVBQUUsMkNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QyxDQUFDLENBQUE7UUFHRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ3BDLEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3BCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsVUFBVSxFQUFFLGtCQUFrQjtTQUNqQyxDQUFDLENBQUE7SUFFTixDQUFDO0NBRUo7QUE1Q0Qsa0JBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDZm5PdXRwdXQsIE5lc3RlZFN0YWNrLCBOZXN0ZWRTdGFja1Byb3BzfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7Q29uc3RydWN0fSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHtcbiAgICBBcHBsaWNhdGlvbkxvYWRCYWxhbmNlcixcbiAgICBBcHBsaWNhdGlvblByb3RvY29sLFxuICAgIEFwcGxpY2F0aW9uVGFyZ2V0R3JvdXAsXG4gICAgTGlzdGVuZXJBY3Rpb24sXG4gICAgVGFyZ2V0VHlwZVxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjJcIjtcbmltcG9ydCB7SUFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjIvbGliL2FsYi9hcHBsaWNhdGlvbi1sb2FkLWJhbGFuY2VyXCI7XG5pbXBvcnQge0lTZWN1cml0eUdyb3VwLCBJVnBjLCBTdWJuZXRUeXBlfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVjMlwiO1xuXG5leHBvcnQgY2xhc3MgQWxiIGV4dGVuZHMgTmVzdGVkU3RhY2sge1xuICAgIHB1YmxpYyByZWFkb25seSBhbGI6IElBcHBsaWNhdGlvbkxvYWRCYWxhbmNlcjtcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBOZXN0ZWRTdGFja1Byb3BzICYge3ZwYzogSVZwYywgc2c6IElTZWN1cml0eUdyb3VwfSkge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuXG4gICAgICAgIHRoaXMuYWxiID0gbmV3IEFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyKHRoaXMsIFwiR2FtZURheUFMQlwiLCB7XG4gICAgICAgICAgICB2cGM6IHByb3BzLnZwYyxcbiAgICAgICAgICAgIGRlbGV0aW9uUHJvdGVjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBpbnRlcm5ldEZhY2luZzogdHJ1ZSxcbiAgICAgICAgICAgIHNlY3VyaXR5R3JvdXA6IHByb3BzLnNnLFxuICAgICAgICAgICAgdnBjU3VibmV0czoge1xuICAgICAgICAgICAgICAgIHN1Ym5ldHM6IHByb3BzLnZwYy5wdWJsaWNTdWJuZXRzLFxuICAgICAgICAgICAgICAgIC8vIHN1Ym5ldFR5cGU6IFN1Ym5ldFR5cGUuUFVCTElDLFxuICAgICAgICAgICAgICAgIG9uZVBlckF6OiB0cnVlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHRnID0gbmV3IEFwcGxpY2F0aW9uVGFyZ2V0R3JvdXAodGhpcywgJ0dhbWVEYXlBTEItVEcnLCB7XG4gICAgICAgICAgICB0YXJnZXRUeXBlOiBUYXJnZXRUeXBlLklQLFxuICAgICAgICAgICAgcG9ydDogODA4MCxcbiAgICAgICAgICAgIHByb3RvY29sOiBBcHBsaWNhdGlvblByb3RvY29sLkhUVFAsXG4gICAgICAgICAgICBoZWFsdGhDaGVjazoge1xuICAgICAgICAgICAgICAgIHBvcnQ6ICc4MDgwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZwYzogcHJvcHMudnBjLFxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYWxiLmFkZExpc3RlbmVyKCdHYW1lRGF5LUFMQi1MaXN0ZW5lcicsIHtcbiAgICAgICAgICAgIHBvcnQ6IDgwLFxuICAgICAgICAgICAgcHJvdG9jb2w6IEFwcGxpY2F0aW9uUHJvdG9jb2wuSFRUUCxcbiAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IExpc3RlbmVyQWN0aW9uLmZvcndhcmQoW3RnXSlcbiAgICAgICAgfSlcblxuXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgYEFMQi1UYXJnZXQtR3JvdXBgLCB7XG4gICAgICAgICAgICB2YWx1ZTogdGcudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgQUxCIFRhcmdldCBHcm91cGAsXG4gICAgICAgICAgICBleHBvcnROYW1lOiBgYWxiLXRhcmdldC1ncm91cGAsXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn0iXX0=