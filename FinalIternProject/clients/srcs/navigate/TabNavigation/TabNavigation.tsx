
import { Icons } from '@assets';
import { LabelTab, RouteTabUser } from '@constants';
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

const TabNavigator = () => {
  const TAB_BAR: ITabBar = {
    [RouteTabUser.HomeTab]: {
      name: RouteTabUser.HomeTab,
      route: Screens.User.HomeScreen,
      Icon: Icons.Home,
      label: LabelTab.Home,
    },
    [RouteTabUser.ServiceTab]: {
      name: RouteTabUser.ServiceTab,
      route: Screens.User.ServiceScreen,
      Icon: Icons.Service,
      label: LabelTab.Service,
    },
    [RouteTabUser.MessageTab]: {
      name: RouteTabUser.MessageTab,
      route: Screens.User.MessageScreen,
      Icon: Icons.Message,
      label: LabelTab.Message,
    },
    [RouteTabUser.AccountTab]: {
      name: RouteTabUser.AccountTab,
      route: Screens.User.AccountScreen,
      Icon: Icons.AccountCircle,
      label: LabelTab.Account,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName={RouteTabUser.HomeTab}
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

export { TabNavigator };

