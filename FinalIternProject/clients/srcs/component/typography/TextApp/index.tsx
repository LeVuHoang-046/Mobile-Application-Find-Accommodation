import React from 'react';
import {Text} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {useStyles} from 'react-native-unistyles';
import { TextAppProps } from '../typography.type';
import { stylesheetTypography } from '../typography.style';

export const TextApp: React.FC<TextAppProps> = ({
  allowFontScaling,
  children,
  ellipsizeMode,
  lineBreakMode,
  numberOfLines,
  onLayout,
  onTextLayout,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  style,
  maxFontSizeMultiplier,
  minimumFontScale,
  isTextTicker = false,
  ...props
}) => {
  const {styles} = useStyles(stylesheetTypography);
  if (numberOfLines === 1 && isTextTicker) {
    return (
      <TextTicker
        allowFontScaling={allowFontScaling}
        children={children}
        ellipsizeMode={ellipsizeMode}
        lineBreakMode={lineBreakMode}
        numberOfLines={numberOfLines}
        onLayout={onLayout}
        onTextLayout={onTextLayout}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        minimumFontScale={minimumFontScale}
        duration={3000}
        repeatSpacer={50}
        marqueeDelay={1000}
        style={[styles.typography(props), style]}
      />
    );
  }
  return (
    <Text
      allowFontScaling={allowFontScaling}
      children={children}
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}
      onLayout={onLayout}
      onTextLayout={onTextLayout}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      minimumFontScale={minimumFontScale}
      style={[styles.typography(props), style]}
    />
  );
};
