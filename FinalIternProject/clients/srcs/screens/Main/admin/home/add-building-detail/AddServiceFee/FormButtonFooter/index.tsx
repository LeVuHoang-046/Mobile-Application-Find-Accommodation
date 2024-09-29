import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {toast} from '@backpackapp-io/react-native-toast';
import {BoxButtonConfirm, BoxButtonsForm} from '@component';
import {ETypeToastCustom, RouteMain, StorageKeys} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {storage} from '@storages';
import {FormsAddListRoom, FormsAddMoreService, TAppNavigation} from '@types';
import {pushToastCustom, pushToastLoading} from '@utils/toast';
import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';

type FormButtonFooterProps = {
  onCallbackSend: () => void;
  onCallbackSave: (item: FormsAddMoreService) => void;
  existingService: FormsAddMoreService | null;
};

export const FormButtonFooter = memo(
  ({
    onCallbackSend,
    onCallbackSave,
    existingService,
  }: FormButtonFooterProps) => {
    const {
      getValues,
      formState: {errors},
      handleSubmit,
      trigger,
    } = useFormContext<FormsAddMoreService>();
    console.log({existingService})

    const navigation =
      useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();

    const handleOnSuccess = (loading: string) => {
      setTimeout(() => {
        {
          existingService
            ? pushToastCustom('Update successfull', ETypeToastCustom.Success)
            : pushToastCustom(
                'Service saved successfully',
                ETypeToastCustom.Success,
              );
        }
        toast.dismiss(loading);
        navigation.goBack(); // Go back after saving
      }, 2000);
    };

    const handleValidationTrigger = async () => {
      const validationResult = await trigger();
      if (!validationResult) {
        pushToastCustom(
          'Save falied, please try again!',
          ETypeToastCustom.Error,
        );
        return false;
      }
      return true;
    };

    const onSubmit = async (values: FormsAddMoreService) => {
      const isValid = await handleValidationTrigger();
      // console.log({isValid})
      if (!isValid) return;

      const loading = pushToastLoading('Saving...');
      const currentValues = getValues();

      // console.log({currentValues});
      // Check if the room already exists
      if (existingService) {
        const updatedServices = {
          ...existingService,
          ...currentValues,
          id: existingService.id,
        };

        onCallbackSave?.(updatedServices); // Call the save callback with the updated room
      } else {
        // If room does not exist, create a new one
        const newService = {
          ...currentValues,
          id: uuidv4(),
        };
        storage.set(StorageKeys.HandeAddListRoom, JSON.stringify(newService));
        onCallbackSave?.(newService);
      }

      handleOnSuccess(loading);
    };

    const onError = async (e: any) => {
      console.log('e ', e);
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
      <BoxButtonConfirm
        title={existingService ? 'Update ' : 'Confirm'}
        isFormValid
        onPress={handleSubmit(onSubmit, onError)}
      />
    );
  },
);
