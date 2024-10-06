import {Box} from '@component';
import {scaler} from '@themes';
import React, {useCallback, useRef} from 'react';
import {Animated, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {BodyHomeTab} from './BodyHomeTab';
import {HeaderHomeTab} from './HeaderHomeTab';
import {ModalDetail, ModalDetailHeaderBoard} from './HeaderHomeTab/ModalDetail';
import {HeaderSearchAnimation} from './HeaderSearchAnimation';
import {stylesheet} from './index.style';

export const HomeScreen = () => {
  const {styles} = useStyles(stylesheet);
  // ===============MODAL SETUP==================================================

  const scrollY = new Animated.Value(0);
  const AnimatedScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );
  const modalDetailRef = useRef<ModalDetailHeaderBoard>(null);
  const handlePress = useCallback((item: any) => {
    modalDetailRef.current?.show(item);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <HeaderSearchAnimation onPress={handlePress} scrollY={scrollY} />

      <Box flex={1}>
        <ScrollView
        contentContainerStyle={styles.scrollView}
          scrollEventThrottle={16}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onScroll={AnimatedScroll}>
          <HeaderHomeTab onPress={handlePress} scrollY={scrollY} />
          <BodyHomeTab />
        </ScrollView>
        <ModalDetail ref={modalDetailRef} />
      </Box>
    </SafeAreaView>
  );
};
