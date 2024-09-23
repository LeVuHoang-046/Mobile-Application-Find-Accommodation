import {Icons} from '@assets';
import {
  Box,
  HeaderApp,
  InputApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {FlatListApp} from '@component/FlatListApp';
import {ColorsStatic, defaultListStaffsValue} from '@constants';
import {scaler} from '@themes';
import {FormsListStaffs} from '@types';
import {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {BoxListStaffs} from './BoxListStaffs';

const ListStaffsScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const forms = useForm<FormsListStaffs>({
    defaultValues: defaultListStaffsValue,
    mode: 'onChange',
  });

  const renderItem = useCallback(({item}: {item: any}) => {
    return <BoxListStaffs item={item} />;
  }, []);

  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp title="List staffs" goBack IconRight={<Icons.PlusVer2 />} />
        {navigateFinish ? (
          <Box flex={1}>
            <Box
              color={ColorsStatic.white}
              ph={scaler(10)}
              pt={scaler(16)}
              pb={scaler(6)}
              rowGap={scaler(12)}
              mb={scaler(10)}>
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
  flatListApp: {
    marginTop: 0,
  },
});

export const ListStaffs = performanceNavigation(ListStaffsScreen);
