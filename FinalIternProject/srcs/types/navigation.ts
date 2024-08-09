
import { RouteMain, RouteTab } from "@constants";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HaveImgParams = {
 images?: string[];
 activeIndex: number;
}

type RouterScreen = 
// RouteAuth | 
RouteTab | RouteMain;

export type AppStackParamList = {
    //main
    [RouteTab.Tab]: undefined;
    
    [RouteTab.HomeTab]: undefined;
    [RouteTab.ServiceTab]: undefined;
    [RouteTab.MessageTab]: undefined;
    [RouteTab.AccountTab]: undefined;

    [RouteMain.RouteMain]: undefined;

    [RouteMain.AppointmentSchedule]: undefined;
    [RouteMain.Bills]: undefined;
    [RouteMain.Contract]: undefined;
    [RouteMain.DesignRoomService]: undefined;
    [RouteMain.GasService]: undefined;
    [RouteMain.LaundryService]: undefined;
    [RouteMain.LikePost]: undefined;
    [RouteMain.ManaServiceOrder]: undefined;
    [RouteMain.ManagePost]: undefined;
    [RouteMain.Notification]: undefined;
    [RouteMain.RepairService]: undefined;
    [RouteMain.ReportProblem]: undefined;
    [RouteMain.SearchPosting]: undefined;
    [RouteMain.ShoppingCart]: undefined;
    [RouteMain.TermPolicies]: undefined;
    [RouteMain.TransportService]: undefined;
    [RouteMain.WaterService]: undefined;
    [RouteMain.SearchForNews]: undefined;
    [RouteMain.DetailRoom]: undefined;
    [RouteMain.ImageRoomDetail]: HaveImgParams;
    [RouteMain.LandlordInformationDetail]: undefined;
    [RouteMain.ProductDetails]: undefined;
    [RouteMain.ImageProductDetails]: HaveImgParams;

};
export type TAppNavigation<T extends RouterScreen> = NativeStackNavigationProp<
  AppStackParamList,
  T
>;
export type TAppRoute<T extends RouterScreen> = RouteProp<AppStackParamList, T>;