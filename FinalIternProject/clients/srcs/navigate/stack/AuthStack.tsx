import { RouteAuth } from '@constants';
import {createStackNavigator} from '@react-navigation/stack';
import { Screens } from '@screens';

import { AppStackParamList, MemoComponent } from '@types';
import React, {memo} from 'react';
import {StatusBar} from 'react-native';


const AuthStack = createStackNavigator<AppStackParamList>();

const gesturesDisabled: RouteAuth[] = [RouteAuth.LOGIN];

const AuthStackComponent: MemoComponent<{}> = memo(() => {
  return (
    <>
      <AuthStack.Navigator
        initialRouteName={RouteAuth.LOGIN}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <AuthStack.Screen
          name={RouteAuth.LOGIN}
          component={Screens.Auth.Login}
          options={{
            gestureEnabled: false,
          }}
        />
        <AuthStack.Screen
          name={RouteAuth.SignUp}
          component={Screens.Auth.SignUp}
          
        />
        <AuthStack.Screen
          name={RouteAuth.InputOTP}
          component={Screens.Auth.InputOTP}
         
        />
        {/* <AuthStack.Screen
          name={ROUTE_AUTH.AUTHEN_CODE}
          component={screens.AuthenCode}
        />
        <AuthStack.Screen
          name={ROUTE_AUTH.CHOOSE_ACTIVITY}
          component={screens.ChooseActivity}
        /> */}
      </AuthStack.Navigator>

      <StatusBar barStyle="light-content" />
    </>
  );
});

export {AuthStackComponent};
