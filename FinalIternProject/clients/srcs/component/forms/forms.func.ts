import { ColorValue } from 'react-native';
import { EVariantButton } from './forms.enum';

export const getVariantButtonBase = (
  variant: EVariantButton,
  color: ColorValue,
  colors: any,
): {button: any; text: any} => {
  switch (variant) {
    case EVariantButton.Outline:
      return {
        button: {
          backgroundColor: colors.white,
          borderColor: color,
        },
        text: {
          color: color,
        },
      };
    case EVariantButton.Unstyled:
      return {
        button: {},
        text: {},
      };
    case EVariantButton.Solid:
    default:
      return {
        button: {
          backgroundColor: color,
          borderColor: color,
        },
        text: {
          color: colors.white,
        },
      };
  }
};

// const getColorIconInput = (
//   focus: boolean,
//   colors: any,
// ): ColorValue | undefined => {
//   if (isFocus) {
//     return Colors.primary;
//   }
//   if (value?.length > 0) {
//     return Colors.textColor;
//   }
//   return undefined;
// };
