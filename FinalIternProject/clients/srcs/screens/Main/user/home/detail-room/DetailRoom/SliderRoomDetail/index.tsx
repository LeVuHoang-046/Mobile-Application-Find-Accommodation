import {SliderSwipe} from '@component';
import {RouteMain, screenWidth} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {ImagesRoomType, TAppNavigation} from '@types';
import React, {memo} from 'react';

const WIDTH_SLIDER = screenWidth - 35.2;
type SliderRoomDetailProps = {
  item?: ImagesRoomType[];
};

export const SliderRoomDetail: React.NamedExoticComponent<SliderRoomDetailProps> =
  memo(({item}) => {
    const navigation = useNavigation<TAppNavigation<RouteMain.DetailRoom>>();

    const handleImagePress = (index: number) => {
      if (item) {
        const imageUrls = item.map(image => image.image_url);
        navigation.navigate(RouteMain.ImageRoomDetail, {
          images: imageUrls,
          activeIndex: index,
        });
      }
    };
    const imageUrls = item ? item.map(image => image.image_url) : [];
    return (
      <SliderSwipe
        data={imageUrls}
        widthSlider={WIDTH_SLIDER}
        onImagePress={handleImagePress}
      />
    );
  });
