import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {ButtonArrow, ButtonArrowProps} from '../../button/ButtonArrow';
import { Box, TextApp } from '@component';
import { FontSize, scaler } from '@themes';
import { stylesheet } from './BoxButtonArrow.style';


export type BoxButtonsArrowProps = {
  title?: string;
  buttons: ButtonArrowProps[];
  style?: StyleProp<ViewStyle>;
  isBold?: boolean
};

export const BoxButtonsArrow: React.FC<BoxButtonsArrowProps> = ({
  title,
  buttons,
  style,
  isBold = false,
}) => {
  const {
    styles,
    theme: {colors},
  } = useStyles(stylesheet);
  return (
    <Box
      color={colors.white}
      width="100%"
      ph={scaler(20)}
      pv={scaler(20)}
      mt={scaler(20)}
      style={style}>
      <>
        {!!title ? (
          <TextApp weight={700} color={colors.gray3} size={FontSize.Font13}>
            {title}
          </TextApp>
        ) : null}

        {buttons.map((button, index) => {
          return (
            <ButtonArrow
              stylePressable={styles.stylePressable(index)}
              Icon={button.Icon}
              label={button.label}
              hideChevronRight={button.hideChevronRight}
              onPress={button.onPress}
              key={`BoxButtonsArrow_${index}`}
              isBold = {isBold}
            />
          );
        })}
      </>
    </Box>
  );
};
