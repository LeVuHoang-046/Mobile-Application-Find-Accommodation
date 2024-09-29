import {useStyles} from 'react-native-unistyles';
import {stylesheet} from '../style';
import {FormProvider, useForm} from 'react-hook-form';
import {AppStackParamList, FormsAddListRoom, TAppNavigation} from '@types';
import {
  ColorsStatic,
  defaultAddListRoomValue,
  ETypeToastCustom,
  RouteMain,
} from '@constants';
import {
  BottomSheetModalAppRef,
  Box,
  HeaderApp,
  ModalAppDetailRef,
  ModalWarning,
} from '@component';
import {useCallback, useRef} from 'react';
import {pushToastCustom, pushToastLoading} from '@utils/toast';
import {toast} from '@backpackapp-io/react-native-toast';
import {scaler} from '@themes';
import {ScrollView} from 'react-native';
import {FormRoomInformation} from './FormRoomInformation';
import {FormButtonFooter} from './FormButtonFooter';
import {AddListRoomFormSchema} from '@validates';
import {zodResolver} from '@hookform/resolvers/zod';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Icons} from '@assets';

// type FormsAddListRoomRefs = {
//   close: () => void;
//   route: RouteProp<{
//     params: {onCallbackSave: (item: FormsAddListRoom) => void};
//   }>;
// onCallbackSave: (item: FormsAddListRoom) => void;
// onCallbackSend: (item: FormsAddListRoom) => void;
// };
type AddListRoomRouteProp = RouteProp<AppStackParamList, RouteMain.AddListRoom>;

export const AddListRoom: React.FC = () => {
  const {styles} = useStyles(stylesheet);

  const route = useRoute<AddListRoomRouteProp>();
  const {onCallbackSave, roomData, onDelete} = route.params;

  const forms = useForm<FormsAddListRoom>({
    defaultValues: roomData ? roomData : defaultAddListRoomValue,
    resolver: zodResolver(AddListRoomFormSchema),
    mode: 'onChange',
  });
  // console.log('Received room data:', roomData);

  const modalDetailRef = useRef<BottomSheetModalAppRef>(null);
  const modalWarningRef = useRef<ModalAppDetailRef>(null);
  const modalWarningDeleteRef = useRef<ModalAppDetailRef>(null);

  const navigation = useNavigation<TAppNavigation<RouteMain.AddListRoom>>();

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
    modalWarningDeleteRef.current?.show();
  };

  const handleCallbackSave = () => {
    const currentValues = forms.getValues();
    forms.reset(currentValues, {
      keepDirty: false,
      keepValues: true,
    });
  };
  const handlePressConfirmDelete = () => {
    modalWarningDeleteRef.current?.hide();

    if (onDelete && roomData?.id) {
      onDelete(roomData.id);
      console.log('delete:', roomData.id);
      const loading = pushToastLoading('Deleting...');

      setTimeout(() => {
        pushToastCustom('Room deleted successfully', ETypeToastCustom.Success);
        toast.dismiss(loading);
        // Ensure the room is deleted before navigating back
        navigation.goBack();
      }, 2000);
    }
  };

  const handlePressConfirm = () => {
    modalWarningRef.current?.hide();
    const loading = pushToastLoading('Saving...');
    // navigation.goBack();
    setTimeout(() => {
      pushToastCustom('Add room succesfully', ETypeToastCustom.Success);
      toast.dismiss(loading);
      // navigation.navigate(RouteApp.RegisterMakeUpLectures);
    }, 2000);
  };
  return (
    <Box flex={1}>
      <HeaderApp
        title={roomData ? 'Room editing' : 'Add room'}
        goBack
        IconRight={
          roomData ? (
            <Icons.TrashCan size={22} color={ColorsStatic.red1} />
          ) : null
        }
        onPressRight={handleCallbackSend}
      />
      <FormProvider {...forms}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Box mt={scaler(10)} rowGap={scaler(10)} flex={1}>
            <FormRoomInformation />
          </Box>
        </ScrollView>
        <FormButtonFooter
          onCallbackSave={(item: FormsAddListRoom) => onCallbackSave(item)}
          existingRoom={roomData}
          // onCallbackSend={(item: FormsAddListRoom) => onCallbackSend(item)}
        />
        <ModalWarning
          ref={modalWarningRef}
          onPressAgree={handlePressConfirm}
          title="Content will not be saved when exiting the screen?"
        />
        <ModalWarning
          ref={modalWarningDeleteRef}
          // onPressAgree={handlePressConfirm}
          onPressDelete={handlePressConfirmDelete}
          title="Content will not be saved when exiting the screen?"
        />
      </FormProvider>
    </Box>
  );
};
