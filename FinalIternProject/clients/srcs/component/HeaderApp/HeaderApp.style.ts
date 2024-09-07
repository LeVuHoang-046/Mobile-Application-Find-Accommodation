import { scaler } from '@themes';
import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonIcon: (isLeft: boolean) => ({
    alignItems: isLeft ? 'flex-start' : 'flex-end',
    width: scaler(48),
    height: '100%',
  }),
}));
