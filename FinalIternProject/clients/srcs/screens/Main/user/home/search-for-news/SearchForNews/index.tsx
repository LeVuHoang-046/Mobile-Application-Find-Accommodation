import {Icons} from '@assets';
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
import {ColorsStatic, defaultSearchForNewsValue, RouteMain} from '@constants';
import {scaler} from '@themes';
import {AppStackParamList, BoardingHouseInfoType, FormsSearchForNews, RoomInfoType} from '@types';
import {useCallback, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {BoxSearchForNews} from './BoxSearchForNews';
import {FlatListApp} from '@component/FlatListApp';
import {StyleSheet} from 'react-native';
import {ModalDetail, ModalDetailSearchForNewsProps} from './ModalDetail';
import {ModalFilter} from './ModalFilter';
import {
  useQueryBoardingHouseInfo,
  useQueryFacilitiesByRoomId,
  useQueryInteriorsByRoomId,
  useQueryRoomsByBoardingHouseId,
} from '@api';
import {mapTypeHouse} from '@utils';
import { RouteProp, useRoute } from '@react-navigation/native';

type SelectedLocation = {
  city: string | undefined;
  district: string | undefined;
  ward: string | undefined;
};
type SearchForNewsRouteProp = RouteProp<
  AppStackParamList,
  RouteMain.SearchForNews
>;

const SearchForNewsScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const route = useRoute<SearchForNewsRouteProp>();
  const { district = '' } = route.params || {};
  
  const modalFilterRef = useRef<BottomSheetModalAppRef>(null);
  const modalDetailRef = useRef<ModalDetailSearchForNewsProps>(null);

  const forms = useForm<FormsSearchForNews>({
    defaultValues: defaultSearchForNewsValue,
    mode: 'onChange',
  });

  const {data} = useQueryBoardingHouseInfo();

  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    city: undefined,
    district: undefined,
    ward: undefined,
  });

  const minPrice = parseFloat(forms.watch('minPrice')) || null; // Default to 0 if empty
  const maxPrice = parseFloat(forms.watch('maxPrice')) || null; 
  console.log({minPrice})

  const handleLocationSelect = (city: string, district: string, ward: string) => {
    setSelectedLocation({ city, district, ward });
    modalFilterRef.current?.close(); 
  };

  const filteredData =
    data?.filter((item: BoardingHouseInfoType) => {
      const searchQuery = forms.watch('search')?.toLowerCase();
      const selectedFacilities = forms.watch('amentitiesType') || [];
      const selectedInteriors = forms.watch('interior') || [];
      const selectedRoomTypes = forms.watch('roomType') || [];

      // Check for search matches
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery) ||
        item.district_name.toLowerCase().includes(searchQuery) ||
        item.ward_name.toLowerCase().includes(searchQuery);

      // Fetch rooms for the boarding house
      const {data: rooms} = useQueryRoomsByBoardingHouseId(item.id);

      // Collect facilities for all rooms
      const roomFacilities = rooms?.reduce(
        (acc: string[], room: RoomInfoType) => {
          const {data: facilities} = useQueryFacilitiesByRoomId(room.id);
          if (facilities) {
            return [...acc, ...facilities.map(facility => facility.name)]; // Assuming facilities have a 'label'
          }
          return acc;
        },
        [],
      );

      // Check if all selected facilities are available in the room facilities
      const matchesFacilities =
        selectedFacilities.length === 0 ||
        selectedFacilities.every(facility =>
          roomFacilities?.includes(facility.label),
        );

      const roomInteriors = rooms?.reduce(
        (acc: string[], room: RoomInfoType) => {
          const {data: interiors} = useQueryInteriorsByRoomId(room.id);
          if (interiors) {
            return [...acc, ...interiors.map(interior => interior.name)];
          }
          return acc;
        },
        [],
      );

      const matchesInteriors =
        selectedInteriors.length === 0 ||
        selectedInteriors.every(interior =>
          roomInteriors?.includes(interior.label),
        );

      // Check room type matches
      const matchesRoomType =
        selectedRoomTypes.length === 0 ||
        selectedRoomTypes.some(selectedType => {
          const mappedRoomType = mapTypeHouse(item.type_house);
          return selectedType.label === mappedRoomType;
        });

        const matchesLocation =
      (!selectedLocation.city || item.city_name === `City ${selectedLocation.city}`) &&
      (!selectedLocation.district || item.district_name === `District ${selectedLocation.district}`) &&
      (!selectedLocation.ward || item.ward_name === `Ward ${selectedLocation.ward}`);

      const matchesDistrict = !district || item.district_name === `District ${district}`;

      const roomPrices = rooms?.map(room => room.price) || [];
      console.log({roomPrices})

      const matchesPriceRange =
        (!minPrice || roomPrices.some(price => parseInt(price) >= minPrice)) &&
        (!maxPrice || roomPrices.some(price => parseInt(price) <= maxPrice));
      return (
        matchesSearch &&
        matchesFacilities &&
        matchesInteriors &&
        matchesRoomType && matchesLocation && matchesDistrict && matchesPriceRange
      );
    }) || [];



  const renderItem = useCallback(({item}: {item: BoardingHouseInfoType}) => {
    return <BoxSearchForNews item={item} />;
  }, []);

  const handlePressModalDetail = useCallback(() => {
    modalDetailRef.current?.show();
  }, []);

  const computedTitle = () => {
    const { city, district, ward } = selectedLocation;
    let title = "Area:";
    if (city) title += ` ${city}`;
    if (district) title += ` ${district}`;
    if (ward) title += ` ${ward}`;
    return title.trim();
  };

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
                  title={district? `${district}`:computedTitle()}
                  IconLeft={<Icons.Location size={14} color={ColorsStatic.red1} />}
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
        <ModalDetail ref={modalDetailRef} onSelectLocation={handleLocationSelect} />
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
