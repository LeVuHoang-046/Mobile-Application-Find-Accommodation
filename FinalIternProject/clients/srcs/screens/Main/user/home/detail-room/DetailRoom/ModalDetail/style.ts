import { ColorsStatic } from '@constants';
import { scaler } from '@themes';
import {createStyleSheet} from 'react-native-unistyles';


export const stylesheet = createStyleSheet({
  picker: isError => ({
    backgroundColor: ColorsStatic.white,
    borderColor: isError ? ColorsStatic.red2 : ColorsStatic.gray4,
  }),
  error: isError => ({
    backgroundColor: ColorsStatic.white,
    borderColor: isError ? ColorsStatic.red2 : ColorsStatic.gray4,
    borderWidth: isError ? scaler(1) : 0,
  }),

  textButton: {
    color: ColorsStatic.blue1,
  },
  buttonPicker: {
    justifyContent: 'center',
  },
  pressable: {
    flex: 0,
  },
});
