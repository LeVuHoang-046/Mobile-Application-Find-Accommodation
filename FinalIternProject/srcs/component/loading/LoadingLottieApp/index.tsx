import { Animations } from '@assets/animations';
import { BoxProps, Center } from '@component/layout';
import { LottieAutoApp, LottieViewAutoAppProps } from '@component/media';
import React from 'react';
import {DimensionValue} from 'react-native';



type LoadingLottieAppProps = {
  widthLottie?: DimensionValue;
  heightLottie?: DimensionValue;
} & Omit<BoxProps, 'children'> &
  Partial<Pick<LottieViewAutoAppProps, 'source' | 'speed'>>;

export const LoadingLottieApp: React.FC<Partial<LoadingLottieAppProps>> = ({
  source,
  widthLottie = '100%',
  heightLottie = '100%',
  speed,
  ...props
}) => {
  return (
    <Center flex={1} {...props}>
      <LottieAutoApp
        source={source || Animations.LoadMore}
        width={widthLottie}
        height={heightLottie}
        speed={speed}
      />
    </Center>
  );
};
