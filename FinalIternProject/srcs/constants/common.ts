import { FontSize, scaler } from "@themes";
import { dimensions } from "./app";
import { ColorsStatic } from "./Colors";

export const initItemPicker = {
    label: '',
    value: '',
  };
  
  export const initDatePicker = {
    startDate: null,
    endDate: null,
  };
  
  export const PADDING_BOTTOM_LIST = scaler(60);
  export const HEIGHT_ITEM_PICKER = scaler(36);
  export const MAX_HEIGHT_MODAL = (2 * dimensions.height) / 3;

  export const ThemeCalendar: any = {
    textSectionTitleColor: ColorsStatic.blue4,
    textDayFontFamily: 'Mulish-SemiBold',
    textDayHeaderFontFamily: 'Mulish-Medium',
    textDayFontSize: FontSize.Font13,
    textDayHeaderFontSize: FontSize.Font13,
    textMonthFontFamily: 'Mulish-SemiBold',
    textDayFontWeight: '500',
    textDayHeaderFontWeight: '700',
    textMonthFontWeight: '600',
  };
  
  export const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;