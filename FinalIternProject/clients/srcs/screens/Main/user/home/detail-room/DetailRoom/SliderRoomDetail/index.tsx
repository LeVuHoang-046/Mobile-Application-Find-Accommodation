import {SliderSwipe} from '@component';
import {RouteMain, screenWidth} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@types';
import React, {useCallback} from 'react';

const data = [
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/4d7fc65d-a6e6-4730-a41c-149bb56b6288.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/ffd9605a-7de8-4cb2-946d-054c10574ae2.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/b2fdaa1a-9739-45b5-b8db-6c3a2b0bc898.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/b94044a6-257c-4875-8e37-b07ed6fe29d3.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/58840129-87c8-454d-a2f6-04298f76918d.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/dde079f3-ce85-4de8-90e8-b69299e72c75.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/be08a442-409e-4448-bb62-329f40e0d05e.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/efcd67c0-2680-4f08-a4ed-574becf05860.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/e8eb1ec2-2203-45be-9e76-57b247f38106.jpg',
  'https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/2598b01f-cbe4-48f2-a002-ee1e4297e6f4.jpg',
];

const WIDTH_SLIDER = screenWidth - 35.2;

export const SliderRoomDetail = () => {
  const navigation = useNavigation<TAppNavigation<RouteMain.DetailRoom>>();

  const handleImagePress = useCallback(
    (index: number) => {
      navigation.navigate(RouteMain.ImageRoomDetail, {
        images: data,
        activeIndex: index,
      });
    },
    [navigation],
  );

  return (
    <SliderSwipe
      data={data}
      widthSlider={WIDTH_SLIDER}
      onImagePress={handleImagePress}
    />
  );
};
