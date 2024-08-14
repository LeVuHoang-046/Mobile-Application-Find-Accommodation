import {Icons} from '@assets';
import {IconButton, TouchableApp} from '@component/forms';
import {Box, Row} from '@component/layout';
import {TextApp} from '@component/typography';
import {HeightPicker} from '@constants';
import {FontSize, scaler} from '@themes';
import React, {useCallback} from 'react';
import {Keyboard, StyleProp, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type ButtonSelectBottomSheetProps = {
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

export const ButtonSelectBottomSheet: React.FC<
  ButtonSelectBottomSheetProps
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
    <>
      <Box>
        <TextApp
          numberOfLines={1}
          size={FontSize.Font14}
          weight={700}
          color={theme.colors.text}>
          {label || placeholder}
        </TextApp>
      </Box>
      <TouchableApp
        disabled={disabled}
        onPress={handlePress}
        style={[styles.button(disabled, empty, label), style]}>
          <TextApp></TextApp>
        {/* <Row>
          {label && !disabled && !require ? (
            <IconButton
              onPress={onRemoveValue}
              IconElement={
                <Icons.CircleX color={theme.colors.tint} size={12} />
              }
              stylePressable={{flex: 0}}
            />
          ) : null}
          {!hideIcon ? Icon : null}
        </Row> */}
      </TouchableApp>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: (disabled, empty, label) => ({
    borderRadius: scaler(5),
    borderWidth: scaler(1),
    paddingVertical: scaler(6),
    paddingHorizontal: scaler(8),
    backgroundColor: theme.colors.white ,
    width: scaler(80),
    borderColor: theme.colors.gray4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: disabled || empty ? 0.5 : 1,
    height: HeightPicker,
  }),
}));
