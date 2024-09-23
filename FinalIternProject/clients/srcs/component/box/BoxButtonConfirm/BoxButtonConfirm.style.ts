import { scaler } from '@themes';
import {createStyleSheet} from 'react-native-unistyles';


export const stylesheet = createStyleSheet(theme => ({
  picker: isError => ({
    backgroundColor: theme.colors.white,
    borderColor: isError ? theme.colors.red2 : theme.colors.gray4,
  }),
  buttonSubmit: (bottomInset, isFormValid) => ({
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scaler(12),
    paddingVertical: scaler(12),
    backgroundColor: isFormValid ? theme.colors.tint : theme.colors.gray4,
    borderRadius: scaler(6),
    marginTop: scaler(15),
    marginBottom: bottomInset,
  }),
  button: {
    flex: 1,
  },
}));
