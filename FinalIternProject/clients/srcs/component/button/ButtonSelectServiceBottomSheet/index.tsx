import { Icons } from '@assets';
import { IconButton, TouchableApp } from '@component/forms';
import { Box, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { HeightPicker } from '@constants';
import { FontSize, scaler } from '@themes';
import React, {useCallback} from 'react';
import {Keyboard, StyleProp, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {createStyleSheet, useStyles} from 'react-native-unistyles';


export type ButtonSelectServiceBottomSheetProps = {
  placeholder?: string;
  label?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  hideIcon?: boolean;
  Icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  empty?: boolean;
  onRemoveValue?: () => void;
  require?: boolean;
};

export const ButtonSelectServiceBottomSheet: React.FC<
ButtonSelectServiceBottomSheetProps
> = ({
  placeholder,
  label,
  onPress,
  style,
  hideIcon = false,
  Icon = <Icons.ChevronDown/>,
  iconLeft = <Icons.Money/>,
  disabled,
  empty,
  onRemoveValue,
  require = false,
}) => {
  const {styles, theme} = useStyles(stylesheet);

  const handlePress = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    onPress?.();
  }, [onPress]);

  return (
    <TouchableApp
      disabled={disabled}
      onPress={handlePress}
      style={[styles.button(disabled, empty, label), style]}>
      <Row flex={1} columnGap={scaler(10)}>
        {iconLeft}
        <TextApp
          numberOfLines={1}
        //   size={FontSize.Font13}
          weight={600}
          color={label ? theme.colors.text : theme.colors.gray3}>
          {label || placeholder}
        </TextApp>
      </Row>
      <Row>
        {label && !disabled && !require ? (
          <IconButton
            onPress={onRemoveValue}
            IconElement={
              <Icons.CircleX
                color={theme.colors.tint}
                size={12}
              />
            }
            stylePressable={{flex: 0}}
          />
        ) : null}
        {!hideIcon ? Icon : null}
      </Row>
    </TouchableApp>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: (disabled, empty, label) => ({
    borderRadius: scaler(5),
    borderBottomWidth: scaler(1),
    paddingVertical: scaler(6),
    paddingHorizontal: scaler(8),
    backgroundColor: label ? theme.colors.white : theme.colors.white,
    borderColor: theme.colors.gray3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: disabled || empty ? 0.5 : 1,
    height: HeightPicker,
  }),
}));
