import {toast} from '@backpackapp-io/react-native-toast';
import { BoxButtonConfirm, BoxButtonsForm } from '@component';
import { defaultAddBuildingDetail, defaultCreateRoomValue, ETypeToastCustom } from '@constants';
import { scaler } from '@themes';
import { FormsAddBuildingDetail, FormsCreateRoom } from '@types';
import { pushToastCustom, pushToastLoading } from '@utils/toast';
import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';


type FormButtonFooterProps = {
  onCallbackSend?: (item: FormsCreateRoom) => void;
  onCallbackSave?: (item: FormsCreateRoom) => void;
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
    } = useFormContext<FormsCreateRoom>();

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
        reset(defaultCreateRoomValue);
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
      if (onCallbackSave) {
        onCallbackSave(values);
      }
      handleOnSuccess(loading);
    };

    return (
        <BoxButtonConfirm
        title={ 'Create now'}
        isFormValid
        onPress={handleSubmit(handleCallbackAddAndBack, onError)}
      />
    );
  },
);
