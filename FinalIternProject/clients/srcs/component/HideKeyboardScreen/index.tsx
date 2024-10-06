import React from 'react';
import {Keyboard, Pressable, PressableProps} from 'react-native';

export const HideKeyboardScreen: React.FC<PressableProps> = ({
  style,
  ...props
}) => {
  return <Pressable onPress={Keyboard.dismiss} {...props} />;
};
