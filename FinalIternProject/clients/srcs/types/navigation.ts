
import { ButtonBuyServiceProps } from "@component";
import { RouteAuth, RouteMain, RouteTabAdmin, RouteTabStaff, RouteTabUser } from "@constants";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormsAddListRoom, FormsAddMoreService } from "./form";
import { BoardingHouseInfoType, RoomInfoType, UserMeType } from "./response.api";

type HaveImgParams = {
 images: string[];
 activeIndex: number;
}
type HaveIdParams = {
  phoneNumber? : any;
}
export type BookingData = {
  booking_id?: number;
  customer_name?: string;
  phone_number?: string;
  booking_date: string | null;
  boarding_house_title?: string;
  boarding_house_id?: number;
  status: number;
  user_id?: number;

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
    [RouteMain.SearchForNews]: {district: string} | undefined;
    [RouteMain.DetailRoom]: {id: number};
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
    [RouteMain.ScheduleSuccessfully]: {bookingData: BookingData};

    //Screen Admin
    [RouteMain.ListCustomers]: undefined;
    [RouteMain.CustomersInformationDetail]: {item: UserMeType};
    // [RouteMain.StaffInformationDetail]: undefined;
    [RouteMain.ListStaffs]: undefined;
    [RouteMain.ManageBuilding]: undefined;
    [RouteMain.AddBuildingDetail]: undefined;
    [RouteMain.AddListRoom]:  {
      onCallbackSave: (item: FormsAddListRoom) => void;
      onDelete: (roomId: string)=> void;
      roomData: FormsAddListRoom | null; // roomData can be a room or null if not provided
    };
    [RouteMain.AddServiceFee]: { 
      onCallBackServiceSave: (item: FormsAddMoreService) => void;
      onDelete: (serviceId: string)=> void;
      serviceData: FormsAddMoreService | null;
    };
    [RouteMain.ManageSchedule]: undefined;
    [RouteMain.ManaDetailRoom]: {id: number};
    [RouteMain.MessageChat]: undefined;
    [RouteMain.ManaImageRoomDetail]: HaveImgParams;
    [RouteMain.FormUpdateRoom]: {roomData: RoomInfoType | null; onRoomUpdateRefetch: ()=> void};
    [RouteMain.FormCreateRoom]: {item: BoardingHouseInfoType | undefined; onRoomCreated: ()=> void };
  };
export type TAppNavigation<T extends RouterScreen> = NativeStackNavigationProp<
  AppStackParamList,
  T
>;
export type TAppRoute<T extends RouterScreen> = RouteProp<AppStackParamList, T>;