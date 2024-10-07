import {Icons} from '@assets';
import {
  Box,
  HeaderApp,
  InputApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {ColorsStatic, defaultListCustomersValue, ETypeRoles} from '@constants';
import {scaler} from '@themes';
import {FormsListCustomers, UserMeType} from '@types';
import {FormProvider, useForm} from 'react-hook-form';
import {BoxListCustomers} from './BoxListCustomers';
import { useCallback, useMemo } from 'react';
import { FlatListApp } from '@component/FlatListApp';
import { StyleSheet } from 'react-native';
import { useQueryUsersByRole } from '@api';

const ListCustomersScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const forms = useForm<FormsListCustomers>({
    defaultValues: defaultListCustomersValue,
    mode: 'onChange',
  });

  // Fetch users by role
  const { data: users, error, isLoading } = useQueryUsersByRole(ETypeRoles.User);

  // Watch for the search input value
  const searchValue = forms.watch('search', ''); // Watching 'search', not 'Search'

  // Filter the users based on the search value
  const filteredUsers = useMemo(() => {
    if (!users || !searchValue) return users || []; // Return full list if no search term

    return users.filter((user: UserMeType) => 
      user.fullName.toLowerCase().includes(searchValue.toLowerCase()) || 
      user.phone.includes(searchValue)
    );
  }, [users, searchValue]);

  // Render each customer
  const renderItem = useCallback(({ item }: { item: UserMeType }) => {
    return <BoxListCustomers item={item} />;
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp title="List customers" goBack />
        {navigateFinish ? (
          <Box flex={1}>
            <Box
              color={ColorsStatic.white}
              ph={scaler(10)}
              pt={scaler(16)}
              pb={scaler(6)}
              rowGap={scaler(12)}
              mb={scaler(10)}
            >
              <InputApp
                name="search" // Match the 'name' prop with what you're watching
                control={forms.control}
                placeholder="Search here..."
                IconLeft={Icons.Search}
                iconSize={20}
              />
            </Box>
            <FlatListApp
              data={filteredUsers} // Use filtered users
              renderItem={renderItem}
              refreshing={false}
              contentContainerStyle={styles.flatList}
              style={styles.flatListApp}
              keyExtractor={(item) => (item.user_id ? item.user_id.toString() : Math.random().toString())}
            />
          </Box>
        ) : (
          <LoadingComponent />
        )}
      </FormProvider>
    </Box>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 0,
    rowGap: 0,
  },
  flatListApp: {
    marginTop: 0,
  },
});

export const ListCustomers = performanceNavigation(ListCustomersScreen);
