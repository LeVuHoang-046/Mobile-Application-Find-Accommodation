
import { ButtonBuyServiceProps } from "@component";
import { RouteAuth, RouteMain, RouteTabAdmin, RouteTabStaff, RouteTabUser } from "@constants";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormsAddListRoom } from "./form";

type HaveImgParams = {
 images?: string[];
 activeIndex: number;
}
type HaveIdParams = {
  phoneNumber? : any;
}

type RouterScreen = 
RouteTabAdmin | RouteTabUser | RouteTabStaff | RouteMain | RouteAuth;

export type AppStackParamList = {
  //auth
  [RouteAuth.LOGIN]: HaveIdParams | undefined;
  [RouteAuth.SignUp]: {uid: string | undefined} | undefined;
  [RouteAuth.InputOTP]: {phoneNumber: string, confirm: FirebaseAuthTypes.ConfirmationResult  }; 
    //user Tab
    [RouteTabUser.Tab]: undefined;
    [RouteTabUser.HomeTab]: undefined;
    [RouteTabUser.ServiceTab]: undefined;
    [RouteTabUser.MessageTab]: undefined;
    [RouteTabUser.AccountTab]: undefined;

    //Tab Staff
    [RouteTabStaff.Tab]: undefined;
    [RouteTabStaff.HomeTab]: undefined;
    [RouteTabStaff.ServiceTab]: undefined;
    [RouteTabStaff.MessageTab]: undefined;
    [RouteTabStaff.AccountTab]: undefined;

     //Tab Admin
     [RouteTabAdmin.Tab]: undefined;
     [RouteTabAdmin.HomeTab]: undefined;
     [RouteTabAdmin.ServiceTab]: undefined;
     [RouteTabAdmin.MessageTab]: undefined;
     [RouteTabAdmin.AccountTab]: undefined;

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
    [RouteMain.ProductDetails]:  {item: ButtonBuyServiceProps; quantity: number; cartCount: number };
    [RouteMain.ImageProductDetails]: HaveImgParams;
    [RouteMain.MessageDetail]: undefined;
    [RouteMain.RoomSearchPost]: undefined;
    [RouteMain.RoommateSearchPost]: undefined;
    [RouteMain.OrderConfirmationDetail]: {selectedItem: ButtonBuyServiceProps | null; quantity: number };
    [RouteMain.ShoppingCartDetail]: undefined;
    [RouteMain.UpdateInformation]: undefined;
    [RouteMain.FindRoomAroundHere]: undefined;

    //Screen Admin
    [RouteMain.ListCustomers]: undefined;
    [RouteMain.CustomersInformationDetail]: undefined;
    [RouteMain.CustomersInformationDetail]: undefined;
    [RouteMain.ListStaffs]: undefined;
    [RouteMain.ManageBuilding]: undefined;
    [RouteMain.AddBuildingDetail]: undefined;
    [RouteMain.AddListRoom]:  { onCallbackSave: (item: FormsAddListRoom) => void };
    [RouteMain.AddServiceFee]: undefined;
  };
export type TAppNavigation<T extends RouterScreen> = NativeStackNavigationProp<
  AppStackParamList,
  T
>;
export type TAppRoute<T extends RouterScreen> = RouteProp<AppStackParamList, T>;