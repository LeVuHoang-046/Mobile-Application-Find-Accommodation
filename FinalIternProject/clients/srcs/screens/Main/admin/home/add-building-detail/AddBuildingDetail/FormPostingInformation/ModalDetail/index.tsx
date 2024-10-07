import { useQueryCities, useQueryDistricts, useQueryWards } from '@api';
import {
  Box,
  ButtonChooseCity,
  ModalAppDetail,
  ModalAppDetailRef,
  Row,
  TextApp,
} from '@component';
import { LineApp } from '@component/LineApp';
import { FontSize, scaler } from '@themes';
import { FormsAddBuildingDetail, ForwardRefComponent } from '@types';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, FlatList, TextInput } from 'react-native';

export type ModalDetailProps = {
  show: () => void;
};

export const ModalDetail: ForwardRefComponent<
  ModalDetailProps,
  { onSelectLocation?: (city: string, district: string, ward: string, address: string, city_id: number, district_id: number, ward_id: number) => void }
> = forwardRef(({ onSelectLocation }, ref) => {
  const modalRef = useRef<ModalAppDetailRef>(null);
 
  const [selectedCity, setSelectedCity] = useState<{ id: number; name: string } | undefined>();
  const [selectedDistrict, setSelectedDistrict] = useState<{ id: number; name: string } | undefined>();
  const [selectedWard, setSelectedWard] = useState<{ id: number; name: string } | undefined>();
  const [detailedAddress, setDetailedAddress] = useState('');

  // Fetch cities
  const { data: cities, isLoading: isLoadingCities } = useQueryCities();

  // Fetch districts based on selected city
  const { data: districts, isLoading: isLoadingDistricts } = useQueryDistricts(selectedCity?.id);

  // Fetch wards based on selected district
  const { data: wards, isLoading: isLoadingWards } = useQueryWards(selectedDistrict?.id);

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setSelectedCity(undefined);
        setSelectedDistrict(undefined);
        setSelectedWard(undefined);
        setDetailedAddress('');
        modalRef.current?.show();
      },
      hide: () => {
        modalRef.current?.hide();
      },
    }),
    []
  );

  const handleCitySelect = (city: { id: number; name: string }) => {
    setSelectedCity(city);
    setSelectedDistrict(undefined);
    setSelectedWard(undefined);
  };

  const handleDistrictSelect = (district: { id: number; name: string }) => {
    setSelectedDistrict(district);
    setSelectedWard(undefined);
  };

  const handleWardSelect = (ward: { id: number; name: string }) => {
    setSelectedWard(ward);
  };

  const handleConfirm = () => {
    if (onSelectLocation) {
      onSelectLocation(
        selectedCity?.name || '',
        selectedDistrict?.name || '',
        selectedWard?.name || '',
        detailedAddress, // Include detailed address in the callback
        selectedCity?.id || 0, // Pass city ID
        selectedDistrict?.id || 0, // Pass district ID
        selectedWard?.id || 0 // Pass ward ID
      );
    }
    modalRef.current?.hide(); // Hide modal after confirmation
  };

  const handleCancel = () => {
    modalRef.current?.hide();
  };

  const renderCityItem = ({ item }: { item: { id: number; name: string } }) => (
    <ButtonChooseCity label={item.name} onPress={() => handleCitySelect(item)} />
  );

  const renderDistrictItem = ({ item }: { item: { id: number; name: string } }) => (
    <ButtonChooseCity label={item.name} onPress={() => handleDistrictSelect(item)} />
  );

  const renderWardItem = ({ item }: { item: { id: number; name: string } }) => (
    <ButtonChooseCity label={item.name} onPress={() => handleWardSelect(item)} />
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
            contentContainerStyle={{ paddingHorizontal: scaler(15) }}
            keyExtractor={(item) => item.id.toString()}
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

        {/* District Selection */}
        {selectedCity && !selectedDistrict && (
          <>
            <TextApp pl={scaler(15)} size={FontSize.Font14} weight={700}>
              Selected City: {selectedCity.name}
            </TextApp>
            <LineApp />
            <FlatList
              data={districts}
              contentContainerStyle={{ paddingHorizontal: scaler(15) }}
              keyExtractor={(item) => item.id.toString()}
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

        {/* Ward Selection */}
        {selectedDistrict && !selectedWard && (
          <>
            <TextApp pl={scaler(15)} size={FontSize.Font14} weight={700}>
              Selected District: {selectedDistrict.name}
            </TextApp>
            <LineApp />
            <FlatList
              data={wards}
              contentContainerStyle={{ paddingHorizontal: scaler(15) }}
              keyExtractor={(item) => item.id.toString()}
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

        {/* Detailed Address Input */}
        {selectedWard && (
          <>
            <TextApp pl={scaler(15)} size={FontSize.Font14} weight={700}>
              Selected Location: {selectedCity?.name}, {selectedDistrict?.name}, {selectedWard?.name}
            </TextApp>
            <LineApp />
            <TextInput
              placeholder="Enter detailed address"
              value={detailedAddress}
              onChangeText={setDetailedAddress}
              style={{ margin: scaler(15), borderWidth: 1, borderColor: '#ccc', padding: scaler(10) }}
            />
            <Row justify="space-between" style={{ marginTop: scaler(10), paddingHorizontal: scaler(15) }}>
              <Button title="Cancel" onPress={handleCancel} />
              <Button title="Confirm" onPress={handleConfirm} />
            </Row>
          </>
        )}
      </Box>
    </ModalAppDetail>
  );
});
