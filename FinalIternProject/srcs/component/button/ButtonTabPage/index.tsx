import { Absolute, TextApp, TouchableApp } from '@component';
import { ColorsStatic } from '@constants';
import { FontSize, scaler } from '@themes';
import React from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useStyles} from 'react-native-unistyles';

type ButtonTabPageProps = {
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress: (index: number) => void;
  title: string;
  index: number;
  style?: StyleProp<ViewStyle>;
  indexFocus: number;
};

export const ButtonTabPage: React.FC<ButtonTabPageProps> = ({
  onLayout,
  title,
  onPress,
  index,
  style,
  indexFocus,
}) => {
  const {theme} = useStyles();
  const isFocus = indexFocus === index;
  return (
    <TouchableApp
      onPress={() => onPress(index)}
      style={[
        {
          borderBottomColor: isFocus
            ? theme.colors.tint
            : ColorsStatic.transparent,
        },
        styles.button,
        style,
      ]}
      onLayout={onLayout}>
      <Absolute
        width={scaler(1)}
        height={scaler(10)}
        left={0}
        color={ColorsStatic.gray4}
      />
      <TextApp
        weight={600}
        size={FontSize.Font12}
        color={isFocus ? theme.colors.tint : ColorsStatic.text}>
        {title}
      </TextApp>
    </TouchableApp>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: scaler(20),
    paddingVertical: scaler(8),
    borderBottomWidth: scaler(2),
    justifyContent: 'center',
  },
});
