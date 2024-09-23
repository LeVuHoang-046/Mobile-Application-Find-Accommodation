import {useStyles} from 'react-native-unistyles';
import {stylesheet} from '../style';
import {FormProvider, useForm} from 'react-hook-form';
import {FormsAddListRoom} from '@types';
import {defaultAddListRoomValue, ETypeToastCustom} from '@constants';
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
import { RouteProp } from '@react-navigation/native';

type FormsAddListRoomRefs = {
  close: () => void;
  route: RouteProp<{ params: { onCallbackSave: (item: FormsAddListRoom) => void } }>;
  // onCallbackSave: (item: FormsAddListRoom) => void;
  // onCallbackSend: (item: FormsAddListRoom) => void;
};

export const AddListRoom: React.FC<FormsAddListRoomRefs> = ({route}) => {
  const {styles} = useStyles(stylesheet);
  const forms = useForm<FormsAddListRoom>({
    defaultValues: defaultAddListRoomValue,
    resolver: zodResolver(AddListRoomFormSchema),
    mode: 'onChange',
  });
  const modalDetailRef = useRef<BottomSheetModalAppRef>(null);

  const modalWarningRef = useRef<ModalAppDetailRef>(null);
  const { onCallbackSave } = route.params; 

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
      <HeaderApp title="Add room" goBack />
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
          // onCallbackSend={(item: FormsAddListRoom) => onCallbackSend(item)}
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
