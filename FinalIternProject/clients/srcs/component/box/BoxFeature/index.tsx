import {Icons} from '@assets';
import {TouchableApp} from '@component/forms';
import {Box, Row} from '@component/layout';
import {FontWeightType, TextApp} from '@component/typography';
import {ColorsStatic} from '@constants';
import {FontSize, scaler} from '@themes';
import {StyleProp, TextStyle} from 'react-native';

export type BoxFeatureProps = {
  icon?: React.ReactNode;
  label?: string;
  value?: string;
  styleLabel?: StyleProp<TextStyle>;
  styleValue?: StyleProp<TextStyle>;
  isBold?: boolean;
  weightLabel?: FontWeightType;
  onPress?: () => void;
};

export const BoxFeature: React.FC<BoxFeatureProps> = ({
  icon,
  label,
  value,
  styleLabel,
  styleValue,
  isBold,
  weightLabel,
  onPress,
}) => {
  return (
    <TouchableApp onPress={onPress}>
      <Box width={scaler(75)} maxH={scaler(90)} align="center">
        <Box
          borderColor={ColorsStatic.gray1}
          borderWidth={1}
          borderRadius={scaler(15)}
          p={scaler(10)}>
          {icon}
        </Box>
        <TextApp
          pt={scaler(10)}
          textAlign="center"
          style={styleLabel}
          weight={weightLabel}
          size={FontSize.Font12}>
          {label}
        </TextApp>
        <TextApp
          pt={scaler(3)}
          textAlign="center"
          weight={isBold ? 800 : 700}
          size={FontSize.Font13}
          style={styleValue}>
          {value}
        </TextApp>
      </Box>
    </TouchableApp>
  );
};
