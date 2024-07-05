// import {R} from '@src/assets/R';
// import {Svgs} from '@assets';

  import {
    BottomTabBarProps,
    createBottomTabNavigator,
  } from '@react-navigation/bottom-tabs';
  import {screens} from '@screens';
  import React from 'react';
//   import {CustomTabBar} from './CustomTabBar';
  import {createStackNavigator} from '@react-navigation/stack';
import { ROUTE_TAB } from '@navigate/routes';
import { IconHome, IconService } from '@assets';
  
  export type IItemTabBar = {
    name: string;
    route: () => JSX.Element;
    Icon: Element;
    IconBlur: Element;
    label?: string;
  };
  export interface ITabBar {
    [x: string]: IItemTabBar;
  }
  
  const {HOME_TAB, MESSAGE_TAB, SERVICE_TAB, ACCOUNT_TAB} =
    ROUTE_TAB;
  
  const Tab = createBottomTabNavigator();
  const MainStack = createStackNavigator();
  
  const TabNavigator = () => {
    const TAB_BAR: ITabBar = {
      [HOME_TAB]: {
        name: HOME_TAB,
        route: screens.HomeScreen,
        Icon: () => <IconHome />,
        IconBlur: () => <IconHome />,
        label: 'Home',
      },
      [SERVICE_TAB]: {
        name: SERVICE_TAB,
        route: screens.ServiceScreen,
        Icon: () => <IconService />,
        IconBlur: () => <IconService />,
        label: 'Service',
      },
      [MESSAGE_TAB]: {
        name: MESSAGE_TAB,
        route: screens.MessageScreen,
        Icon: () => <IconGiangDay />,
        IconBlur: () => <IconGiangDayFocus />,
        label: 'Message',
      },
      [ACCOUNT_TAB]: {
        name: ACCOUNT_TAB,
        route: screens.AccountScreen,
        Icon: () => <IconCaNhan />,
        IconBlur: () => <IconCaNhanFocus />,
        label: 'Account',
      },
    };
  
    return (
      <Tab.Navigator
        screenOptions={{headerShown: false, tabBarShowLabel: false}}
        initialRouteName={HOME_TAB}
        // tabBar={(props: BottomTabBarProps) => (
        //   <CustomTabBar {...props} tabBar={TAB_BAR} />
        // )}
        >
        {Object.keys(TAB_BAR).map((elem, index) => (
          <Tab.Screen
            key={index}
            name={elem}
            component={TAB_BAR[elem].route}
            options={{tabBarShowLabel: false}}
          />
        ))}
        {/* <Tab.Screen
          name={ROUTE_MAIN.QUA_TRINH_DAO_TAO_BOI_DUONG}
          component={screens.QuaTrinhDaoTaoBoiDuong}
          options={{tabBarShowLabel: false}}
        /> */}
      </Tab.Navigator>
    );
  };
  
  export {TabNavigator};
  