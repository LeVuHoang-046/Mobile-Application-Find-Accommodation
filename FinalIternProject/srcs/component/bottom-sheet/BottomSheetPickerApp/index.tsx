
import {
  HEIGHT_ITEM_PICKER,
  initItemPicker,
  MAX_HEIGHT_MODAL,
  PADDING_BOTTOM_LIST,
} from '@constants';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import {scaler} from '@themes';
import {ForwardRefComponent, ItemPickerType} from '@types';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {
  BottomSheetPickerAppProps,
  BottomSheetPickerAppRef,
} from './BottomSheetPickerApp.type';
import {ButtonPicker} from './ButtonPicker';
import {HeaderSheetPicker} from './HeaderSheetPicker';
import { BottomSheetModalApp, BottomSheetModalAppRef } from '@component/BottomSheetModalApp';
import { ButtonSelectBottomSheet } from '@component/button';
import { Box } from '@component/layout';
import { EmptyData } from '@component/EmptyData';
import { LoadingComponent } from '@component/loading';

export const BottomSheetPickerApp: ForwardRefComponent<
  BottomSheetPickerAppRef,
  BottomSheetPickerAppProps
> = forwardRef(
  (
    {
      onChange,
      list = [],
      title,
      keySheet,
      itemSelected,
      Icon,
      hideIcon,
      style,
      onSearch,
      isAlwaysSelectedWhenOnlyOne,
      isFetchingNextPage = false,
      hasNextPage = false,
      isFetching = false,
      fetchNextPage,
      refetch,
      disabledBtn,
    },
    ref,
  ) => {
    const {styles, theme} = useStyles(stylesheet);

    const snapPoints = useMemo(() => {
      if (!list?.length) {
        return '50%';
      }
      const _height =
        list?.length * HEIGHT_ITEM_PICKER + 2 * PADDING_BOTTOM_LIST;

      return _height > MAX_HEIGHT_MODAL ? MAX_HEIGHT_MODAL : _height;
    }, [list?.length]);

    const [disabled, setDisabled] = useState<boolean>(false);

    const modalSheetBottomApp = useRef<BottomSheetModalAppRef>(null);
    const listRef = useRef<BottomSheetFlatListMethods>(null);

    useEffect(() => {
      handleFocusDataPicker();
    }, [list?.length]);

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

    const handleChangeModal = (index: number) => {
      if (!!itemSelected.value && index === 0 && list.length > 5) {
        const findIndex = list?.findIndex(
          _item => _item.value === itemSelected?.value,
        );
        listRef.current?.scrollToIndex({index: findIndex});
      }
    };

    const handleFocusDataPicker = () => {
      if (
        (list?.length === 1 && !!isAlwaysSelectedWhenOnlyOne) ||
        list.length === 0
      ) {
        setDisabled(true);
        return;
      }
      setDisabled(false);
    };

    const handlePress = (item: ItemPickerType) => {
      onChange?.(item?.value === itemSelected?.value ? initItemPicker : item);
      modalSheetBottomApp.current?.close();
    };

    const onEndReached = useCallback(() => {
      if (hasNextPage && !isFetching) {
        fetchNextPage?.();
      }
    }, [hasNextPage, fetchNextPage, isFetching]);

    const handleRefresh = useCallback(() => {
      refetch?.();
    }, [refetch]);

    const renderItem = useCallback(
      ({item}: {item: ItemPickerType}) => {
        return (
          <ButtonPicker
            item={item}
            onPress={handlePress}
            value={itemSelected}
          />
        );
      },
      [itemSelected],
    );

    return (
      <>
        <ButtonSelectBottomSheet
          placeholder={title}
          label={itemSelected?.label}
          onPress={() => {
            modalSheetBottomApp.current?.open();
          }}
          Icon={Icon}
          hideIcon={hideIcon}
          style={style}
          empty={!list.length}
          disabled={disabledBtn || disabled}
        />
        <BottomSheetModalApp
          snapPoints={[snapPoints]}
          ref={modalSheetBottomApp}
          onChange={handleChangeModal}
          keySheet={keySheet}>
          <Box flex={1}>
            <HeaderSheetPicker
              title={title}
              onPress={() => {
                modalSheetBottomApp.current?.close();
              }}
              onSearch={onSearch}
            />
            <Box flex={1}>
              <BottomSheetFlatList
                ref={listRef}
                key={String(title)}
                data={list}
                keyExtractor={(_, i) => `${String(keySheet)}_${_?.value}_${i}`}
                bounces={false}
                renderItem={renderItem}
                onEndReached={onEndReached}
                onRefresh={handleRefresh}
                refreshing={isFetching}
                contentContainerStyle={styles.contentContainer}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                // showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <Box height={1} color={theme.colors.gray4} opacity={0.5} />
                )}
                style={styles.list}
                ListEmptyComponent={<EmptyData color={theme.colors.white} />}
                ListFooterComponent={
                  isFetchingNextPage ? <LoadingComponent /> : null
                }
              />
            </Box>
          </Box>
        </BottomSheetModalApp>
      </>
    );
  },
);

const stylesheet = createStyleSheet({
  contentContainer: {
    paddingHorizontal: scaler(30),
    paddingBottom: scaler(50),
    flexGrow: 1,
  },
  list: {
    flex: 1,
    marginTop: scaler(4),
  },
});
