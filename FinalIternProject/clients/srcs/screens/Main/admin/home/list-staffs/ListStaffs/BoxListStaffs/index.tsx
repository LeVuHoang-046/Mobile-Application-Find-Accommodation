import {Box, BoxListUsers, BoxListUsersProps, TouchableApp} from '@component';
import {ColorsStatic, RouteMain} from '@constants';
import { useNavigation } from '@react-navigation/native';
import { TAppNavigation } from '@types';
import React, {memo} from 'react';
import { Pressable } from 'react-native';

type BoxListStaffsProps = {
  item?: any;
};

export const BoxListStaffs: React.NamedExoticComponent<BoxListStaffsProps> =
  memo(item => {
    const navigation = useNavigation<TAppNavigation<RouteMain.ListStaffs>>();
    const listStaffs: BoxListUsersProps[] = [
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
          {listStaffs.map((item, index) => (
            <BoxListUsers
              name={item.name}
              phoneNumber={item.phoneNumber}
              key={`BoxListStaffs_${index}`}
            />
          ))}
        </Box>
      </TouchableApp>
    );
  });
