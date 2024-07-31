import { scaler } from '@themes';
import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(theme => ({
  stylePressable: index => ({
    borderTopWidth: scaler(1),
    borderTopColor: index === 0 ? theme.colors.transparent : theme.colors.gray4,
    flex: 0,
  }),
}));
