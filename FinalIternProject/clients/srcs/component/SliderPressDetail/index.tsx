import React, {useCallback, useRef, useState} from 'react';
import {FlatList, StyleSheet, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Box, ImageApp, Row, TextApp, TouchableApp, Absolute} from '@component';
import {ColorsStatic, screenWidth} from '@constants';
import {FontSize, scaler} from '@themes';
import { Icons } from '@assets';

type SliderPressDetailsProps = {
  images: string[];
  initialIndex?: number;
  onClose?: () => void;
};

export const SliderPressDetails = ({images, initialIndex = 0, onClose}: SliderPressDetailsProps) => {
  const sliderRef = useRef<FlatList<any> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex); // 1-based index for display

  
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / screenWidth);
    setCurrentIndex(index + 1); // Update to match 1-based index
  };

  const renderItem = useCallback(
    ({item}: {item: string}) => (
      <Box width={screenWidth} height="100%">
        <ImageApp
          source={{uri: item}}
          style={styles.image}
          resizeMode="contain"
        />
      </Box>
    ),
    []
  );

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollToIndex({index: info.index, animated: true});
      }
    });
  };

  return (
    <Box flex={1} color={ColorsStatic.black}>
      <SafeAreaView edges={['top']} />
      <Absolute zIndex={999} top={scaler(20)} left={0} right={0}>
        <Row pl={scaler(15)} pv={scaler(15)} justify="space-between">
          <TouchableApp onPress={onClose}>
            <Icons.BackLeft size={24} color={ColorsStatic.white} />
          </TouchableApp>
          <Box color={ColorsStatic.white} p={scaler(7)} borderRadius={scaler(15)}>
            <TextApp weight={800} size={FontSize.Font14}>
              {currentIndex} / {images.length}
            </TextApp>
          </Box>
        </Row>
      </Absolute>
      <FlatList
        ref={sliderRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex - 1}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        initialNumToRender={5}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
