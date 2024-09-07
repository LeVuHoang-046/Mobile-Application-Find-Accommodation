import React from 'react';
import {Box} from '../Box';
import {BoxProps} from '../layout.type';
import {scaler} from '@themes';
import {TextApp} from '@component/typography';
import {ColorsStatic} from '@constants';
type BoxFormProps = {
  title?: string;
  require?: boolean;
  color?: string;
} & BoxProps;

export const BoxFormTitle: React.FC<BoxFormProps> = ({
  children,
  title,
  require,
  color,
  ...props
}) => {
  return (
    <Box rowGap={scaler(4)} {...props}>
      {title ? (
        <TextApp weight={600} color={color}>
          {title}
          <>
            {require ? <TextApp color={ColorsStatic.red2}> *</TextApp> : null}
          </>
        </TextApp>
      ) : null}
      {children}
    </Box>
  );
};
