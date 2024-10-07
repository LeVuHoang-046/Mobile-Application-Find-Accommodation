import { iconProps } from "@assets";
import { EDetailTab, ETypeHouses } from "@constants";
import { MemoExoticComponent } from "react";
import { ColorValue } from "react-native";
import {DateData} from 'react-native-calendars';

export type MemoComponent<T> = MemoExoticComponent<React.FC<T>>;


export type ForwardRefComponent<T, P> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;
export type ItemPickerType = {
  id?: number;
  icon?: ({ size, color }: iconProps) => React.JSX.Element;
  label: string;
  value?: string;
  isAll?: boolean;
  isTitle?: boolean;
  code?: string;
  type?: ETypeHouses;
};

export type ItemPickerDateType = {
  endDate: DateData | null;
  startDate: DateData | null;
};

export type TabPageType = {
  title: string;
  keyTab: EDetailTab;
};

export type ButtonModalWarningType = {
  title: string;
  onPress?: (item: any) => void;
  color?: ColorValue;
};
