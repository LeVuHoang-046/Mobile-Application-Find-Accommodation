import {SliderPressDetails} from '@component';
import {RouteMain} from '@constants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamList, TAppNavigation} from '@types';
import React, { useEffect } from 'react';

type ManaImageRoomRouteProp = RouteProp<
  AppStackParamList,
  RouteMain.ManaImageRoomDetail
>;

export const ManaImageRoomDetail = () => {
  const route = useRoute<ManaImageRoomRouteProp>();

  const {images, activeIndex} = route.params;
 
  const navigation = useNavigation<TAppNavigation<RouteMain.ManaDetailRoom>>();

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
