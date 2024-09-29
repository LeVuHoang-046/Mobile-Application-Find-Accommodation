import { Icons } from '@assets';
import {
  BottomSheetModalAppRef,
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
import { ColorsStatic, defaultSearchForNewsValue } from '@constants';
import { scaler } from '@themes';
import { BoardingHouseInfoType, FormsSearchForNews, RoomInfoType } from '@types';
import { useCallback, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BoxSearchForNews } from './BoxSearchForNews';
import { FlatListApp } from '@component/FlatListApp';
import { StyleSheet } from 'react-native';
import { ModalDetail, ModalDetailSearchForNewsProps } from './ModalDetail';
import { ModalFilter } from './ModalFilter';
import { useQueryBoardingHouseInfo, useQueryFacilitiesByRoomId, useQueryRoomsByBoardingHouseId } from '@api';

const SearchForNewsScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const modalFilterRef = useRef<BottomSheetModalAppRef>(null);
  const modalDetailRef = useRef<ModalDetailSearchForNewsProps>(null);

  const forms = useForm<FormsSearchForNews>({
    defaultValues: defaultSearchForNewsValue,
    mode: 'onChange',
  });

  const { data } = useQueryBoardingHouseInfo();

  const filteredData = data?.filter((item: BoardingHouseInfoType) => {
    const searchQuery = forms.watch('search')?.toLowerCase();
    const selectedFacilities = forms.watch('amentitiesType') || [];

    // Check for search matches
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery) ||
      item.district_name.toLowerCase().includes(searchQuery) ||
      item.ward_name.toLowerCase().includes(searchQuery);

    // Fetch rooms for the boarding house
    const { data: rooms } = useQueryRoomsByBoardingHouseId(item.id);
    
    // Collect facilities for all rooms
    const roomFacilities = rooms?.reduce((acc: string[], room: RoomInfoType) => {
      const { data: facilities } = useQueryFacilitiesByRoomId(room.id);
      if (facilities) {
        return [...acc, ...facilities.map(facility => facility.name)]; // Assuming facilities have a 'label'
      }
      return acc;
    }, []);

    // Check if all selected facilities are available in the room facilities
    const matchesFacilities =
      selectedFacilities.length === 0 || 
      selectedFacilities.every(facility => roomFacilities?.includes(facility.label));

    return matchesSearch && matchesFacilities;
  }) || [];

  const renderItem = useCallback(({ item }: { item: BoardingHouseInfoType }) => {
    return <BoxSearchForNews item={item} />;
  }, []);

  const handlePressModalDetail = useCallback(() => {
    modalDetailRef.current?.show();
  }, []);

  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp
          title="Search for news"
          goBack
          IconRight={<Icons.Adjusment />}
          onPressRight={() => modalFilterRef.current?.open()}
        />
        {navigateFinish ? (
          <Box flex={1}>
            <Box
              color={ColorsStatic.white}
              ph={scaler(10)}
              pt={scaler(16)}
              pb={scaler(6)}>
              <Row>
                <InputApp
                  name="search"
                  control={forms.control}
                  placeholder="Search by title"
                  IconLeft={Icons.Search}
                  iconSize={20}
                  onChangeText={value => forms.setValue('search', value)} // Update search value
                />
              </Row>
              <Row justify="space-between">
                <TouchableIconApp
                  title="Area: Ho Chi Minh"
                  IconLeft={<Icons.Location size={14} />}
                  IconRight={<Icons.ArrowDown color={ColorsStatic.gray1} />}
                  onPress={handlePressModalDetail}
                />
                <ButtonSort
                  title="Sort by"
                  sort={forms.watch('sort')}
                  onPress={sort => forms.setValue('sort', sort)}
                />
              </Row>
            </Box>
            <FlatListApp
              data={filteredData} // Use the filtered data here
              renderItem={renderItem}
              refreshing={false}
              numColumns={2}
              contentContainerStyle={styles.flatList}
              columnWrapperStyle={styles.columnWrapper}
            />
          </Box>
        ) : (
          <LoadingComponent />
        )}
        <ModalFilter
          close={() => modalFilterRef.current?.close()}
          ref={modalFilterRef}
        />
        <ModalDetail ref={modalDetailRef} />
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
