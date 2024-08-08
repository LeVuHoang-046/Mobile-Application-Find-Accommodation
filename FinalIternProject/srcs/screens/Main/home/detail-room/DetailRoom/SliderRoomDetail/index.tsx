import {Box, ImageApp, TouchableApp} from '@component';
import {RouteMain, screenWidth} from '@constants';
import {scaler} from '@themes';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from './SliderRoomDetail.style';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@types';

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
const subSliderData = data;

const WIDTH_SLIDER = screenWidth - 35.2;

export const SliderRoomDetail = () => {
  const {styles} = useStyles(stylesheet);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSliderRef = useRef<FlatList<any> | null>(null);
  const subSliderRef = useRef<FlatList<any> | null>(null);

  const navigation = useNavigation<TAppNavigation<RouteMain.DetailRoom>>();

  const loopedData = [data[data.length - 1], ...data, data[0]];

  useEffect(() => {
    // Initially scroll to the correct index
    if (mainSliderRef.current) {
      mainSliderRef.current.scrollToIndex({
        index: 1, // The first actual image in the looped data
        animated: false,
      });
    }
    scrollToSubItem(activeIndex);
  }, []);

  useEffect(() => {
    scrollToSubItem(activeIndex);
  }, [activeIndex]);

  const handleImagePress = useCallback(
    (index: number) => {
      navigation.navigate(RouteMain.ImageRoomDetail, {
        images: data,
        activeIndex: index,
      });
    },
    [navigation],
  );

  const handleSubSliderPress = useCallback((index: number) => {
    setActiveIndex(index);
    if (mainSliderRef.current) {
      const adjustedIndex = index + 1; // Adjust for looped data
      mainSliderRef.current.scrollToIndex({
        index: adjustedIndex,
        animated: true,
      });
    }
  }, []);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / WIDTH_SLIDER);

    // Loop back to the start or end
    if (index === 0) {
      setActiveIndex(data.length - 1); // Loop to last slide
      mainSliderRef.current?.scrollToIndex({
        index: data.length,
        animated: false,
      }); // Adjusted index
    } else if (index === loopedData.length - 1) {
      setActiveIndex(0); // Loop to first slide
      mainSliderRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      }); // Adjusted index
    } else {
      setActiveIndex(index - 1);
    }
  };

  const scrollToSubItem = (index: number) => {
    if (subSliderRef.current) {
      const validIndex = Math.max(0, Math.min(index, subSliderData.length - 1));
      subSliderRef.current.scrollToIndex({
        index: validIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  const renderItem = useCallback(
    ({item, index}: {item: string; index: number}) => {
      return (
        <TouchableApp activeOpacity={1} onPress={() => handleImagePress(index)}>
          <Box width={WIDTH_SLIDER} height={scaler(250)}>
            <ImageApp source={{uri: item}} style={styles.mainImage} />
          </Box>
        </TouchableApp>
      );
    },
    [activeIndex],
  );

  const renderSubItem = useCallback(
    ({item, index}: {item: string; index: number}) => {
      return (
        <TouchableApp
          activeOpacity={1}
          style={[
            styles.subSlide,
            activeIndex === index && styles.activeSubSlide,
          ]}
          onPress={() => handleSubSliderPress(index)}>
          <Box
            width={scaler(76)}
            height={scaler(66)}
            borderRadius={scaler(12)}
            style={styles.boxOverflow}>
            <ImageApp source={{uri: item}} style={styles.subImage} />
          </Box>
        </TouchableApp>
      );
    },
    [activeIndex],
  );

  return (
    <Box pb={scaler(20)} rowGap={scaler(15)}>
      <Box borderRadius={20} style={styles.boxOverflow}>
        <FlatList
          ref={mainSliderRef}
          data={loopedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={handleScrollEnd}
          getItemLayout={(data, index) => ({
            length: WIDTH_SLIDER,
            offset: WIDTH_SLIDER * index,
            index,
          })}
          extraData={activeIndex}
        />
      </Box>

      <FlatList
        ref={subSliderRef}
        data={subSliderData}
        renderItem={renderSubItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={activeIndex}
      />
    </Box>
  );
};
