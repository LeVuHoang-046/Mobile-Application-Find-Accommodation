import {
    AccessibilityProps,
    TextProps,
    TextPropsAndroid,
    TextPropsIOS,
    TextStyle,
    ViewStyle,
  } from 'react-native';
  import {LayoutStyleType} from '../layout';
  
  export type FontWeightType =
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | undefined;
  
  export type TypographyStyleType = {
    size?: number | undefined;
    weight?: FontWeightType;
  } & Omit<
    TextStyle,
    keyof Omit<ViewStyle, 'backgroundColor'> | 'fontSize' | 'fontWeight'
  > &
    Omit<LayoutStyleType, 'color'>;
  
  export type TextAppProps = {
    isTextTicker?: boolean;
  } & Omit<
    TextProps,
    | keyof TextPropsIOS
    | keyof TextPropsAndroid
    | keyof AccessibilityProps
    | 'id'
    | 'testID'
    | 'nativeID'
  > &
    TypographyStyleType;
  