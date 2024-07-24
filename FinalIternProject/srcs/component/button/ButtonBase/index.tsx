
import { ButtonBaseProps, stylesheetForms } from '@component/forms';
import { BoxAnimated } from '@component/layout';
import { scaler } from '@themes';
import React, {useRef} from 'react';
import {Pressable} from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';



export const ButtonBase: React.FC<ButtonBaseProps> = ({
  isActive = true,
  isDisabled = false,
  isLoading = false,
  scaleTo = 0.98,
  onPress,
  children,
  stylePressable,
  styleButton,
}) => {
  const {styles} = useStyles(stylesheetForms);
  const pressed = useSharedValue(0);

  const throttleRef = useRef<boolean>(true);

  const onPressIn = () => {
    pressed.value = withSpring(1);
  };

  const onPressOut = () => {
    pressed.value = withSpring(0);
  };

  const styleScale = useAnimatedStyle(() => {
    const scale = interpolate(pressed.value, [0, 1], [1, scaleTo]);
    return {
      transform: [{scale}],
    };
  });

  const handelPress = () => {
    if (!isActive || !throttleRef.current || !onPress) {
      return;
    }
    throttleRef.current = false;
    timeoutThrottle(300);
    onPress();
  };

  const timeoutThrottle = (time = 0) => {
    setTimeout(() => {
      throttleRef.current = true;
    }, time);
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={handelPress}
      disabled={isDisabled || isLoading || !isActive}
      style={[{height: scaler(30), flex: 1}, stylePressable]}>
      <BoxAnimated
        style={[styleScale, styles.buttonBase, styleButton]}
        children={children}
      />
    </Pressable>
  );
};
