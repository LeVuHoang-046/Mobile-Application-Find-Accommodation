import {Icons} from '@assets';
import {
  Box,
  HeaderApp,
  InputApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {ColorsStatic, defaultListCustomersValue} from '@constants';
import {scaler} from '@themes';
import {FormsListCustomers} from '@types';
import {FormProvider, useForm} from 'react-hook-form';
import {BoxListCustomers} from './BoxListCustomers';
import { useCallback } from 'react';
import { FlatListApp } from '@component/FlatListApp';
import { StyleSheet } from 'react-native';

const ListCustomersScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const forms = useForm<FormsListCustomers>({
    defaultValues: defaultListCustomersValue,
    mode: 'onChange',
  });

  const renderItem = useCallback(({item}:{item:any})=> {
    return <BoxListCustomers item={item}/>
  },[])

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
                name="Search"
                control={forms.control}
                placeholder="Search here..."
                IconLeft={Icons.Search}
                iconSize={20}
              />
            </Box>
           <FlatListApp
           data={Array(10).fill(0)}
           renderItem={renderItem}
           refreshing={false}
           contentContainerStyle={styles.flatList}
           style={styles.flatListApp}
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
    flatListApp:{
      marginTop: 0,

    }
  });

export const ListCustomers = performanceNavigation(ListCustomersScreen);
