import { Box, BoxProps } from '@component/layout';
import { ColorsStatic } from '@constants';
import { scaler } from '@themes';
import React from 'react';

export const BoxDetail: React.FC<BoxProps> = props => {
  return (
    <Box
      borderWidth={scaler(1)}
      borderColor={ColorsStatic.gray4}
      borderRadius={scaler(5)}
      color={ColorsStatic.white}
      {...props}
    />
  );
};
