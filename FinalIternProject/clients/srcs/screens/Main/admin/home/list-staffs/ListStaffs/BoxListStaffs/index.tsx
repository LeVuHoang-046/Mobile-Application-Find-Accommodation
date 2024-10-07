import {Box, BoxListUsers, BoxListUsersProps, TouchableApp} from '@component';
import {ColorsStatic, RouteMain} from '@constants';
import { useNavigation } from '@react-navigation/native';
import { TAppNavigation, UserMeType } from '@types';
import React, {memo} from 'react';
import { Pressable } from 'react-native';

type BoxListStaffsProps = {
  item: UserMeType;
};

export const BoxListStaffs: React.NamedExoticComponent<BoxListStaffsProps> =
  memo(({item}) => {
    const navigation = useNavigation<TAppNavigation<RouteMain.ListStaffs>>();
    return (
      <TouchableApp
        onPress={() => navigation.navigate(RouteMain.CustomersInformationDetail, {item: item})}
      >
        <Box color={ColorsStatic.white}>
          {/* Use the API data to render the customer's details */}
          <BoxListUsers
            name={item.fullName}
            phoneNumber={item.phone}
          />
        </Box>
      </TouchableApp>
    );
  });
