import {createStyleSheet} from 'react-native-unistyles';
import {TypographyStyleType} from './typography.type';
import { getStyleTypography } from './typography.func';

export const stylesheetTypography = createStyleSheet(theme => ({
  typography: (props: TypographyStyleType) =>
    getStyleTypography(props, theme.colors.text),
}));
