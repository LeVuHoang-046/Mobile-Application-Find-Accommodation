import React from 'react';
import {ColorValue} from 'react-native';
import {Box} from '../Box';
import { scaler } from '@themes';
import { ColorsStatic } from '@constants';
type CircleProps = {
  size?: number;
  color?: ColorValue;
};
export const Circle: React.FC<CircleProps> = ({
  size = scaler(3),
  color = ColorsStatic.blue2,
}) => {
  return (
    <Box height={size} width={size} borderRadius={size / 2} color={color} />
  );
};
