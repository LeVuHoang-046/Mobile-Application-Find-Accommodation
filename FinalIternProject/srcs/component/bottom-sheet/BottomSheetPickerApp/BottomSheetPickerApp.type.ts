import {ButtonSelectBottomSheetProps} from '@component';
import {EKeySheet} from '@constants';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import {ItemPickerType} from '@types';
import {StyleProp, ViewStyle} from 'react-native';

export type ButtonPickerProps = {
  item: ItemPickerType;
  onPress?: (item: ItemPickerType) => void;
  value: ItemPickerType | undefined;
  style?: StyleProp<ViewStyle>;
};

export type BottomSheetPickerAppProps = {
  list?: ItemPickerType[];
  onChange?: (item: ItemPickerType) => void;
  title?: string;
  keySheet: EKeySheet;
  itemSelected: ItemPickerType;
  onSearch?: (text: string) => void; // khi khác undefined thì sheet có input tìm kiếm
  isAlwaysSelectedWhenOnlyOne?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isFetching?: boolean;
  disabledBtn?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any[], Error>>;
  refetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any[], Error>>;
} & Pick<ButtonSelectBottomSheetProps, 'Icon' | 'hideIcon' | 'style'>;

export type HeaderSheetPickerProps = {
  onPress: () => void;
} & Pick<BottomSheetPickerAppProps, 'title' | 'onSearch'>;

export type BottomSheetPickerAppRef = {
  open: () => void;
};
