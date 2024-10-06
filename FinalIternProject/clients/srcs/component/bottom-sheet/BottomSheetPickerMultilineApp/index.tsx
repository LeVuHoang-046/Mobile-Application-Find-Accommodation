import {
  BottomSheetModalApp,
  BottomSheetModalAppRef,
} from '@component/BottomSheetModalApp';
import { ButtonSelectBottomSheet } from '@component/button';
import { EmptyData } from '@component/EmptyData';
import { Box, Row } from '@component/layout';
import { LoadingComponent } from '@component/loading';
import {
  ColorsStatic,
  HEIGHT_ITEM_PICKER,
  ItemPickerAll,
  MAX_HEIGHT_MODAL,
  PADDING_BOTTOM_LIST,
  screenWidth,
} from '@constants';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { FontSize, scaler } from '@themes';
import { ForwardRefComponent, ItemPickerType } from '@types';
import { concatLabelListPicker } from '@utils';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetPickerAppRef } from '../BottomSheetPickerApp/BottomSheetPickerApp.type';
import { BottomSheetPickerMultilineAppProps } from './BottomSheetPickerMultilineApp.type';
import { ButtonMultilinePicker } from './ButtonMultilinePicker';
import { HeaderSheetPicker } from './HeaderSheetPicker';
import { FlatList } from 'react-native-gesture-handler';
import { FlatListApp } from '@component/FlatListApp';
import { TextApp } from '@component/typography';
import { useStyles } from 'react-native-unistyles';
import { LineApp } from '@component/LineApp';

export const BottomSheetPickerMultilineApp: ForwardRefComponent<
  BottomSheetPickerAppRef,
  BottomSheetPickerMultilineAppProps
> = forwardRef(
  (
    {
      onChange,
      list = [],
      title,
      keySheet,
      listSelected,
      Icon,
      hideIcon,
      style,
      isFetchingNextPage = false,
      hasNextPage = false,
      isFetching = false,
      fetchNextPage,
      refetch,
    },
    ref,
  ) => {
    const { theme } = useStyles();
    const [listPick, setListPick] = useState<ItemPickerType[]>(listSelected);

    const modalSheetBottomApp = useRef<BottomSheetModalAppRef>(null);

    const snapPoints = useMemo(() => {
      if (!list?.length) {
        return '50%';
      }
      const _height =
        list?.length * HEIGHT_ITEM_PICKER + 2 * PADDING_BOTTOM_LIST;

      return _height > MAX_HEIGHT_MODAL ? MAX_HEIGHT_MODAL : _height;
    }, [list?.length]);

    // Reset listPick when listSelected changes
    useEffect(() => {
      // Only update listPick if listSelected is different from the current state
      if (JSON.stringify(listSelected) !== JSON.stringify(listPick)) {
        setListPick(listSelected);
      }
    }, [listSelected]);

    useEffect(() => {
      onChange?.(listPick);
    }, [listPick]);

    useImperativeHandle(
      ref,
      () => ({
        open,
      }),
      [],
    );

    const open = () => {
      modalSheetBottomApp.current?.open();
    };

    const handlePressItem = (item: ItemPickerType) => {
      setListPick(prevState => {
        const isAllSelected = item?.isAll;

        const allItemIndex = prevState?.findIndex(_item => _item.isAll);

        if (isAllSelected) {
          if (prevState?.some(_item => _item.isAll)) {
            
            return [];
          }
          return [item];
        } else {
          if (prevState?.some(_item => _item.label === item.label)) {
            return prevState.filter(_item => _item.label !== item.label);
          } else {
          
            const newState = [...prevState, item];
            if (allItemIndex !== -1) {
              newState.splice(allItemIndex, 1);
            }
            return newState;
          }
        }
      });
    };

    return (
      <>
        <Box flex={1}>
          {title && (
            <Box p={scaler(5)} mb={scaler(10)}>
              <TextApp
                size={FontSize.Font16}
                weight={700}
                color={theme.colors.text}>
                {title}
              </TextApp>
            </Box>
          )}
          <Row rowGap={scaler(20)} columnGap={scaler(23)} flexWrap="wrap" pt={scaler(10)}>
            {list.map((item, index) => (
              <ButtonMultilinePicker
                key={`${String(keySheet)}_${item?.value}item${index}`}
                item={item}
                onPress={handlePressItem}
                listSelected={listPick}
              />
            ))}
          </Row>
        </Box>
        <LineApp />
      </>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scaler(20),
    paddingBottom: scaler(50),
    flexGrow: 1,
  },
  list: {
    flex: 1,
    marginTop: scaler(4),
  },
});
