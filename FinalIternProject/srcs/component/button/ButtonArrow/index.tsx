import { Icons } from '@assets';
import { FontSize, scaler } from '@themes';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import { ButtonBase } from '../ButtonBase';
import { Row } from '@component/layout';
import { TextApp } from '@component/typography';


export type ButtonArrowProps = {
  Icon: React.FunctionComponent<any>;
  label: string;
  hideChevronRight?: boolean;
  onPress?: () => void;
  stylePressable?: StyleProp<ViewStyle>;
  styleButton?: StyleProp<ViewStyle>;
};

export const ButtonArrow: React.FC<ButtonArrowProps> = ({
  Icon,
  label,
  hideChevronRight = false,
  onPress,
  stylePressable,
  styleButton,
}) => {
  return (
    <ButtonBase
      onPress={onPress}
      stylePressable={stylePressable}
      styleButton={[{flex: 0}, styleButton]}>
      <Row height={scaler(34)} columnGap={scaler(16)}>
        <Icon />
        <TextApp flex={1} weight={400} size={FontSize.Font13}>
          {label}
        </TextApp>
        {!hideChevronRight ? <Icons.ArrowRight /> : null}
      </Row>
    </ButtonBase>
  );
};
