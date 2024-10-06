import {RouteMain, RouteTabUser} from '@constants';
import {TabNavigator} from '@navigate';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@screens';
import {AppStackParamList} from '@types';
import {memo} from 'react';
import {StatusBar} from 'react-native';

const MainStack = createStackNavigator<AppStackParamList>();
const MainStackComponent = memo(() => {
  return (
    <>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <MainStack.Screen name={RouteTabUser.Tab} component={TabNavigator} />
        <MainStack.Screen
          name={RouteMain.AppointmentSchedule}
          component={Screens.User.AppointmentSchedule}
        />
        <MainStack.Screen name={RouteMain.Bills} component={Screens.User.Bills} />
        <MainStack.Screen
          name={RouteMain.Contract}
          component={Screens.User.Contracts}
        />
        <MainStack.Screen
          name={RouteMain.DesignRoomService}
          component={Screens.User.DesignRoomService}
        />
        <MainStack.Screen
          name={RouteMain.GasService}
          component={Screens.User.GasService}
        />
        <MainStack.Screen
          name={RouteMain.LaundryService}
          component={Screens.User.LaundryService}
        />
        <MainStack.Screen
          name={RouteMain.LikePost}
          component={Screens.User.LikedPost}
        />
        <MainStack.Screen
          name={RouteMain.ManaServiceOrder}
          component={Screens.User.ManaServiceOrder}
        />
        <MainStack.Screen
          name={RouteMain.ManagePost}
          component={Screens.User.ManaPost}
        />
        <MainStack.Screen
          name={RouteMain.Notification}
          component={Screens.User.Notification}
        />
        <MainStack.Screen
          name={RouteMain.RepairService}
          component={Screens.User.RepairService}
        />
        <MainStack.Screen
          name={RouteMain.ReportProblem}
          component={Screens.User.ReportProblem}
        />
        <MainStack.Screen
          name={RouteMain.SearchPosting}
          component={Screens.User.SearchPosting}
        />
        {/* <MainStack.Screen
          name={RouteMain.ShoppingCart}
          component={Screens.User.ShoppingCart}
        /> */}
        <MainStack.Screen
          name={RouteMain.TermPolicies}
          component={Screens.User.TermPolicies}
        />
        <MainStack.Screen
          name={RouteMain.TransportService}
          component={Screens.User.TransportService}
        />
        <MainStack.Screen
          name={RouteMain.WaterService}
          component={Screens.User.WaterService}
        />
        <MainStack.Screen
          name={RouteMain.SearchForNews}
          component={Screens.User.SearchForNews}
        />
        <MainStack.Screen
          name={RouteMain.DetailRoom}
          component={Screens.User.DetailRoom}
        />
        <MainStack.Screen
          name={RouteMain.ImageRoomDetail}
          component={Screens.User.ImageRoomDetail}
        />
        <MainStack.Screen
          name={RouteMain.LandlordInformationDetail}
          component={Screens.User.LandlordInformationDetail}
        />
        <MainStack.Screen
          name={RouteMain.ProductDetails}
          component={Screens.User.ProductDetails}
        />
        <MainStack.Screen
          name={RouteMain.ImageProductDetails}
          component={Screens.User.ImageProductDetails}
        />
        <MainStack.Screen
          name={RouteMain.MessageDetail}
          component={Screens.User.MessageDetail}
        />
        <MainStack.Screen
          name={RouteMain.RoomSearchPost}
          component={Screens.User.RoomSearchPost}
        />
        <MainStack.Screen
          name={RouteMain.RoommateSearchPost}
          component={Screens.User.RoommateSearchPost}
        />
        <MainStack.Screen
          name={RouteMain.OrderConfirmationDetail}
          component={Screens.User.OrderConfirmationDetail}
        />
        <MainStack.Screen
          name={RouteMain.ShoppingCartDetail}
          component={Screens.User.ShoppingCartDetail}
        />
        <MainStack.Screen
          name={RouteMain.UpdateInformation}
          component={Screens.User.UpdateInformation}
        />
        <MainStack.Screen
          name={RouteMain.FindRoomAroundHere}
          component={Screens.User.FindRoomAroundHere}
        />
      </MainStack.Navigator>
      <StatusBar barStyle="dark-content" />
    </>
  );
});

export {MainStackComponent};
