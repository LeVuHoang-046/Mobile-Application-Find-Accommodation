import {ButtonSelectBottomSheetProps} from '@component/button';
import {EKeySheet} from '@constants';
import {ItemPickerDateType} from '@types';
import {DateData} from 'react-native-calendars';

export type ButtonPickerProps = {
  item: ItemPickerDateType;
};

export type BottomSheetCalenderPicker = {
  onChange?: (list: ItemPickerDateType) => void;
  title?: string;
  keySheet: EKeySheet;
  valueStart: DateData | null;
  valueEnd: DateData | null;
  placeholder?: string;
  require?: boolean;
  saveWhenPressCloseHeader?: boolean;
} & Pick<ButtonSelectBottomSheetProps, 'hideIcon' | 'style'>;

export type HeaderSheetCalenderPickerProps = {
  onPressClose: () => void;
  onPressConfirm: () => void;
  disabled?: boolean;
} & Pick<BottomSheetCalenderPicker, 'title'>;
