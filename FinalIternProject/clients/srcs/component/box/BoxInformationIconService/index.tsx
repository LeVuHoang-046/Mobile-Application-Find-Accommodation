import {Icons} from '@assets';
import {Box, Row} from '@component/layout';
import {FontWeightType, TextApp} from '@component/typography';
import {ColorsStatic} from '@constants';
import {FontSize, scaler} from '@themes';
import { StyleProp, TextStyle } from 'react-native';

export type BoxInformationIconServiceProps = {
  icon?: React.ReactNode;
  label?: string;
  value?: string;
  styleLabel?: StyleProp<TextStyle>;
  styleValue?: StyleProp<TextStyle>;
  isBold?: boolean,
  weightLabel?: FontWeightType;

};

export const BoxInformationIconService: React.FC<
  BoxInformationIconServiceProps
> = ({icon, label, value, styleLabel,styleValue, isBold, weightLabel}) => {
  return (
    <Box width={scaler(80)} minH={scaler(85)} justify="flex-start" align="center" >
      {icon}
      <TextApp pt={scaler(10)} textAlign='center' style={styleLabel} weight={weightLabel} size={FontSize.Font11}>{label}</TextApp>
      <TextApp pt={scaler(3)} textAlign='center' weight={isBold? 800 : 700} size={FontSize.Font13} style={styleValue}>
        {value}
      </TextApp>
    </Box>
  );
};
