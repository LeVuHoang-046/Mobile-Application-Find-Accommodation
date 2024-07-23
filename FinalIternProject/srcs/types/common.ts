import { EDetailTab } from "@constants";
import {DateData} from 'react-native-calendars';

export type ForwardRefComponent<T, P> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;
export type ItemPickerType = {
  label: string;
  value: string;
  isAll?: boolean;
};

export type ItemPickerDateType = {
  endDate: DateData | null;
  startDate: DateData | null;
};

export type TabPageType = {
  title: string;
  keyTab: EDetailTab;
};
