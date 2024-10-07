import {useQueryCities, useQueryDistricts, useQueryWards} from '@api';
import {
  Box,
  ButtonChooseCity,
  ModalAppDetail,
  ModalAppDetailRef,
  Row,
  TextApp,
} from '@component';
import {LineApp} from '@component/LineApp';
import {FontSize, scaler} from '@themes';
import {ForwardRefComponent} from '@types';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {FlatList} from 'react-native';

export type ModalDetailManageBuildingProps = {
  show: () => void;
  // onSelectLocation: (city: string, district: string, ward: string) => void;
};

export const ModalDetail: ForwardRefComponent<
  ModalDetailManageBuildingProps,
  {onSelectLocation?: (city: string, district: string, ward: string) => void}
> = forwardRef(({onSelectLocation}, ref) => {
  const modalRef = useRef<ModalAppDetailRef>(null);

  const [selectedCity, setSelectedCity] = useState<
    {id: number; name: string} | undefined
  >();
  const [selectedDistrict, setSelectedDistrict] = useState<
    {id: number; name: string} | undefined
  >();
  const [selectedWard, setSelectedWard] = useState<
    {id: number; name: string} | undefined
  >();

  // Fetch cities
  const {data: cities, isLoading: isLoadingCities} = useQueryCities();

  // Fetch districts based on selected city
  const {data: districts, isLoading: isLoadingDistricts} = useQueryDistricts(
    selectedCity?.id,
  );

  // Fetch wards based on selected district
  const {data: wards, isLoading: isLoadingWards} = useQueryWards(
    selectedDistrict?.id,
  );

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setSelectedCity(undefined); // Reset state when modal is shown
        setSelectedDistrict(undefined);
        setSelectedWard(undefined);
        modalRef.current?.show();
      },
      hide: () => {
        console.log('Hiding modal and resetting state');
        setSelectedCity(undefined);
        setSelectedDistrict(undefined);
        setSelectedWard(undefined);
        modalRef.current?.hide();
      },
    }),
    [],
  );

  const handleCitySelect = (city: {id: number; name: string}) => {
    setSelectedCity(city);
    setSelectedDistrict(undefined); // Reset district when city changes
    setSelectedWard(undefined); // Reset ward when city changes
    if (onSelectLocation) {
      onSelectLocation(city.name, '', ''); // Pass empty strings for district and ward
    }
  };

  const handleDistrictSelect = (district: {id: number; name: string}) => {
    setSelectedDistrict(district);
    setSelectedWard(undefined); // Reset ward when district changes
    if (onSelectLocation) {
      onSelectLocation(selectedCity?.name || '', district.name, ''); // Pass empty string for ward
    }
  };

  const handleWardSelect = (ward: {id: number; name: string}) => {
    setSelectedWard(ward);
    if (onSelectLocation) {
      onSelectLocation(selectedCity?.name || '', selectedDistrict?.name || '', ward.name);
  }
    modalRef.current?.hide();

    // Trigger your boarding house filter logic here once a ward is selected
  };

  const renderCityItem = ({item}: {item: {id: number; name: string}}) => (
    <ButtonChooseCity
      label={item.name}
      onPress={() => handleCitySelect(item)}
    />
  );

  const renderDistrictItem = ({item}: {item: {id: number; name: string}}) => (
    <ButtonChooseCity
      label={item.name}
      onPress={() => handleDistrictSelect(item)}
    />
  );

  const renderWardItem = ({item}: {item: {id: number; name: string}}) => (
    <ButtonChooseCity
      label={item.name}
      onPress={() => handleWardSelect(item)}
    />
  );

  return (
    <ModalAppDetail ref={modalRef}>
      <Box width={'100%'} height={scaler(320)}>
        <Box align="center">
          <Row>
            <TextApp size={FontSize.Font16} weight={700}>
              Choose Location
            </TextApp>
          </Row>
        </Box>
        <LineApp />

        {/* City Selection */}
        {!selectedCity && (
          <FlatList
            data={cities}
            contentContainerStyle={{paddingHorizontal: scaler(15)}}
            keyExtractor={item => item.id.toString()}
            renderItem={renderCityItem}
            ListEmptyComponent={
              isLoadingCities ? (
                <TextApp>Loading cities...</TextApp>
              ) : (
                <TextApp>No cities available</TextApp>
              )
            }
          />
        )}

        {/* District Selection (Only shows after city is selected) */}
        {selectedCity && !selectedDistrict && (
          <>
            <TextApp pl={scaler(15)} size={FontSize.Font14} weight={700}>
              Selected City: {selectedCity.name}
            </TextApp>
            <LineApp />
            <FlatList
              data={districts}
              contentContainerStyle={{paddingHorizontal: scaler(15)}}
              keyExtractor={item => item.id.toString()}
              renderItem={renderDistrictItem}
              ListEmptyComponent={
                isLoadingDistricts ? (
                  <TextApp>Loading districts...</TextApp>
                ) : (
                  <TextApp>No districts available</TextApp>
                )
              }
            />
          </>
        )}

        {/* Ward Selection (Only shows after district is selected) */}
        {selectedDistrict && !selectedWard && (
          <>
            <TextApp pl={scaler(15)} size={FontSize.Font14} weight={700}>
              Selected District: {selectedDistrict.name}
            </TextApp>
            <LineApp />
            <FlatList
              data={wards}
              contentContainerStyle={{paddingHorizontal: scaler(15)}}
              keyExtractor={item => item.id.toString()}
              renderItem={renderWardItem}
              ListEmptyComponent={
                isLoadingWards ? (
                  <TextApp>Loading wards...</TextApp>
                ) : (
                  <TextApp>No wards available</TextApp>
                )
              }
            />
          </>
        )}

        {/* Show final selection summary after all choices are made */}
        {selectedWard && (
          <Box align="center" mt={20}>
            <TextApp pl={scaler(15)} size={FontSize.Font14} weight={700}>
              Selected Location: {selectedCity?.name}, {selectedDistrict?.name},{' '}
              {selectedWard?.name}
            </TextApp>
          </Box>
        )}
      </Box>
    </ModalAppDetail>
  );
});
