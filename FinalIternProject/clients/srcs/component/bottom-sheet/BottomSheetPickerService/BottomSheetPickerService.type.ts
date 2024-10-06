import { ButtonSelectBottomSheetProps } from '@component/button';
import { EKeySheet } from '@constants';
import {
    FetchNextPageOptions,
    InfiniteQueryObserverResult,
    QueryObserverResult,
    RefetchOptions,
  } from '@tanstack/react-query';
import { ItemPickerType } from '@types';
  import {StyleProp, ViewStyle} from 'react-native';
 
  
  export type ButtonPickerServiceProps = {
    item: ItemPickerType;
    onPress?: (item: ItemPickerType) => void;
    value: ItemPickerType | undefined;
    style?: StyleProp<ViewStyle>;
    isHaveTitle?: boolean;
  };
  
  export type BottomSheetPickerServiceProps = {
    list?: ItemPickerType[];
    onChange?: (item: ItemPickerType) => void;
    title?: string;
    keySheet: EKeySheet;
    itemSelected: ItemPickerType;
    searchLocal?: boolean;
    require?: boolean;
    isAlwaysSelectedWhenOnlyOne?: boolean;
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
  
  export type HeaderSheetPickerServiceProps = {
    onPress: () => void;
    onSearch?: (text: string) => void;
  } & Pick<BottomSheetPickerServiceProps, 'title' | 'searchLocal'>;
  
  export type BottomSheetPickerServiceRef = {
    open: () => void;
  };
  