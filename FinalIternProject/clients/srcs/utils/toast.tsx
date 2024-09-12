import {toast, ToastPosition} from '@backpackapp-io/react-native-toast';
import { ToastCustom } from '@component';
import { dimensions, EKeyToast, ETypeToastCustom, StorageKeys } from '@constants';
import { storage } from '@storages';
import { scaler } from '@themes';


export const pushToastCustom = (
  message: string,
  type: ETypeToastCustom = ETypeToastCustom.Error,
  position: ToastPosition = ToastPosition.BOTTOM,
) => {
  if (!!storage.getBoolean(StorageKeys.ShowedToast)) {
    return;
  }

  return toast(message, {
    width: dimensions.width - scaler(24),
    customToast: toast => <ToastCustom toastProps={toast} type={type} />,
    position,
    providerKey: EKeyToast.Custom,
    disableShadow: true,
  });
};

export const pushToastLoading = (
  message: string,
  position: ToastPosition = ToastPosition.BOTTOM,
) => {
  return toast.loading(message, {
    width: dimensions.width - scaler(24),
    customToast: toast => (
      <ToastCustom toastProps={toast} type={ETypeToastCustom.Loading} />
    ),
    position,
    providerKey: EKeyToast.Custom,
  });
};
