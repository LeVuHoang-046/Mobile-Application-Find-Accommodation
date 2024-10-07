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
  CONFIG_SSO,
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
import {FormButtonFooter} from './FormButtonFooter/inedx';
import {zodResolver} from '@hookform/resolvers/zod';
import {AddBuildingDetailSchema} from '@validates';
import {routes} from '@services';
import {usePhoneUserStore} from '@stores';
import {useQueryUserInformation} from '@api';
import { revertTypeHouse } from '@utils';

export const AddBuildingDetail: React.FC = () => {
  const {styles} = useStyles(stylesheet);
  const forms = useForm<FormsAddBuildingDetail>({
    defaultValues: defaultAddBuildingDetail,
    resolver: zodResolver(AddBuildingDetailSchema),
    mode: 'onChange',
  });
  // console.log('value:', forms.getValues('listAddRoom'));
  const navigation =
    useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();

  const modalDetailRef = useRef<BottomSheetModalAppRef>(null);

  const modalWarningRef = useRef<ModalAppDetailRef>(null);

  const currentValues = forms.getValues();
  
 
  const {phoneNumber} = usePhoneUserStore();
  const {data: users} = useQueryUserInformation(phoneNumber ?? '');
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

  const handlePressConfirm = async () => {
    modalWarningRef.current?.hide();
    const loading = pushToastLoading('Saving...');

    try {
      const formData = forms.getValues();
      const rooms = formData.listAddRoom;
      const postData = {
        city_id: formData.city_id,
        district_id: formData.district_id,
        ward_id: formData.ward_id,
        detail_address: formData.detail_address,
        staff_name: users?.fullName,
        staff_phone: users?.phone,
        title: formData.title,
        email: users?.email,
        name_building: formData.nameBuilding,
        type_house: revertTypeHouse(formData.roomType.label),
        parking_space: formData.parkingSpaces,
        description: formData.describe,
        rooms: rooms,
      };

      const response = await fetch(
        `${CONFIG_SSO.BASE.HOME}${routes.api.boardinghouse}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        },
      );
      console.log('Response status:', response.status);
  
      
      const result = await response.json();
      console.log('Response data:', result);
      if (response.ok) {
        pushToastCustom('Post successfully', ETypeToastCustom.Success);
        toast.dismiss(loading);
        forms.reset(defaultAddBuildingDetail);
      } else {
        throw new Error(result.message || 'Failed to create boarding house.');
      }
    } catch (error) {
      pushToastCustom('Post failed: ', ETypeToastCustom.Error);
      console.error('Error:', error);
      toast.dismiss(loading);
    }
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
            {/* <FormServiceFee
              services={currentValues.listAddMoreService}
              onDelete={handleDeleteService}
              onCallBack={handleAddAndSaveService}
            /> */}
          </Box>
        </ScrollView>
        <FormButtonFooter onCallbackSend={handlePressConfirm} />
        <ModalWarning
          ref={modalWarningRef}
          onPressAgree={handlePressConfirm}
          title="Content will not be saved when exiting the screen?"
        />
      </FormProvider>
    </Box>
  );
};
