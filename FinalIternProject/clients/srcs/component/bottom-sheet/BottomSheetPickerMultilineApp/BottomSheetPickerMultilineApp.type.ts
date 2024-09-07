import { ButtonSelectBottomSheetProps } from '@component/button';
import { EKeySheet } from '@constants';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { ItemPickerType } from '@types';

export type ButtonPickerProps = {
  item: ItemPickerType;
  onPress?: (item: ItemPickerType) => void;
  listSelected: ItemPickerType[] | undefined;
  placeholder?: string;
  label?: string;
};

export type BottomSheetPickerMultilineAppProps = {
  list?: ItemPickerType[];
  onChange?: (list: ItemPickerType[]) => void;
  title?: string;
  keySheet: EKeySheet;
  listSelected: ItemPickerType[];
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isFetching?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any[], Error>>;
  refetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any[], Error>>;
} & Pick<ButtonSelectBottomSheetProps, 'Icon' | 'hideIcon' | 'style'>;

export type HeaderSheetPickerMultilineProps = {
  onPressClose: () => void;
  onPressConfirm: () => void;
} & Pick<BottomSheetPickerMultilineAppProps, 'title'>;
