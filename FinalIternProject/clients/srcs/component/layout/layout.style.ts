import {createStyleSheet} from 'react-native-unistyles';
import {LayoutStyleType} from './layout.type';
import { getStyleLayout } from './layout.func';

export const stylesheetLayout = createStyleSheet({
  layout: (props: LayoutStyleType) => getStyleLayout(props),
});
