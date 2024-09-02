import {Icons} from '@assets';
import {TouchableApp} from '@component/forms';
import {Box} from '@component/layout';
import {TextApp} from '@component/typography';
import {scaler} from '@themes';
import React, {useCallback} from 'react';
import {Keyboard, StyleProp, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type ButtonSelectBottomSheetTypeProps = {
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

export const ButtonSelectBottomSheetType: React.FC<
  ButtonSelectBottomSheetTypeProps
> = ({
  placeholder,
  label,
  onPress,
  style,
  hideIcon = false,
  Icon = <Icons.ChevronDown />,
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
      <Box flex={1}>
        <TextApp
          numberOfLines={1}
          pl={scaler(4)}
          weight={label ? 600 : undefined}
          color={label ? theme.colors.text : theme.colors.gray3}>
          {label || placeholder}
        </TextApp>
      </Box>
      {/* <Row color={'pink'}>
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
      </Row> */}
    </TouchableApp>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: (disabled, empty, label) => ({
    borderRadius: scaler(5),
    borderWidth: scaler(1),
    paddingVertical: scaler(6),
    paddingHorizontal: scaler(8),
    backgroundColor: label ? theme.colors.white : theme.colors.gray6,
    borderColor: theme.colors.gray1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: disabled || empty ? 0.5 : 1,
    height: scaler(35),
  }),
}));
