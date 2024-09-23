import {toast} from '@backpackapp-io/react-native-toast';
import { BoxButtonConfirm, BoxButtonsForm } from '@component';
import { ETypeToastCustom, RouteMain, StorageKeys } from '@constants';
import {useNavigation} from '@react-navigation/native';
import { storage } from '@storages';
import { FormsAddListRoom, TAppNavigation } from '@types';
import { pushToastCustom, pushToastLoading } from '@utils/toast';
import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';


type FormButtonFooterProps = {
  onCallbackSend: () => void;
  onCallbackSave: () => void;
};

export const FormButtonFooter = memo(
  ({onCallbackSend, onCallbackSave}: FormButtonFooterProps) => {
    const {
      getValues,
      formState: {errors},
      handleSubmit,
      trigger,
    } = useFormContext<FormsAddListRoom>();

    const navigation =
      useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();

    const onSubmit = async (values: FormsAddListRoom) => {
      onCallbackSend();
      const loading = pushToastLoading('Saving...');
      const value = getValues();
      storage.set(
        StorageKeys.HandeAddListRoom,
        JSON.stringify(value),
      );


      navigation.goBack();
      setTimeout(() => {
        pushToastCustom('Updates successfully', ETypeToastCustom.Success);
        toast.dismiss(loading);
        onCallbackSave();
      }, 2000);
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

      handleSubmit(onSubmit, onError)();
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

    return <BoxButtonConfirm isFormValid onPress={handleSubmit(onSubmit, onError)} />
  },
);
