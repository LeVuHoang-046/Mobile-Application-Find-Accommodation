import React from 'react';
import {Box} from '../Box';
import {BoxProps} from '../layout.type';
import {FontSize, scaler} from '@themes';
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
        <TextApp weight={800} color={color}>
          {title}
          <>
            {require ? <TextApp weight={700} size={FontSize.Font14} color={ColorsStatic.red2}> *</TextApp> : null}
          </>
        </TextApp>
      ) : null}
      {children}
    </Box>
  );
};
