import React from 'react';
import {Box} from '@component/layout';
import { scaler } from '@themes';
import { ColorsStatic } from '@constants';

type LineProps = {
  vertical?: boolean;
  space?: number;
  size?: number;
};

export const LineApp: React.FC<LineProps> = ({
  vertical = false,
  space = scaler(8),
  size = 1,
}) => {
  return (
    <Box
      width={vertical ? scaler(size) : '100%'}
      height={vertical ? '100%' : scaler(size)}
      mh={vertical ? space : undefined}
      mv={vertical ? undefined : space}
      color={ColorsStatic.gray8}
    />
  );
};
