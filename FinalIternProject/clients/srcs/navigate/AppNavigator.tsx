import {NavigationContainer} from '@react-navigation/native';
import {ForwardRefComponent} from '@types';
import React, {useEffect} from 'react';
import {Stack} from './stack';
import {usePhoneUserStore, useTokenUserStore} from '@stores';
import {LoadingComponent} from '@component';
import {useQueryUserInformation} from '@api';
import {ETypeRoles} from '@constants';

const NavigationApp: ForwardRefComponent<any, {}> = React.forwardRef(
  (_, ref: any) => {
    const {token} = useTokenUserStore();
    const {phoneNumber} = usePhoneUserStore();
    const {data} = useQueryUserInformation(phoneNumber ?? '');
    console.log('role: ', data?.role);
    const renderStackApp = () => {
      if (token && data?.role === ETypeRoles.User) {
        return <Stack.MainStackComponent />;
      }
      if (token && data?.role === ETypeRoles.Staff) {
        return <Stack.StaffStackComponent />;
      }
      if (token && data?.role === ETypeRoles.Admin) {
        return <Stack.AdminStackComponent />;
      } else {
        return <Stack.AuthStackComponent />;
      }
    };
    return (
      <NavigationContainer ref={ref}>{renderStackApp()}</NavigationContainer>
    );
  },
);

export {NavigationApp};
