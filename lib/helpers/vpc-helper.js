"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneSubnetByAz = void 0;
const oneSubnetByAz = (vpcSubnets) => {
    // Handle one subnet per AZ
    const subnets = [];
    vpcSubnets.forEach(subnet => {
        if (subnets.length == 0) {
            subnets.push(subnet);
        }
        else if (subnets.length < 2 &&
            subnets.find(v => {
                return v.availabilityZone != subnet.availabilityZone;
            })) {
            subnets.push(subnet);
        }
    });
    return subnets;
};
exports.oneSubnetByAz = oneSubnetByAz;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZwYy1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBTSxhQUFhLEdBQUcsQ0FBQyxVQUFxQixFQUFhLEVBQUU7SUFDdkQsMkJBQTJCO0lBQzNCLE1BQU0sT0FBTyxHQUFjLEVBQWUsQ0FBQztJQUMzQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3hCLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QjthQUFNLElBQ0gsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDO1lBQ3pELENBQUMsQ0FBQyxFQUNKO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyxDQUFBO0FBR08sc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lTdWJuZXR9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZWMyXCI7XG5cblxuY29uc3Qgb25lU3VibmV0QnlBeiA9ICh2cGNTdWJuZXRzOiBJU3VibmV0W10pOiBJU3VibmV0W10gPT4ge1xuICAgIC8vIEhhbmRsZSBvbmUgc3VibmV0IHBlciBBWlxuICAgIGNvbnN0IHN1Ym5ldHM6IElTdWJuZXRbXSA9IFtdIGFzIElTdWJuZXRbXTtcbiAgICB2cGNTdWJuZXRzLmZvckVhY2goc3VibmV0ID0+IHtcbiAgICAgICAgaWYgKHN1Ym5ldHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHN1Ym5ldHMucHVzaChzdWJuZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgc3VibmV0cy5sZW5ndGggPCAyICYmXG4gICAgICAgICAgICBzdWJuZXRzLmZpbmQodiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHYuYXZhaWxhYmlsaXR5Wm9uZSAhPSBzdWJuZXQuYXZhaWxhYmlsaXR5Wm9uZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkge1xuICAgICAgICAgICAgc3VibmV0cy5wdXNoKHN1Ym5ldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3VibmV0cztcbn1cblxuXG5leHBvcnQge29uZVN1Ym5ldEJ5QXp9Il19