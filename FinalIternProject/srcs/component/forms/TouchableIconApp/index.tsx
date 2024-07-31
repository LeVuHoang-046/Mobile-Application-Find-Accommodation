import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {TouchableApp} from '../TouchableApp';
import { FontWeightType, TextApp } from '@component/typography';
import { scaler } from '@themes';

export type TouchableIconAppProps = {
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  title?: string;
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
  onPress?: () => void;
  weightText?: FontWeightType;
  disabled?: boolean;
};

export const TouchableIconApp: React.FC<TouchableIconAppProps> = ({
  style,
  title,
  IconLeft,
  IconRight,
  onPress,
  styleText,
  weightText = 400,
  disabled,
}) => {
  const {styles} = useStyles(stylesheet);
  return (
    <TouchableApp
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      <>
        {!!IconLeft ? IconLeft : null}
        <TextApp weight={weightText} textAlign="center" style={styleText}>
          {title}
        </TextApp>
        {!!IconRight ? IconRight : null}
      </>
    </TouchableApp>
  );
};

const stylesheet = createStyleSheet(({colors}) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scaler(8),
    paddingVertical: scaler(8),
  },
}));
