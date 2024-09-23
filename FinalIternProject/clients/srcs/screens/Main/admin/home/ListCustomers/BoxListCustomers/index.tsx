import {Box, BoxListUsers, BoxListUsersProps, TouchableApp} from '@component';
import {ColorsStatic, RouteMain} from '@constants';
import { useNavigation } from '@react-navigation/native';
import { TAppNavigation } from '@types';
import React, {memo} from 'react';
import { Pressable } from 'react-native';

type BoxListCustomersProps = {
  item?: any;
};

export const BoxListCustomers: React.NamedExoticComponent<BoxListCustomersProps> =
  memo(item => {
    const navigation = useNavigation<TAppNavigation<RouteMain.ListCustomers>>();
    const listCustomers: BoxListUsersProps[] = [
      {
        name: 'Le Vu Hoang',
        phoneNumber: '+84123456789',
      },
      {
        name: 'Tran Huy Dat',
        phoneNumber: '+84123456111',
      },
    ];
    return (
      <TouchableApp onPress={()=> navigation.navigate(RouteMain.CustomersInformationDetail)}>
        <Box color={ColorsStatic.white}>
          {listCustomers.map((item, index) => (
            <BoxListUsers
              name={item.name}
              phoneNumber={item.phoneNumber}
              key={`BoxListUers_${index}`}
            />
          ))}
        </Box>
      </TouchableApp>
    );
  });
