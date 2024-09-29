import {SliderPressDetails} from '@component';
import {RouteMain} from '@constants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamList, TAppNavigation} from '@types';
import React, { useEffect } from 'react';

type ImageRoomRouteProp = RouteProp<
  AppStackParamList,
  RouteMain.ImageRoomDetail
>;

export const ImageRoomDetail = () => {
  const route = useRoute<ImageRoomRouteProp>();

  const {images, activeIndex} = route.params;
 
  const navigation = useNavigation<TAppNavigation<RouteMain.DetailRoom>>();

  useEffect(()=> {
    console.log(images)
  },[images,activeIndex])
 

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
