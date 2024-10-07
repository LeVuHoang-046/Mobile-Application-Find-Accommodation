import {Box, BoxListUsers, BoxListUsersProps, TouchableApp} from '@component';
import {ColorsStatic, RouteMain} from '@constants';
import { useNavigation } from '@react-navigation/native';
import { TAppNavigation, UserMeType } from '@types';
import React, { memo } from 'react';

type BoxListCustomersProps = {
  item: UserMeType; // The item is of type UserMeType
};

export const BoxListCustomers: React.NamedExoticComponent<BoxListCustomersProps> = memo(
  ({ item }) => {
    const navigation = useNavigation<TAppNavigation<RouteMain.ListCustomers>>();
console.log({item})
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
  }
);
