import {toast} from '@backpackapp-io/react-native-toast';
import {BoxButtonConfirm, BoxButtonsForm} from '@component';
import {
  defaultAddListRoomValue,
  ETypeToastCustom,
  RouteMain,
  StorageKeys,
} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {storage} from '@storages';
import {FormsAddListRoom, TAppNavigation} from '@types';
import {pushToastCustom, pushToastLoading} from '@utils/toast';
import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';

type FormButtonFooterProps = {
  onCallbackSend?: (item: FormsAddListRoom) => void;
  onCallbackSave: (item: FormsAddListRoom) => void;
};

export const FormButtonFooter = memo(
  ({onCallbackSend, onCallbackSave}: FormButtonFooterProps) => {
    const {
      getValues,
      formState: {errors},
      handleSubmit,
      trigger,
      reset,
    } = useFormContext<FormsAddListRoom>();

    const navigation =
      useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();

    const handleValidationTrigger = async () => {
      const validationResult = await trigger();
      console.log({validationResult})
      if (!validationResult) {
        pushToastCustom(
          'Lưu thất bại, vui lòng nhập lại',
          ETypeToastCustom.Error,
        );

        return;
      }
    };
    const handleOnSuccess = (loading: string) => {
      setTimeout(() => {
        pushToastCustom('Lưu đơn thành công', ETypeToastCustom.Success);
        toast.dismiss(loading);
        reset(defaultAddListRoomValue);
        navigation.goBack();
      }, 2000);
    };

    const onSubmit = async (values: FormsAddListRoom) => {
      await handleValidationTrigger();
      const loading = pushToastLoading('Saving...');
      const value = getValues();
      storage.set(StorageKeys.HandeAddListRoom, JSON.stringify(value));
      onCallbackSave?.(values);
      handleOnSuccess(loading);
    };

    const onError = async (e: any) => {
      // console.log('e ' , e)
      pushToastCustom('Please complete the required information');
      return;
    };

    const handleSave = async () => {
      // const isValid = await trigger();
      // if (!isValid) {
      //   onError();
      //   return;
      // }

      // handleSubmit(onSubmit, onError)();
      // const loading = pushToastLoading('Saving...');
      // const values = getValues();
      // storage.set(
      //   StorageKeys.HandeAddListRoom,
      //   JSON.stringify(values),
      // );

      // navigation.goBack();
      // setTimeout(() => {
      //   pushToastCustom('Updates successfully', ETypeToastCustom.Success);
      //   toast.dismiss(loading);
      //   onCallbackSave();
      // }, 2000);
    };

    return (
      <BoxButtonConfirm isFormValid onPress={handleSubmit(onSubmit, onError)} />
    );
  },
);
