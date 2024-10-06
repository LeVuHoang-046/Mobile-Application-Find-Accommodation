import {toast} from '@backpackapp-io/react-native-toast';
import {
  BottomSheetModalAppRef,
  Box,
  HeaderApp,
  ModalAppDetailRef,
  ModalWarning,
} from '@component';
import {
  ColorsStatic,
  defaultAddBuildingDetail,
  ETypeToastCustom,
  RouteMain,
} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {scaler} from '@themes';
import {
  FormsAddBuildingDetail,
  FormsAddListRoom,
  FormsAddMoreService,
  TAppNavigation,
} from '@types';
import {pushToastCustom, pushToastLoading} from '@utils/toast';
import {useCallback, useRef} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {FormPostingInformation} from './FormPostingInformation';
import {FormServiceFee} from './FormServiceFee';
import {useStyles} from 'react-native-unistyles';
import {FormAddListRoom} from './FormAddListRoom';
import {stylesheet} from '../style';
import { FormButtonFooter } from './FormButtonFooter/inedx';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddBuildingDetailSchema } from '@validates';

export const AddBuildingDetail: React.FC = () => {
  const {styles} = useStyles(stylesheet);
  const forms = useForm<FormsAddBuildingDetail>({
    defaultValues: defaultAddBuildingDetail,
      resolver: zodResolver(AddBuildingDetailSchema),
    mode: 'onChange',
  });

  const navigation =
    useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();

  const modalDetailRef = useRef<BottomSheetModalAppRef>(null);

  const modalWarningRef = useRef<ModalAppDetailRef>(null);

  const currentValues = forms.getValues();

  // console.log('watch ', forms.watch('listAddMoreService'));

  const onSubmit = () => {
    console.log('from submit', forms.formState.errors);
  };
  const onError = () => {
    console.log('from submit error', forms.formState.errors);
  };

  const handlePressAdd = useCallback(() => {
    modalDetailRef.current?.open();
  }, []);

  const handleCallbackSend = () => {
    // navigation.goBack();
    modalWarningRef.current?.show();
  };

  const handleCallbackSave = () => {
    const currentValues = forms.getValues();
    forms.reset(currentValues, {
      keepDirty: false,
      keepValues: true,
    });
  };
  const handleAddAndSave = async (item: FormsAddListRoom) => {
    const currentList = forms.getValues('listAddRoom');
    const existingRoomIndex = currentList.findIndex(
      room => room.id === item.id,
    );

    if (existingRoomIndex !== -1) {
      const updatedRooms = [...currentList];
      updatedRooms[existingRoomIndex] = item; // Update existing room
      forms.setValue('listAddRoom', updatedRooms);
    } else {
      forms.setValue('listAddRoom', [...currentList, item]); // Add new room
    }

    forms.trigger('listAddRoom');
  };

  const handleDeleteRoom = async (roomId: string) => {
    const currentList = forms.getValues('listAddRoom');
    const updatedRooms = currentList.filter(room => room.id !== roomId);
    forms.setValue('listAddRoom', updatedRooms);
    forms.trigger('listAddRoom');
  };

  const handleAddAndSaveService = async (item: FormsAddMoreService) => {
    const currentList = forms.getValues('listAddMoreService');
    const existingRoomIndex = currentList.findIndex(
      service => service.id === item.id,
    );

    if (existingRoomIndex !== -1) {
      const updatedServices = [...currentList];
      updatedServices[existingRoomIndex] = item;
      forms.setValue('listAddMoreService', updatedServices);
    } else {
      forms.setValue('listAddMoreService', [...currentList, item]);
    }
    forms.trigger('listAddMoreService');
  };

  const handleDeleteService = async (serviceId: string) => {
    const currentList = forms.getValues('listAddMoreService');
    const updatedServices = currentList.filter(
      service => service.id !== serviceId,
    );
    forms.setValue('listAddMoreService', updatedServices);
    forms.trigger('listAddMoreService');
  };

  const handlePressConfirm = () => {
    modalWarningRef.current?.hide();
    const loading = pushToastLoading('Saving...');
    // navigation.goBack();
    setTimeout(() => {
      pushToastCustom('Post succesfully', ETypeToastCustom.Success);
      toast.dismiss(loading);
      // navigation.navigate(RouteApp.RegisterMakeUpLectures);
    }, 2000);
  };

  return (
    <Box flex={1}>
      <HeaderApp title={'Add building detail'} goBack />
      <FormProvider {...forms}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Box mt={scaler(10)} rowGap={scaler(10)} flex={1}>
            <FormPostingInformation />
            <FormAddListRoom
              rooms={currentValues.listAddRoom}
              onCallBack={handleAddAndSave}
              onDelete={handleDeleteRoom}
            />
            <FormServiceFee
              services={currentValues.listAddMoreService}
              onDelete={handleDeleteService}
              onCallBack={handleAddAndSaveService}
            />
          </Box>
        </ScrollView>
        <FormButtonFooter
        
        />
        <ModalWarning
          ref={modalWarningRef}
          onPressAgree={handlePressConfirm}
          title="Content will not be saved when exiting the screen?"
        />
      </FormProvider>
    </Box>
  );
};
