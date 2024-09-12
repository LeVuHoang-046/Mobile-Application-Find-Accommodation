import {NavigationContainer} from '@react-navigation/native';
import {ForwardRefComponent} from '@types';
import React, {useEffect} from 'react';
import {Stack} from './stack';
import {useTokenUserStore} from '@stores';
import {LoadingComponent} from '@component';

const NavigationApp: ForwardRefComponent<any, {}> = React.forwardRef(
  (_, ref: any) => {
    const {data: token, refetch} = useTokenUserStore();
    
    useEffect(() => {
      console.log('Token:', token);
      if (!token) {
        refetch();
      }
    }, [token, refetch]);

    const renderStackApp = () => {
      if (token) {
        return <Stack.MainStackComponent />;
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
