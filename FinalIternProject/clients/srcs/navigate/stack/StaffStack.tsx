import {RouteTabStaff} from '@constants';
import {TabNavigatorStaff} from '@navigate';
import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from '@types';
import {memo} from 'react';

const StaffStack = createStackNavigator<AppStackParamList>();
const StaffStackComponent = memo(() => {
  return (
    <>
      <StaffStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <StaffStack.Screen
          name={RouteTabStaff.Tab}
          component={TabNavigatorStaff}
        />
        {/* <StaffStack.Screen
          name={RouteMain.AppointmentSchedule}
          component={Screens.Staff.AppointmentSchedule}
        /> */}
      </StaffStack.Navigator>
    </>
  );
});
export {StaffStackComponent};
