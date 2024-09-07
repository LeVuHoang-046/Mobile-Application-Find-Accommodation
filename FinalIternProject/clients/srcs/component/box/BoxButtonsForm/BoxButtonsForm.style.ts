import { ColorsStatic } from '@constants';
import { scaler } from '@themes';
import {createStyleSheet} from 'react-native-unistyles';


export const stylesheet = createStyleSheet({
  picker: isError => ({
    backgroundColor: ColorsStatic.white,
    borderColor: isError ? ColorsStatic.red2 : ColorsStatic.gray4,
  }),
  buttonSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scaler(6),
    paddingVertical: scaler(12),
    backgroundColor: ColorsStatic.tint,
    borderRadius: scaler(6),
    marginTop: scaler(15),
    // flex: 1
  },

  buttonScheduleOrder:{
    paddingHorizontal: scaler(24),
    flex:1
  },
  buttonReportAndChat: {
    paddingHorizontal: scaler(12),
    backgroundColor: ColorsStatic.red7,
    // borderWidth: 1,
    // borderColor: ColorsStatic.tint,
  },
  txtSubmit: {
    color: ColorsStatic.white,
    fontWeight: '700',
  },
  button: {
    flex: 1,
  },
});
