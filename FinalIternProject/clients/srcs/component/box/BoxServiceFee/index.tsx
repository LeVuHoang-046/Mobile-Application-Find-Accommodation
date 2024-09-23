import {Icons} from '@assets';
import {Box, Row} from '@component/layout';
import {TextApp} from '@component/typography';
import {ColorsStatic} from '@constants';
import {scaler} from '@themes';
import {NamedExoticComponent} from 'react';

export type BoxServiceFeeProps = {
  icon?: React.ReactNode;
  title?: string;
  price?: string;
};

export const BoxServiceFee: React.FC<BoxServiceFeeProps> = ({
  icon,
  title,
  price,
}) => {
  return (
    <Box
      rowGap={scaler(6)}
      borderColor={ColorsStatic.orange3}
      borderRadius={scaler(10)}
      borderWidth={1}
      pv={scaler(5)}
      ph={scaler(7)}
      width={scaler(110)}
      justify="center">
      <Box align="flex-end">
        <Icons.Pencil size={14} color={ColorsStatic.blue3} />
      </Box>
      <Box rowGap={scaler(6)} pb={scaler(25)} ph={scaler(7)} align="center">
        {icon}
        <TextApp weight={600}>{title}</TextApp>
        <TextApp color={ColorsStatic.orange3} weight={600}>
          {price}
        </TextApp>
      </Box>
    </Box>
  );
};
