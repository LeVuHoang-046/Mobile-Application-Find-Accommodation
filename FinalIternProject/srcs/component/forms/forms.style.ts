import {createStyleSheet} from 'react-native-unistyles';
import {ColorValue, KeyboardTypeOptions, NativeSyntheticEvent, StyleProp, TextInputFocusEventData, TextInputProps, ViewStyle} from 'react-native';
import { scaler } from '@themes';
import { EVariantButton, EVariantInput } from './forms.enum';
import { getVariantButtonBase } from './forms.func';
import {Control, FieldErrors} from 'react-hook-form';


export const stylesheetForms = createStyleSheet(theme => ({
  buttonBase: {
    flex: 1,
  },
  buttonApp: (variant: EVariantButton, color: ColorValue) =>
    getVariantButtonBase(variant, color, theme.colors).button,
  textButtonApp: (variant: EVariantButton, color: ColorValue) =>
    getVariantButtonBase(variant, color, theme.colors).text,
  activeButton: (active: boolean) => ({
    opacity: active ? 1 : 0.5,
  }),
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaler(30),
    columnGap: scaler(12),
    borderRadius: scaler(5),
    paddingHorizontal: scaler(12),
    justifyContent: 'center',
    borderWidth: scaler(1),
  },
}));

export type InputAppProps = {
  max?: number;
  name: string;
  control?: Control<any>;
  errors?: FieldErrors<any>;
  keyboardType?: KeyboardTypeOptions | undefined;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  IconLeft?: React.FunctionComponent<any>;
  IconRight?: React.FunctionComponent<any>;
  variant?: EVariantInput;
  onChangeText?: (text: string) => void;
  valueText?: string;
  customStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
} & Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onFocus' | 'onBlur' | 'maxLength'
>;
