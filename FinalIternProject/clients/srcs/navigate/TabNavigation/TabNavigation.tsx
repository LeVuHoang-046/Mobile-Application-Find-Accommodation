
import { Icons } from '@assets';
import { LabelTab, RouteTab } from '@constants';
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
    [RouteTab.HomeTab]: {
      name: RouteTab.HomeTab,
      route: Screens.HomeScreen,
      Icon: Icons.Home,
      label: LabelTab.Home,
    },
    [RouteTab.ServiceTab]: {
      name: RouteTab.ServiceTab,
      route: Screens.ServiceScreen,
      Icon: Icons.Service,
      label: LabelTab.Service,
    },
    [RouteTab.MessageTab]: {
      name: RouteTab.MessageTab,
      route: Screens.MessageScreen,
      Icon: Icons.Message,
      label: LabelTab.Message,
    },
    [RouteTab.AccountTab]: {
      name: RouteTab.AccountTab,
      route: Screens.AccountScreen,
      Icon: Icons.AccountCircle,
      label: LabelTab.Account,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName={RouteTab.HomeTab}
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

