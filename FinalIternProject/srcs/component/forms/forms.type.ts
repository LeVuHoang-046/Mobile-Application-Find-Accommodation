import { BoxProps } from "@component/layout";
import { StyleProp, ViewStyle } from "react-native";

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
    IconSvg?: React.FunctionComponent<any>;
    IconElement?: React.ReactElement;
    styleContainer?: StyleProp<ViewStyle>;
  } & BoxProps &
    Omit<ButtonBaseProps, 'children'>;