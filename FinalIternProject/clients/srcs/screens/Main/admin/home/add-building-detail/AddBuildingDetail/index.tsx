import { toast } from "@backpackapp-io/react-native-toast";
import { BottomSheetModalAppRef, Box, HeaderApp, ModalAppDetailRef, ModalWarning } from "@component";
import { ColorsStatic, defaultAddBuildingDetail, ETypeToastCustom, RouteMain } from "@constants";
import { useNavigation } from "@react-navigation/native";
import { scaler } from "@themes";
import { FormsAddBuildingDetail, FormsAddListRoom, TAppNavigation } from "@types";
import { pushToastCustom, pushToastLoading } from "@utils/toast";
import { useCallback, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { FormPostingInformation } from "./FormPostingInformation";
import { FormServiceFee } from "./FormServiceFee";
import { useStyles } from "react-native-unistyles";
import { FormAddListRoom } from "./FormAddListRoom";
import { stylesheet } from "../style";

export const AddBuildingDetail: React.FC = () => {
  const {styles} = useStyles(stylesheet)
    const forms = useForm<FormsAddBuildingDetail>({
      defaultValues: defaultAddBuildingDetail,
    //   resolver: resolverRegisterLectureBreak,
      mode: 'onChange',
    });
  
    const navigation =
      useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();
  
    const modalDetailRef = useRef<BottomSheetModalAppRef>(null);
  
    const modalWarningRef = useRef<ModalAppDetailRef>(null);

  const currentValues = forms.getValues();

  
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
      forms.setValue('listAddRoom', [...currentValues.listAddRoom, item]);
    };
    console.log('watch', forms.watch('listAddRoom'))
  
    const handlePressConfirm = () => {
      modalWarningRef.current?.hide();
      const loading = pushToastLoading('Saving...');
      // navigation.goBack();
      setTimeout(() => {
        pushToastCustom(
          'Post succesfully',
          ETypeToastCustom.Success,
        );
        toast.dismiss(loading);
        // navigation.navigate(RouteApp.RegisterMakeUpLectures);
      }, 2000);
    };
  
    return (
      <Box flex={1}>
        <HeaderApp title={'Add building detail'} goBack />
        <FormProvider {...forms}>
          <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Box
              mt={scaler(10)}
              rowGap={scaler(10)}
              flex={1}>
                <FormPostingInformation/>
                <FormAddListRoom 
                rooms={currentValues.listAddRoom}
                 onCallBack={handleAddAndSave}/>
                <FormServiceFee/>
        
            </Box>
          </ScrollView>
          <ModalWarning
            ref={modalWarningRef}
            onPressAgree={handlePressConfirm}
            title="Content will not be saved when exiting the screen?"
          />
        </FormProvider>
      </Box>
    );
  };

  