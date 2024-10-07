import {Icons} from '@assets';
import {TouchableApp} from '@component/forms';
import { Row } from '@component/layout';
import {TextApp} from '@component/typography';
import { ColorsStatic } from '@constants';
import {scaler} from '@themes';
import React, {useCallback} from 'react';
import {Keyboard, StyleProp, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type ButtonSelectCalenderPickerProps = {
  placeholder?: string;
  label?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  hideIcon?: boolean;
  Icon?: React.ReactNode;
  disabled?: boolean;
  empty?: boolean;
  onRemoveValue?: () => void;
  require?: boolean;
};

export const ButtonSelectCalenderPicker: React.FC<
  ButtonSelectCalenderPickerProps
> = ({
  placeholder,
  label,
  onPress,
  style,
  hideIcon = false,
  Icon = <Icons.ChevronDown/>,
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
    <>
      <TouchableApp
        disabled={disabled}
        onPress={handlePress}
        style={[styles.button, style]}>
          <Row >
          {Icon}
        <TextApp
          pl={scaler(12)}
          color={label ? theme.colors.text : theme.colors.gray3}
          weight={label ? 600 : undefined}
          numberOfLines={1}>
          {label || placeholder}
        </TextApp>
            
          </Row>
      </TouchableApp>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: {
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    height: scaler(35),
    marginHorizontal: scaler(25),
    justifyContent: 'center',
    borderRadius: scaler(5),
  },
}));
