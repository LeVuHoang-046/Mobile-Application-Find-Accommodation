import {scaler} from '@themes/scaler';
import {dimensions} from './app';
import {ColorsStatic} from './Colors';
import {FontSize} from '@themes/size';

export const initItemPicker = {
  label: '',
  value: '',
};

export const initDatePicker = {
  startDate: null,
  endDate: null,
};
export const SnapPointsFilter = [dimensions.height - scaler(60)];
export const ItemPickerAll = 'item_picker_all';

export const HeightPicker = scaler(32);

export const MONTHS = [
  {label: 'Tháng 1', value: '01'},
  {label: 'Tháng 2', value: '02'},
  {label: 'Tháng 3', value: '03'},
  {label: 'Tháng 4', value: '04'},
  {label: 'Tháng 5', value: '05'},
  {label: 'Tháng 6', value: '06'},
  {label: 'Tháng 7', value: '07'},
  {label: 'Tháng 8', value: '08'},
  {label: 'Tháng 9', value: '09'},
  {label: 'Tháng 10', value: '10'},
  {label: 'Tháng 11', value: '11'},
  {label: 'Tháng 12', value: '12'},
];

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

export enum ELoadingApp {
  Default,
  Printer,
  None,
}
