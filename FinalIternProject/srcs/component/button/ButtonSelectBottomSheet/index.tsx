import { Icons } from '@assets';
import { TouchableApp } from '@component/forms';
import { TextApp } from '@component/typography';
import { scaler } from '@themes';
import React, {useCallback} from 'react';
import {Keyboard, StyleProp, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';


export type ButtonSelectBottomSheetProps = {
  placeholder?: string;
  label?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  hideIcon?: boolean;
  Icon?: React.FunctionComponent<any>;
  disabled?: boolean;
  empty?: boolean;
};

export const ButtonSelectBottomSheet: React.FC<
  ButtonSelectBottomSheetProps
> = ({
  placeholder,
  label,
  onPress,
  style,
  hideIcon = false,
  Icon = Icons.ArrowDown,
  disabled,
  empty,
}) => {
  const {styles, theme} = useStyles(stylesheet);

  const handlePress = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    onPress?.();
  }, [Keyboard.isVisible(), onPress]);

  return (
    <TouchableApp
      disabled={disabled}
      onPress={handlePress}
      style={[styles.button(disabled, empty), style]}>
      <TextApp
        numberOfLines={1}
        textAlign="center"
        weight={400}
        color={label ? theme.colors.text : theme.colors.gray3}>
        {label || placeholder}
      </TextApp>
      {!hideIcon ? <Icon /> : null}
    </TouchableApp>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: (disabled, empty) => ({
    borderRadius: scaler(5),
    borderWidth: scaler(1),
    paddingVertical: scaler(6),
    paddingHorizontal: scaler(8),
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: disabled && empty ? 0.5 : 1,
  }),
}));
