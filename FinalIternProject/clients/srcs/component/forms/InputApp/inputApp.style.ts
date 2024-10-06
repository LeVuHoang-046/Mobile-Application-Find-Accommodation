import { DEVICE } from '@constants';
import { FontSize, scaler } from '@themes';
import {createStyleSheet} from 'react-native-unistyles';


export const stylesheetInputApp = createStyleSheet(theme => ({
  input: {
    flex: 1,
    height: '100%',
    fontSize: FontSize.Font12,
    fontWeight: '600',
    paddingLeft: scaler(8),
    color: theme.colors.gray2,
    fontFamily: 'Mulish-SemiBold',
    borderColor: theme.colors.gray4,
    borderRadius: scaler(5),
    flexDirection: 'row',
    paddingVertical: 0,
  },
  textarea: {
    color: theme.colors.gray2,
    fontFamily: 'Mulish-SemiBold',
    borderRadius: scaler(5),
    fontSize: FontSize.Font12,
    fontWeight: '600',
    paddingHorizontal: scaler(8),
    flex: DEVICE.isAndroid ? 1 : 0,
    paddingVertical: 0,

  },
  textForm: {
    color: theme.colors.gray2,
    fontFamily: 'Mulish-SemiBold',
    borderRadius: scaler(5),
    fontSize: FontSize.Font12,
    fontWeight: '600',
    paddingHorizontal: scaler(8),
    flex: DEVICE.isAndroid ? 1 : 0,
    paddingVertical: 0,
  },
}));
