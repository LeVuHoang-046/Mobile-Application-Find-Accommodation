import {Toasts} from '@backpackapp-io/react-native-toast';
import { EKeyToast } from '@constants';
import React from 'react';


export const ToastsGlobal = () => {
  return (
    <>
      <Toasts providerKey={EKeyToast.Custom} />
      <Toasts />
    </>
  );
};
