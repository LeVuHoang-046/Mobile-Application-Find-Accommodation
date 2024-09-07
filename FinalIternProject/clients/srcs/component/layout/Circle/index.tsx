import React from 'react';
import {ColorValue, StyleProp, ViewStyle} from 'react-native';
import {Box} from '../Box';
import { scaler } from '@themes';
import { ColorsStatic } from '@constants';
type CircleProps = {
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>
};
export const Circle: React.FC<CircleProps> = ({
  size = scaler(3),
  color = ColorsStatic.blue2,
  style
}) => {
  return (
    <Box style={style} height={size} width={size} borderRadius={size / 2} color={color} />
  );
};
