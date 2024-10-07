import {toast} from '@backpackapp-io/react-native-toast';
import { BoxButtonConfirm, BoxButtonsForm } from '@component';
import { defaultAddBuildingDetail, ETypeToastCustom } from '@constants';
import { scaler } from '@themes';
import { FormsAddBuildingDetail } from '@types';
import { pushToastCustom, pushToastLoading } from '@utils/toast';
import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';


type FormButtonFooterProps = {
  onCallbackSend?: (item: FormsAddBuildingDetail) => void;
  onCallbackSave?: (item: FormsAddBuildingDetail) => void;
};

export const FormButtonFooter = memo(
  ({onCallbackSend, onCallbackSave}: FormButtonFooterProps) => {
    const {
      getValues,
      formState: {isDirty, errors},
      handleSubmit,
      trigger,
      reset,
      setValue,
    } = useFormContext<FormsAddBuildingDetail>();

    const onError = async (e: any) => {
      console.log({e})
        await trigger();
        const errorMessages = Object.values(errors).map(error => error.message).join('\n');
        if (errorMessages) {
          pushToastCustom(` ${errorMessages}\n`);
        }
      };

    const handleValidationTrigger = async () => {
      const validationResult = await trigger();
      if (!validationResult) {
        pushToastCustom(
          'Post error, please try again',
          ETypeToastCustom.Error,
        );

        return;
      }
    };

    const handleOnSuccess = (loading: string) => {
      setTimeout(() => {
        pushToastCustom('Post successfully', ETypeToastCustom.Success);
        toast.dismiss(loading);
        reset(defaultAddBuildingDetail);
      }, 2000);
    };

    const handleCallbackAddAndSave = async () => {
      await handleValidationTrigger();
      const loading = pushToastLoading('Saving...');
      const values = getValues();
      onCallbackSave?.(values);
      handleOnSuccess(loading);
    };
   
    const handleCallbackAddAndBack = async () => {
      await handleValidationTrigger();
      const loading = pushToastLoading('Saving...');
      const values = getValues(); 
      // console.log('hihih:', values)
      if (onCallbackSend) {
        onCallbackSend(values);
      }
      handleOnSuccess(loading);

      //   storage.set(StorageKeys.CreateApplication, JSON.stringify(values));
    };

    return (
        <BoxButtonConfirm
        title={ 'Post now'}
        isFormValid
        onPress={handleSubmit(handleCallbackAddAndBack, onError)}
      />
    );
  },
);
