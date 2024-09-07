import {UnistylesRegistry} from 'react-native-unistyles';
import {colors} from './colors';
import { breakpoints } from './breakpoints';

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof colors.light;
  dark: typeof colors.dark;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: colors.light,
    dark: colors.dark,
    // register other themes with unique names
  })
  .addConfig({
    // you can pass here optional config described below
    // adaptiveThemes: false,
    initialTheme: 'light',
  });
