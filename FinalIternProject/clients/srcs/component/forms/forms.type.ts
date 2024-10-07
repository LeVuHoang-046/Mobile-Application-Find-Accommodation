import {BoxProps} from '@component/layout';
import { Control } from 'react-hook-form';
import {StyleProp, TextInputProps, ViewStyle} from 'react-native';

export type ButtonBaseProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  scaleTo?: number;
  onPress?: () => void;
  children?: React.ReactNode;
  stylePressable?: StyleProp<ViewStyle>;
  styleButton?: StyleProp<ViewStyle>;
};

export type IconButtonProps = {
  IconSvg?: React.ReactNode;
  IconElement?: React.ReactElement;
  styleContainer?: StyleProp<ViewStyle>;
} & BoxProps &
  Omit<ButtonBaseProps, 'children'>;

export type TextareaAppProps = {
  max?: number;
  name: string;
  iconLeft?: React.ReactNode;
  control?: Control<any>;
  height?: number;
  title?: string;
  require?: boolean;
} & Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onFocus' | 'onBlur' | 'maxLength'
>;

export type TextFormAppProps = {
  max?: number;
  name: string;
  iconLeft?: React.ReactNode;
  control?: Control<any>;
  height?: number;
  title?: string;
  require?: boolean;
  isNumber?: boolean;
  isOnPress?: boolean;
  onPress?: ()=> void;
} & Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onFocus' | 'onBlur' | 'maxLength'
>;