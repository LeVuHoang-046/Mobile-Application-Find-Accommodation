import { BoxForwardRef, stylesheetLayout } from '@component';
import React, {forwardRef} from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';


export const Box: BoxForwardRef = forwardRef(
  ({children = null, style, onLayout, ...props}, ref) => {
    const {styles} = useStyles(stylesheetLayout);
    return (
      <View
        style={[styles.layout(props), style]}
        onLayout={onLayout}
        ref={ref}
        children={children}
      />
    );
  },
);

export const BoxAnimated = Animated.createAnimatedComponent(Box);
