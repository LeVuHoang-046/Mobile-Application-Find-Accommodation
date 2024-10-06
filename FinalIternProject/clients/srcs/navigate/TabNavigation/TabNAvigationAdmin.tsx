
import { Icons } from '@assets';
import { LabelTabAdmin, RouteTabAdmin } from '@constants';
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

const TabNavigatorAdmin = () => {
  const TAB_BAR: ITabBar = {
    [RouteTabAdmin.HomeTab]: {
      name: RouteTabAdmin.HomeTab,
      route: Screens.Admin.HomeTab,
      Icon: Icons.Home,
      label: LabelTabAdmin.Home,
    },
    [RouteTabAdmin.ServiceTab]: {
      name: RouteTabAdmin.ServiceTab,
      route: Screens.Admin.ServiceTab,
      Icon: Icons.Service,
      label: LabelTabAdmin.Service,
    },
    [RouteTabAdmin.MessageTab]: {
      name: RouteTabAdmin.MessageTab,
      route: Screens.Admin.MessageTab,
      Icon: Icons.Message,
      label: LabelTabAdmin.Message,
    },
    [RouteTabAdmin.AccountTab]: {
      name: RouteTabAdmin.AccountTab,
      route: Screens.Admin.AccountTab,
      Icon: Icons.AccountCircle,
      label: LabelTabAdmin.Account,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName={RouteTabAdmin.HomeTab}
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

export { TabNavigatorAdmin };

