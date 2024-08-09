import {SliderPressDetails} from '@component';
import {RouteMain} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@types';
import React from 'react';

export const ImageProductDetails = ({route}: any) => {
  const {images, activeIndex} = route.params;
  const navigation = useNavigation<TAppNavigation<RouteMain.DetailRoom>>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SliderPressDetails
      images={images}
      initialIndex={activeIndex}
      onClose={handleGoBack}
    />
  );
};
