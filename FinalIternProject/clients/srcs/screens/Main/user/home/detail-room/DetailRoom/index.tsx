import {Icons} from '@assets';
import {
  Box,
  BoxButtonsForm,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {BoxRoomDetail} from './BoxRoomDetail';
import {useCallback, useRef, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamList, FormsMakeAnAppointment} from '@types';
import {defaultMakeAnAppointmentValue, RouteMain} from '@constants';
import {useQueryBoardingHouseDetail, useQueryUserInformation} from '@api';
import {ModalDetail} from './ModalDetail';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {FormProvider, useForm} from 'react-hook-form';
import { resolverMakeAnAppointment } from '@validates';
import { usePhoneUserStore } from '@stores';

type DetailRoomRouteProp = RouteProp<AppStackParamList, RouteMain.DetailRoom>;

const DetailRoomScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const forms = useForm<FormsMakeAnAppointment>({
    defaultValues: defaultMakeAnAppointmentValue,
    resolver: resolverMakeAnAppointment,
    mode: 'onSubmit',
  });

  const [isHeartPressed, setIsHeartPressed] = useState(false);

  const route = useRoute<DetailRoomRouteProp>();
  const {id} = route.params;

  const {data} = useQueryBoardingHouseDetail(id);
  const {phoneNumber} = usePhoneUserStore();
  const { data: users } = useQueryUserInformation(phoneNumber ?? '');

  const handleHeartPress = () => {
    setIsHeartPressed(!isHeartPressed);
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePress = useCallback((item: any) => {
    bottomSheetRef.current?.expand(item);
  }, []);

  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp
          title="Detail room"
          goBack
          IconRight={
            isHeartPressed ? (
              <Icons.Heart size={24} color="red" />
            ) : (
              <Icons.HeartOutLine size={24} />
            )
          }
          onPressRight={handleHeartPress}
        />
        {navigateFinish ? (
          <>
            <BoxRoomDetail item={data} />
            <BoxButtonsForm
              titleBetweenButton="Chat"
              onPressRightButton={handlePress}
            />
          </>
        ) : (
          <LoadingComponent />
        )}
        <ModalDetail ref={bottomSheetRef} dataHouse={data} dataUser={users}/>
      </FormProvider>
    </Box>
  );
};
export const DetailRoom = performanceNavigation(DetailRoomScreen);
