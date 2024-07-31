import React, {FunctionComponent} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {ButtonBase} from '../ButtonBase';
import {FontSize, scaler} from '@themes';
import {Row} from '@component/layout';
import {TextApp} from '@component/typography';
import {Icons} from '@assets';

export type ButtonChooseCityProps = {
  Icon?: FunctionComponent<any>;
  label: string;
  onPress?: () => void;
  stylePressable?: StyleProp<ViewStyle>;
  styleButton?: StyleProp<ViewStyle>;
  id?: string;
  showIcon?: boolean;
  isDisabled?: boolean;
};

export const ButtonChooseCity: React.FC<ButtonChooseCityProps> = ({
  label,
  onPress,
  stylePressable,
  styleButton,
  isDisabled,
  showIcon = false,
}) => {
  return (
    <ButtonBase
      onPress={onPress}
      isDisabled={isDisabled}
      stylePressable={stylePressable}
      styleButton={[{flex: 0}, styleButton]}>
      <Row height={scaler(34)} columnGap={scaler(16)}>
        <TextApp flex={1} weight={600} size={FontSize.Font13}>
          {label}
        </TextApp>
        {showIcon && <Icons.Check />}
      </Row>
    </ButtonBase>
  );
};
