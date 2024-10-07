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
  TextApp,
  TouchableIconApp,
} from '@component';
import { ColorsStatic, defaultManageBuildingValue, defaultSearchForNewsValue, RouteMain } from '@constants';
import { scaler } from '@themes';
import { AppStackParamList, BoardingHouseInfoType, FormsManageBuilding, FormsSearchForNews, RoomInfoType } from '@types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FlatListApp } from '@component/FlatListApp';
import { StyleSheet } from 'react-native';
import {
  useQueryBoardingHouseInfo,
  useQueryFacilitiesByRoomId,
  useQueryInteriorsByRoomId,
  useQueryRoomsByBoardingHouseId,
} from '@api';
import { mapTypeHouse } from '@utils';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BoxManageBuilding } from './BoxManageBuilding';
import { ModalDetail, ModalDetailManageBuildingProps } from './ModalDetail';
import { ModalFilter } from './ModalFilter';

type SelectedLocation = {
  city: string | undefined;
  district: string | undefined;
  ward: string | undefined;
};

const ManageBuildingScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const modalFilterRef = useRef<BottomSheetModalAppRef>(null);
  const modalDetailRef = useRef<ModalDetailManageBuildingProps>(null);

  const forms = useForm<FormsManageBuilding>({
    defaultValues: defaultManageBuildingValue,
    mode: 'onChange',
  });

  const { data = [], isLoading, error, refetch } = useQueryBoardingHouseInfo(); // Ensure `data` is always an array

  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    city: undefined,
    district: undefined,
    ward: undefined,
  });

  const [roomQueries, setRoomQueries] = useState<any[]>([]);

  // Fetch rooms data outside the render loop
  useEffect(() => {
    const fetchRoomData = async () => {
      const roomDataPromises = data.map(async (item) => {
        const roomsQuery = await useQueryRoomsByBoardingHouseId(item.id);
        return { itemId: item.id, roomsQuery };
      });

      const roomData = await Promise.all(roomDataPromises);
      setRoomQueries(roomData);
    };

    fetchRoomData();
  }, [data]);

  const minPrice = parseFloat(forms.watch('minPrice')) || null;
  const maxPrice = parseFloat(forms.watch('maxPrice')) || null;

  if (isLoading) {
     
    <LoadingComponent />
    refetch();
  }
  if (error) return <LoadingComponent />;
  
  const handleLocationSelect = (city: string, district: string, ward: string) => {
    setSelectedLocation({ city, district, ward });
    modalFilterRef.current?.close();
  };

  const filteredData =
    data?.filter((item: BoardingHouseInfoType) => {
      const searchQuery = forms.watch('search')?.toLowerCase() || '';
      const selectedFacilities = forms.watch('amentitiesType') || [];
      const selectedInteriors = forms.watch('interior') || [];
      const selectedRoomTypes = forms.watch('roomType') || [];

      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery) ||
        item.district_name?.toLowerCase().includes(searchQuery) ||
        item.ward_name?.toLowerCase().includes(searchQuery);

      const roomQueryData = roomQueries.find(query => query.itemId === item.id)?.roomsQuery.data || [];

      // Initialize arrays to prevent undefined errors
      const roomsData = Array.isArray(roomQueryData) ? roomQueryData : [];

      const roomFacilities = roomsData.reduce((acc: string[], room) => {
        const facilitiesData = room.facilities || [];
        return [...acc, ...facilitiesData.map((facility:any) => facility.name)];
      }, []);

      const matchesFacilities =
        selectedFacilities.length === 0 ||
        selectedFacilities.every(facility =>
          roomFacilities.includes(facility.label),
        );

      const roomInteriors = roomsData.reduce((acc: string[], room) => {
        const interiorsData = room.interiors || [];
        return [...acc, ...interiorsData.map((interior:any) => interior.name)];
      }, []);

      const matchesInteriors =
        selectedInteriors.length === 0 ||
        selectedInteriors.every(interior =>
          roomInteriors.includes(interior.label),
        );

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

      const roomPrices = roomsData.map(room => parseFloat(room.price)).filter(price => !isNaN(price));

      const matchesPriceRange =
        (!minPrice || roomPrices.some(price => price >= minPrice)) &&
        (!maxPrice || roomPrices.some(price => price <= maxPrice));

      return (
        matchesSearch &&
        matchesFacilities &&
        matchesInteriors &&
        matchesRoomType &&
        matchesLocation &&
        matchesPriceRange
      );
    }) || [];

  const renderItem = useCallback(({ item }: { item: BoardingHouseInfoType }) => {
    return <BoxManageBuilding item={item} />;
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
          title="Manage Boarding house"
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
              pb={scaler(6)}
            >
              <Row>
                <InputApp
                  name="search"
                  control={forms.control}
                  placeholder="Search by title"
                  IconLeft={Icons.Search}
                  iconSize={20}
                  onChangeText={value => forms.setValue('search', value)}
                />
              </Row>
              <Row justify="space-between">
                <TouchableIconApp
                  title={computedTitle()}
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
              data={filteredData}
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

export const ManageBuilding = performanceNavigation(ManageBuildingScreen);
