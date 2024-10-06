import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {memo, useEffect, useState} from 'react';
import {Absolute, Box, Row, TextApp, TouchableApp} from '@component';
import {FontSize, scaler} from '@themes';
import {Icons} from '@assets';
import {stylesheet} from '../index.style';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@types';
import {RouteMain, RouteTabUser} from '@constants';
import {Circle} from '@component/layout/Circle';
// import {Icon} from 'react-native-vector-icons/Icon';

type HeaderSearchAnimationProps = {
  onPress: (item: any) => void;
  scrollY: Animated.Value;
};

export const HeaderSearchAnimation: React.NamedExoticComponent<HeaderSearchAnimationProps> =
  memo(({onPress, scrollY}) => {
    const {styles, theme} = useStyles(stylesheet);
    const [dot, setDot] = useState<boolean>(true);
    const navigation = useNavigation<TAppNavigation<RouteTabUser.HomeTab>>();

    //==============================  START SLIDER ===================================================
    //   const scrollY = new Animated.Value(0);
    const stickyTop = scrollY.interpolate({
      inputRange: [245, 265],
      outputRange: [-265, 0],
      extrapolate: 'clamp',
    });
    const stickyOpacity = scrollY.interpolate({
      outputRange: [0, 1],
      inputRange: [225, 275],
      extrapolate: 'clamp',
    });

    const handleNavigate = () => {
      navigation.navigate(RouteMain.SearchForNews);
    };

    const onPressNotification = () => [
      navigation.navigate(RouteMain.Notification),
    ];

    return (
      <Animated.View
        style={[
          styles.AnimatesearchBarContainer,
          {top: stickyTop, opacity: stickyOpacity},
        ]}>
        <Row pt={scaler(20)} pl={scaler(15)}>
          <TouchableApp style={styles.animationButton} onPress={onPress}>
            <Row
              p={scaler(8)}
              borderRadius={scaler(10)}
              color={theme.colors.blue6}>
              <Icons.Location size={20} color={theme.colors.blue1} />
              <TextApp pl={scaler(8)} size={FontSize.Font14} weight={600}>
                Hà Nội
              </TextApp>
            </Row>
          </TouchableApp>
          <Row flex={1} zIndex={0} left={scaler(-15)}>
            <TouchableApp
              onPress={handleNavigate}
              activeOpacity={1}
              style={[
                styles.headerSearchBar,
                {width: scaler(265), marginRight: scaler(5)},
              ]}>
              <TextApp size={FontSize.Font14} color={theme.colors.gray10}>
                Find Postings
              </TextApp>
            </TouchableApp>
            <TouchableOpacity
              onPress={onPressNotification}
              activeOpacity={1}
              style={styles.buttonBell}>
              <Icons.Bell size={35} />

              <Circle
                size={scaler(6)}
                color={theme.colors.red1}
                style={styles.dot}
              />
            </TouchableOpacity>
          </Row>
        </Row>
      </Animated.View>
    );
  });
