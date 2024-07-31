import {Icons, Images} from '@assets';
import {Box, ImageApp, TouchableApp} from '@component';
import {ColorsStatic, screenWidth} from '@constants';
import {memo, useEffect, useRef, useState} from 'react';
import {Animated, ScrollView} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from '../index.style';
import {BoxHeaderBoard} from './BoxHeaderBoard';

type ImageItem = {
  image: JSX.Element;
};

type HeaderHomeTabProps = {
  scrollY: Animated.Value;
  onPress: (item: any) => void;
};

export const HeaderHomeTab: React.NamedExoticComponent<HeaderHomeTabProps> =
  memo(({onPress, scrollY}) => {
    const {styles} = useStyles(stylesheet);
    const HandleScroll = (e: {nativeEvent?: any}) => {
      if (!e || !e.nativeEvent) {
        return;
      }
      const {nativeEvent} = e;
      if (nativeEvent && nativeEvent.contentOffset) {
        // const currentOffset = nativeEvent.contentOffset.x;
        if (nativeEvent.contentOffset.x > 0) {
          let imageIndex = 0;
          imageIndex =
            Math.floor(nativeEvent.contentOffset.x + screenWidth / 2) /
            screenWidth;
        }
      }
    };
    const [imageList, SetImageList] = useState<ImageItem[]>([]);
    const StepCarousel = useRef<ScrollView>(null);
 

    useEffect(() => {
      //load data tu sever
      const data = [
        {
          image: <ImageApp style={styles.slide} source={Images.bgImg1} />,
        },
        {
          image: <ImageApp style={styles.slide} source={Images.bgImg2} />,
        },
        {
          image: <ImageApp style={styles.slide} source={Images.bgImg3} />,
        },
        {
          image: <ImageApp style={styles.slide} source={Images.bgImg4} />,
        },
      ];
      SetImageList(data);
    }, []);

    useEffect(() => {
      if (imageList.length > 0 && StepCarousel.current) {
        let index = 0;
        const intervalId = setInterval(() => {
          StepCarousel.current?.scrollTo({
            x: index * screenWidth,
            y: 0,
            animated: true,
          });
          index += 1;
          if (index === imageList.length) {
            index = 0;
          }
        }, 3000); // 3 seconds
        return () => clearInterval(intervalId);
      }
    }, [imageList, screenWidth]);

    return (
      <>
        <Box style={styles.container}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={HandleScroll}
            ref={StepCarousel} // set the name of the scrollView
            contentContainerStyle={{
              width: screenWidth * imageList.length,
              height: 200,
            }}>
            {imageList.map((e, index) => (
              <Box key={index.toString()}>{e.image}</Box>
            ))}
          </ScrollView>
          <TouchableApp activeOpacity={0} style={styles.notiIcon}>
            <Icons.Notification size={35} color={ColorsStatic.white} />
          </TouchableApp>
        </Box>
        <BoxHeaderBoard onPress={onPress} />
   
      </>
    );
  });
