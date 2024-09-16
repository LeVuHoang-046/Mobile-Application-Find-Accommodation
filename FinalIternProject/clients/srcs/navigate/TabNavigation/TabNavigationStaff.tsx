
import { Icons } from '@assets';
import { LabelTabStaff, RouteTabStaff } from '@constants';
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '@screens';
import React from 'react';
import { CustomTabBar } from './CustomTabBar';

export type IItemTabBar = {
  name: string;
  route: () => JSX.Element;
  Icon: React.JSXElementConstructor<any>;
  label?: string;
};
export interface ITabBar {
  [x: string]: IItemTabBar;
}

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const TabNavigatorStaff = () => {
  const TAB_BAR: ITabBar = {
    [RouteTabStaff.HomeTab]: {
      name: RouteTabStaff.HomeTab,
      route: Screens.Staff.HomeTab,
      Icon: Icons.Home,
      label: LabelTabStaff.Home,
    },
    [RouteTabStaff.ServiceTab]: {
      name: RouteTabStaff.ServiceTab,
      route: Screens.Staff.ServiceTab,
      Icon: Icons.Service,
      label: LabelTabStaff.Service,
    },
    [RouteTabStaff.MessageTab]: {
      name: RouteTabStaff.MessageTab,
      route: Screens.Staff.MessageTab,
      Icon: Icons.Message,
      label: LabelTabStaff.Message,
    },
    [RouteTabStaff.AccountTab]: {
      name: RouteTabStaff.AccountTab,
      route: Screens.Staff.AccountTab,
      Icon: Icons.AccountCircle,
      label: LabelTabStaff.Account,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName={RouteTabStaff.HomeTab}
    tabBar={(props: BottomTabBarProps) => (
      <CustomTabBar {...props} tabBar={TAB_BAR} />
    )}
    >
      {Object.keys(TAB_BAR).map((elem, index) => (
        <Tab.Screen
          key={index}
          name={elem}
          component={TAB_BAR[elem].route}
          options={{ tabBarShowLabel: false }}
        />
      ))}
    </Tab.Navigator>
  );
};

export { TabNavigatorStaff };

