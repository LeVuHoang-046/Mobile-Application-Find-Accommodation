import { RouteMain, RouteTab } from "@constants";
import { TabNavigator } from "@navigate";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "@screens";
import { AppStackParamList } from "@types";
import { memo } from "react"
import { StatusBar } from "react-native";

const MainStack = createStackNavigator<AppStackParamList>();
const MainStackComponent = memo(() => {
    return (
        <>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <MainStack.Screen name={RouteTab.Tab} component={TabNavigator} />
                <MainStack.Screen
                    name={RouteMain.AppointmentSchedule}
                    component={Screens.AppointmentSchedule}
                />
                <MainStack.Screen
                    name={RouteMain.Bills}
                    component={Screens.Bills}
                />
                <MainStack.Screen
                    name={RouteMain.Contract}
                    component={Screens.Contracts}
                />
                <MainStack.Screen
                    name={RouteMain.DesignRoomService}
                    component={Screens.DesignRoomService}
                />
                <MainStack.Screen
                    name={RouteMain.GasService}
                    component={Screens.GasService}
                />
                <MainStack.Screen
                    name={RouteMain.LaundryService}
                    component={Screens.LaundryService}
                />
                <MainStack.Screen
                    name={RouteMain.LikePost}
                    component={Screens.LikedPost}
                />
                <MainStack.Screen
                    name={RouteMain.ManaServiceOrder}
                    component={Screens.ManaServiceOrder}
                />
                <MainStack.Screen
                    name={RouteMain.ManagePost}
                    component={Screens.ManaPost}
                />
                <MainStack.Screen
                    name={RouteMain.Notification}
                    component={Screens.Notification}
                />
                <MainStack.Screen
                    name={RouteMain.RepairService}
                    component={Screens.RepairService}
                />
                <MainStack.Screen
                    name={RouteMain.ReportProblem}
                    component={Screens.ReportProblem}
                />
                <MainStack.Screen
                    name={RouteMain.SearchPosting}
                    component={Screens.SearchPosting}
                />
                <MainStack.Screen
                    name={RouteMain.ShoppingCart}
                    component={Screens.ShoppingCart}
                />
                <MainStack.Screen
                    name={RouteMain.TermPolicies}
                    component={Screens.TermPolicies}
                />
                <MainStack.Screen
                    name={RouteMain.TransportService}
                    component={Screens.TransportService}
                />
                <MainStack.Screen
                    name={RouteMain.WaterService}
                    component={Screens.WaterService}
                />
            </MainStack.Navigator>
            <StatusBar barStyle="dark-content" />
        </>
    )
})

export { MainStackComponent };
