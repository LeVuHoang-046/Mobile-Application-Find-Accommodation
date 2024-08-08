import {Icons} from '@assets';
import {Absolute, Box, ImageApp, Row, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteMain, screenWidth} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {TAppNavigation} from '@types';
import React, {useCallback, useRef, useState} from 'react';
import {FlatList, StyleSheet, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ImageRoomDetail = ({route}: any) => {
  const {images, activeIndex} = route.params;
  const sliderRef = useRef<FlatList<any> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  const navigation = useNavigation<TAppNavigation<RouteMain.DetailRoom>>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem = useCallback(({item}: {item: any}) => {
    return (
      <Box width={screenWidth} height={'100%'}>
        <ImageApp
          source={{uri: item}}
          style={styles.image}
          resizeMode="contain"
        />
      </Box>
    );
  }, []);

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

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / screenWidth);
    setCurrentIndex(index + 1); // Update the current index (add 1 to match the 1-based index)
  };

  return (
    <Box flex={1} color={ColorsStatic.black}>
      <SafeAreaView edges={['top']} />
      <Absolute zIndex={999} top={scaler(20)} left={0} right={0}>
        <Row pl={scaler(15)} pv={scaler(15)}justify='space-between'>
          <TouchableApp onPress={handleGoBack}>
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
        initialScrollIndex={activeIndex}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        initialNumToRender={5}
      />
      {/* <Absolute top={scaler(20)} left={0} right={0} >
        <TextApp color={ColorsStatic.white}>
          {currentIndex} / {images.length}
        </TextApp>
      </Absolute> */}
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
