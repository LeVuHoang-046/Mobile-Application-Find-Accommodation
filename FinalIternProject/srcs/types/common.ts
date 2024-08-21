import { EDetailTab } from "@constants";
import { MemoExoticComponent } from "react";
import {DateData} from 'react-native-calendars';

export type MemoComponent<T> = MemoExoticComponent<React.FC<T>>;


export type ForwardRefComponent<T, P> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;
export type ItemPickerType = {
  label: string;
  value: string;
  isAll?: boolean;
  isTitle?: boolean;
  code?: string;
};

export type ItemPickerDateType = {
  endDate: DateData | null;
  startDate: DateData | null;
};

export type TabPageType = {
  title: string;
  keyTab: EDetailTab;
};
