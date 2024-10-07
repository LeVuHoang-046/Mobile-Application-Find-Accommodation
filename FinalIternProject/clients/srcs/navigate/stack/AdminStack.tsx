import {RouteMain, RouteTabAdmin} from '@constants';
import {TabNavigatorAdmin, TabNavigatorStaff} from '@navigate';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@screens';
import {AppStackParamList} from '@types';
import {memo} from 'react';

const AdminStack = createStackNavigator<AppStackParamList>();
const AdminStackComponent = memo(() => {
  return (
    <>
      <AdminStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AdminStack.Screen
          name={RouteTabAdmin.Tab}
          component={TabNavigatorAdmin}
        />
        <AdminStack.Screen
          name={RouteMain.ListCustomers}
          component={Screens.Admin.ListCustomers}
        />
        <AdminStack.Screen
          name={RouteMain.CustomersInformationDetail}
          component={Screens.Admin.CustomersInformationDetail}
        />
        <AdminStack.Screen
          name={RouteMain.ListStaffs}
          component={Screens.Admin.ListStaffs}
        />
        <AdminStack.Screen
          name={RouteMain.ManageBuilding}
          component={Screens.Admin.ManageBuilding}
        />
        <AdminStack.Screen
          name={RouteMain.AddBuildingDetail}
          component={Screens.Admin.AddBuildingDetail}
        />
        <AdminStack.Screen
          name={RouteMain.AddListRoom}
          component={Screens.Admin.AddListRoom}
        />
         <AdminStack.Screen
          name={RouteMain.AddServiceFee}
          component={Screens.Admin.AddServiceFee}
        />
        <AdminStack.Screen
          name={RouteMain.ManageSchedule}
          component={Screens.Admin.ManageSchedule}
        />
        <AdminStack.Screen
          name={RouteMain.ManaDetailRoom}
          component={Screens.Admin.ManaDetailRoom}
        />
        <AdminStack.Screen
          name={RouteMain.MessageChat}
          component={Screens.Admin.MessageChat}
        />
        <AdminStack.Screen
          name={RouteMain.ManaImageRoomDetail}
          component={Screens.Admin.ManaImageRoomDetail}
        />
        <AdminStack.Screen
          name={RouteMain.FormUpdateRoom}
          component={Screens.Admin.FormUpdateRoom}
        />
          <AdminStack.Screen
          name={RouteMain.FormCreateRoom}
          component={Screens.Admin.FormCreateRoom}
        />

      </AdminStack.Navigator>
    </>
  );
});
export {AdminStackComponent};
