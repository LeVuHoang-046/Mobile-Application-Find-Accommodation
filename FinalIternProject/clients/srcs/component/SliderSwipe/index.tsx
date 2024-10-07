import {Box, ImageApp, TouchableApp} from '@component';
import {screenWidth} from '@constants';
import {scaler} from '@themes';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from './SliderSwipe.style';

type SliderSwipeProps = {
  data: string[];
  widthSlider?: number;
  onImagePress?: (index: number) => void;
};

export const SliderSwipe: React.FC<SliderSwipeProps> = ({
  data,
  widthSlider = screenWidth - 35.2,
  onImagePress,
}) => {
  const {styles} = useStyles(stylesheet);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSliderRef = useRef<FlatList<any> | null>(null);
  const subSliderRef = useRef<FlatList<any> | null>(null);

  // Ensure loopedData is created only if data is not empty
  const loopedData = data.length > 0 ? [data[data.length - 1], ...data, data[0]] : [];

  useEffect(() => {
    if (data.length > 0) {
      setActiveIndex(0);
      if (mainSliderRef.current) {
        mainSliderRef.current.scrollToIndex({
          index: 1,
          animated: false,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (loopedData.length > 0) {
      scrollToSubItem(activeIndex);
    }
  }, [activeIndex, loopedData]);

  const handleImagePress = useCallback(
    (index: number) => {
      onImagePress?.(index);
    },
    [onImagePress],
  );

  const handleSubSliderPress = useCallback((index: number) => {
    setActiveIndex(index);
    if (mainSliderRef.current) {
      const adjustedIndex = index + 1;
      if (loopedData.length > 0) {
        mainSliderRef.current.scrollToIndex({
          index: adjustedIndex,
          animated: true,
        });
      }
    }
  }, [loopedData]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / widthSlider);

    if (loopedData.length > 0) {
      if (index === 0) {
        setActiveIndex(data.length - 1);
        mainSliderRef.current?.scrollToIndex({
          index: data.length,
          animated: false,
        });
      } else if (index === loopedData.length - 1) {
        setActiveIndex(0);
        mainSliderRef.current?.scrollToIndex({
          index: 1,
          animated: false,
        });
      } else {
        setActiveIndex(index - 1);
      }
    }
  };

  const scrollToSubItem = (index: number) => {
    if (subSliderRef.current) {
      const validIndex = Math.max(0, Math.min(index, data.length - 1));
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
          <Box width={widthSlider} height={scaler(250)}>
            <ImageApp source={{uri: item}} style={styles.mainImage} />
          </Box>
        </TouchableApp>
      );
    },
    [handleImagePress, widthSlider],
  );

  const renderSubItem = useCallback(
    ({item, index}: {item: string; index: number}) => (
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
    ),
    [activeIndex],
  );

  // Conditional rendering to prevent error when data is empty
  if (loopedData.length === 0) {
    return null; // or return a placeholder component
  }

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
            length: widthSlider,
            offset: widthSlider * index,
            index,
          })}
          extraData={activeIndex}
        />
      </Box>

      <FlatList
        ref={subSliderRef}
        data={data}
        renderItem={renderSubItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={activeIndex}
      />
    </Box>
  );
};
