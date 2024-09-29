import {toast} from '@backpackapp-io/react-native-toast';
import {
  Box,
  HeaderApp,
  ModalAppDetailRef,
  ModalWarning,
  Row,
  TextApp,
  TouchableApp,
} from '@component';
import {
  ColorsStatic,
  defaultAddMoreServiceValue,
  ETypeToastCustom,
  RouteMain,
  serviceIconsArray,
} from '@constants';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {zodResolver} from '@hookform/resolvers/zod';
import {FontSize, scaler} from '@themes';
import {AppStackParamList, FormsAddMoreService, TAppNavigation} from '@types';
import {pushToastCustom, pushToastLoading} from '@utils/toast';
import {AddServiceFeeFormSchema} from '@validates';
import {useCallback, useMemo, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from '../style';
import {FormAddMoreService} from './FormAddMoreService';
import {FormButtonFooter} from './FormButtonFooter';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Icons } from '@assets';

type AddServiceFeeRouteProp = RouteProp<AppStackParamList, RouteMain.AddServiceFee>;


export const AddServiceFee: React.FC = () => {
  const route = useRoute<AddServiceFeeRouteProp>();
  const {onCallBackServiceSave, serviceData, onDelete} = route.params;
  const forms = useForm<FormsAddMoreService>({
    defaultValues: serviceData ? serviceData : defaultAddMoreServiceValue,
    resolver: zodResolver(AddServiceFeeFormSchema),
    mode: 'onChange',
  });
  const {styles} = useStyles(stylesheet);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(null);
  const [pressBackdropClose, setPressBackdropClose] = useState<boolean>(true);
  const modalWarningRef = useRef<ModalAppDetailRef>(null);
  const modalWarningDeleteRef = useRef<ModalAppDetailRef>(null);
  const snapPoints = useMemo(() => ['40%'], []); // Snap points for BottomSheet

  const navigation = useNavigation<TAppNavigation<RouteMain.AddServiceFee>>()

  const handleCallbackSend = () => {
    // navigation.goBack();
    modalWarningRef.current?.show();
  };

  const handlePressConfirmDelete = () => {
    modalWarningDeleteRef.current?.hide();
    
    if (onDelete && serviceData?.id) {
      onDelete(serviceData.id);
      console.log('delete:', serviceData.id);
      const loading = pushToastLoading('Deleting...');
  
      setTimeout(() => {
        pushToastCustom('Service deleted successfully', ETypeToastCustom.Success);
        toast.dismiss(loading);
        // Ensure the room is deleted before navigating back
        navigation.goBack();
      }, 2000);
    }
  };


  const handleCallbackSave = () => {
    const currentValues = forms.getValues();
    forms.reset(currentValues, {
      keepDirty: false,
      keepValues: true,
    });
  };

  const openBottomSheet = () => {
    // setPressBackdropClose(true);
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    // setPressBackdropClose(false);
    bottomSheetRef.current?.close();
  };

  const selectedIcons = [
    'fan',
    'sofa',
    'kitchen_shelf',
    'lamp',
    'curtain',
    'washing_machine',
    'bed',
    'fridge',
  ];

  // Filter the array to get only the selected icons
  const filteredIconsArray = serviceIconsArray.filter(item =>
    selectedIcons.includes(item.id),
  );
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={pressBackdropClose ? 'close' : 'none'}
        opacity={0.2}
      />
    ),
    [pressBackdropClose],
  );

  const handleIconSelect = (id: string) => {
    forms.setValue('iconService', id); // Pass only the id to the form
    closeBottomSheet();
  };

  const handlePressConfirm = () => {
    modalWarningRef.current?.hide();
    const loading = pushToastLoading('Saving...');
    // navigation.goBack();
    setTimeout(() => {
      pushToastCustom('Add service succesfully', ETypeToastCustom.Success);
      toast.dismiss(loading);
      // navigation.navigate(RouteApp.RegisterMakeUpLectures);
    }, 2000);
  };

  return (
    <Box flex={1}>
      <HeaderApp title={serviceData? 'Edit service':"Add service"} goBack
      onPressRight={()=> modalWarningDeleteRef.current?.show()}
      IconRight={serviceData ? <Icons.TrashCan size={20} color={ColorsStatic.red1}/>: null}
      />
      <FormProvider {...forms}>
        <Box p={scaler(10)} rowGap={scaler(8)}>
          <FormAddMoreService openBottomSheet={openBottomSheet} />
          <FormButtonFooter
          existingService={serviceData}
            onCallbackSend={handleCallbackSend}
            onCallbackSave={(item: FormsAddMoreService) => onCallBackServiceSave(item)}

          />
          <ModalWarning
            ref={modalWarningRef}
            onPressAgree={handlePressConfirm}
            title="Content will not be saved when exiting the screen?"
          />
           <ModalWarning
            ref={modalWarningDeleteRef}
            onPressAgree={handlePressConfirmDelete}
            title="Service will be delete when press confirm?"
          />
        </Box>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0} // Set index to 0 to open the modal
          snapPoints={snapPoints}
          onDismiss={closeBottomSheet}
          backdropComponent={renderBackdrop}>
          <Box
            height={scaler(300)}
            color={ColorsStatic.white}
            borderRadius={scaler(10)}
            rowGap={scaler(10)}>
            <TextApp
              pv={scaler(15)}
              textAlign="center"
              weight={700}
              size={FontSize.Font16}>
              Select icon
            </TextApp>
            <Box p={scaler(15)}>
              <Row
                rowGap={scaler(15)}
                columnGap={scaler(10)}
                justify="center"
                flexWrap="wrap">
                {filteredIconsArray.map(item => (
                  <TouchableApp
                    key={item.id}
                    style={styles.ChooseIcon}
                    onPress={() => handleIconSelect(item.id)}>
                    {item.icon({size: scaler(30), color: ColorsStatic.orange3})}
                  </TouchableApp>
                ))}
              </Row>
            </Box>
          </Box>
        </BottomSheetModal>
      </FormProvider>
    </Box>
  );
};
