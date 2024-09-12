import React, {useImperativeHandle, useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {ActivityIndicator} from 'react-native';
import { Center } from '@component/layout';
import { ELoadingApp } from '@constants';


export const GlobalUI = React.forwardRef((_, ref) => {
  const {theme} = useStyles();
  const [load, setLoad] = useState<ELoadingApp>(ELoadingApp.None);

  const showLoading = () => {
    setLoad(ELoadingApp.Default);
  };

  const showPrinting = () => {
    setLoad(ELoadingApp.Printer);
  };

  const hideLoading = () => {
    setLoad(ELoadingApp.None);
  };

  useImperativeHandle(
    ref,
    () => ({
      showLoading,
      showPrinting,
      hideLoading,
    }),
    [],
  );

  if (load === ELoadingApp.None) {
    return null;
  }

  return (
    // <BoxAnimatedFade
    //   top={0}
    //   bottom={0}
    //   left={0}
    //   right={0}
    //   zIndex={99999}
    //   flex={0}
    //   width="100%"
    //   height={'100%'}
    //   position="absolute">
    //   {/*<LoadingLottieApp*/}
    //   {/*  color={`${theme.colors.black}5a`}*/}
    //   {/*  source={*/}
    //   {/*    load === ELoadingApp.Default*/}
    //   {/*      ? Animations.LoadingLecture*/}
    //   {/*      : Animations.WriteLoading*/}
    //   {/*  }*/}
    //   {/*/>*/}
    //   <ActivityIndicator color={theme.colors.tint} />
    // </BoxAnimatedFade>

    <Center
      flex={0}
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={9999999}
      position={'absolute'}>
      {/*<LottieAutoApp*/}
      {/*  source={source || Animations.LoadingLecture}*/}
      {/*  width={widthLottie}*/}
      {/*  height={heightLottie}*/}
      {/*  speed={speed}*/}
      {/*/>*/}
      <ActivityIndicator color={theme.colors.tint} />
    </Center>
  );
});

export default GlobalUI;