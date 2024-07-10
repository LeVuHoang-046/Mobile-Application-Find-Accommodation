import {createStyleSheet} from 'react-native-unistyles';
import {ColorValue} from 'react-native';
import { scaler } from '@themes';
import { EVariantButton } from './forms.enum';
import { getVariantButtonBase } from './forms.func';


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
