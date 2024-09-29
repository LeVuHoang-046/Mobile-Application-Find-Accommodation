import 'react-native-get-random-values';
import {toast} from '@backpackapp-io/react-native-toast';
import {BoxButtonConfirm} from '@component';
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
import {v4 as uuidv4} from 'uuid';

type FormButtonFooterProps = {
  onCallbackSend?: (item: FormsAddListRoom) => void;
  onCallbackSave: (item: FormsAddListRoom) => void;
  existingRoom: FormsAddListRoom | null; // Add this prop to check for existing room
};

export const FormButtonFooter = memo(
  ({onCallbackSend, onCallbackSave, existingRoom}: FormButtonFooterProps) => {
    const {
      getValues,
      formState: {errors},
      handleSubmit,
      trigger,
    } = useFormContext<FormsAddListRoom>();
    // console.log({existingRoom})

    const navigation =
      useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();

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

    const handleOnSuccess = (loading: string) => {
      setTimeout(() => {
        {
          existingRoom
            ? pushToastCustom('Update successfull', ETypeToastCustom.Success)
            : pushToastCustom(
                'Room saved successfully',
                ETypeToastCustom.Success,
              );
        }
        toast.dismiss(loading);
        navigation.goBack(); // Go back after saving
      }, 2000);
    };

    const onSubmit = async (values: FormsAddListRoom) => {
      const isValid = await handleValidationTrigger();
      // console.log({isValid})
      if (!isValid) return;

      const loading = pushToastLoading('Saving...');
      const currentValues = getValues();

      // console.log({currentValues});
      // Check if the room already exists
      if (existingRoom) {
        const updatedRoom = {
          ...existingRoom,
          ...currentValues,
          id: existingRoom.id,
        };

        onCallbackSave?.(updatedRoom); // Call the save callback with the updated room
      } else {
        // If room does not exist, create a new one
        const newRoom = {
          ...currentValues,
          id: uuidv4(),
        };
        storage.set(StorageKeys.HandeAddListRoom, JSON.stringify(newRoom));
        onCallbackSave?.(newRoom);
      }

      handleOnSuccess(loading);
    };

    const onError = async (e: any) => {
      console.log({e});
      pushToastCustom('Please complete the required information');
    };

    return (
      <BoxButtonConfirm
        title={existingRoom ? 'Update ' : 'Confirm'}
        isFormValid
        onPress={handleSubmit(onSubmit, onError)}
      />
    );
  },
);
