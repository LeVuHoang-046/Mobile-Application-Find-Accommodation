import {Icons} from '@assets';
import {
  Box,
  BoxButtonsAvailabel,
  BoxButtonsForm,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';

import {useCallback, useRef, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AppStackParamList,
  FormsMakeAnAppointment,
  TAppNavigation,
} from '@types';
import {defaultMakeAnAppointmentValue, RouteMain} from '@constants';
import {useQueryBoardingHouseDetail, useQueryUserInformation} from '@api';

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {FormProvider, useForm} from 'react-hook-form';
import {resolverMakeAnAppointment} from '@validates';
import {usePhoneUserStore} from '@stores';
import {BoxManaRoomDetail} from './BoxManaRoomDetail';
import {ConfirmationModal} from './ModalDetail';

type ManaDetailRoomRouteProp = RouteProp<
  AppStackParamList,
  RouteMain.ManaDetailRoom
>;

const ManaDetailRoomScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const forms = useForm<FormsMakeAnAppointment>({
    defaultValues: defaultMakeAnAppointmentValue,
    resolver: resolverMakeAnAppointment,
    mode: 'onSubmit',
  });

  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const [isRoomSelected, setIsRoomSelected] = useState(false);

  const route = useRoute<ManaDetailRoomRouteProp>();
  const {id} = route.params;

  const {data, refetch} = useQueryBoardingHouseDetail(id);
  // const {phoneNumber} = usePhoneUserStore();
  // const { data: users } = useQueryUserInformation(phoneNumber ?? '');

  const navigation = useNavigation<TAppNavigation<RouteMain.ManaDetailRoom>>();

  const handleNavigation = () => {
    navigation.navigate(RouteMain.FormCreateRoom, {
      item: data,
      onRoomCreated: refetch,
    });
  };

  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp title="Manage detail room" goBack />
        {navigateFinish ? (
          <>
            <BoxManaRoomDetail
              item={data}
              onRoomSelect={isSelected => setIsRoomSelected(isSelected)}
            />
          </>
        ) : (
          <LoadingComponent />
        )}
        {!isRoomSelected && (
      <BoxButtonsAvailabel
        titleRightButton='Create room'
        onPressRightButton={handleNavigation}
      />
    )}
      </FormProvider>
    </Box>
  );
};
export const ManaDetailRoom = performanceNavigation(ManaDetailRoomScreen);
