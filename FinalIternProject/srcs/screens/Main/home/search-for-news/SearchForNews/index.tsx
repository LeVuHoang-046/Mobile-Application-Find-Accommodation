import {Icons} from '@assets';
import {
  Box,
  ButtonSort,
  HeaderApp,
  InputApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
  Row,
  TouchableIconApp,
} from '@component';
import {ColorsStatic, defaultSearchForNewsValue} from '@constants';
import {scaler} from '@themes';
import {FormsSearchForNews} from '@types';
import {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useStyles} from 'react-native-unistyles';
import {BoxSearchForNews} from './BoxSearchForNews';
import {FlatListApp} from '@component/FlatListApp';
import {StyleSheet} from 'react-native';

const SearchForNewsScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const {theme} = useStyles();
  const forms = useForm<FormsSearchForNews>({
    defaultValues: defaultSearchForNewsValue,
    mode: 'onChange',
  });

  const renderItem = useCallback(({item}: {item: any}) => {
    return <BoxSearchForNews item={item} />;
  }, []);
  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp title="Search for news" goBack IconRight={Icons.Adjusment} />
        {navigateFinish ? (
          <Box flex={1}>
            <Box
              color={ColorsStatic.white}
              ph={scaler(10)}
              pt={scaler(16)}
              pb={scaler(6)}
              rowGap={scaler(12)}>
              <Row>
                <InputApp
                  name="search"
                  control={forms.control}
                  placeholder="search news"
                />
              </Row>
              <Row justify="space-between">
                <TouchableIconApp
                  IconLeft={<Icons.MoneyRange color={theme.colors.tint} />}
                  title="Price range"
                />
                <ButtonSort
                  title="Sort by"
                  sort={forms.watch('sort')}
                  onPress={sort => forms.setValue('sort', sort)}
                />
              </Row>
            </Box>
            <FlatListApp
              data={Array(10).fill(0)}
              renderItem={renderItem}
              refreshing={false}
              numColumns={2}
              contentContainerStyle={styles.flatList}
              columnWrapperStyle={styles.columnWrapper}
              // ItemSeparatorComponent={ItemSeparatorComponent}
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
    paddingHorizontal: scaler(10),
    paddingTop: scaler(5),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scaler(10),
  },
});

export const SearchForNews = performanceNavigation(SearchForNewsScreen);
