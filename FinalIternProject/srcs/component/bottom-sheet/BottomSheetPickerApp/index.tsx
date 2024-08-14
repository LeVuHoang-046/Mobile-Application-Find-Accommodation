import {
  BottomSheetModalApp,
  BottomSheetModalAppRef,
} from '@component/BottomSheetModalApp';
import {ButtonSelectBottomSheet} from '@component/button';
import {EmptyData} from '@component/EmptyData';
import {Box} from '@component/layout';
import {LoadingComponent} from '@component/loading';
import {
  HEIGHT_ITEM_PICKER,
  initItemPicker,
  ItemPickerAll,
  MAX_HEIGHT_MODAL,
  PADDING_BOTTOM_LIST,
} from '@constants';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import {scaler} from '@themes';
import {ForwardRefComponent, ItemPickerType} from '@types';
import {searchAndSortFilter, sortBetweenTitlePicker} from '@utils';
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
      searchLocal = false,
      onSearch,
      isAlwaysSelectedWhenOnlyOne,
      isFetchingNextPage = false,
      hasNextPage = false,
      isFetching = false,
      fetchNextPage,
      refetch,
      require = false,
    },
    ref,
  ) => {
    const {styles, theme} = useStyles(stylesheet);

    const snapPoints = useMemo(() => {
      if (!list?.length) {
        return '50%';
      }
      const _height =
        list?.length * HEIGHT_ITEM_PICKER +
        2 * PADDING_BOTTOM_LIST +
        (searchLocal ? scaler(100) : 0);

      return _height > MAX_HEIGHT_MODAL ? MAX_HEIGHT_MODAL : _height;
    }, [list?.length, searchLocal]);

    const [disabled, setDisabled] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const modalSheetBottomApp = useRef<BottomSheetModalAppRef>(null);
    const listRef = useRef<BottomSheetFlatListMethods>(null);

    const isHaveTitle = useMemo(() => {
      return list.some(_ => !!_?.isTitle) && !search.length;
    }, [list, search]);

    const DATA = useMemo(() => {
      const itemAll: ItemPickerType = {
        label: 'Tất cả',
        value: ItemPickerAll,
      };

      if (!searchLocal) {
        return sortBetweenTitlePicker([itemAll].concat(list));
      }
      return searchAndSortFilter([itemAll].concat(list), search);
    }, [list, search, searchLocal]);

    useEffect(() => {
      handleFocusDataPicker();
    }, [list?.length, isAlwaysSelectedWhenOnlyOne]);

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
        const findIndex = DATA?.findIndex(
          _item => _item.value === itemSelected?.value,
        );

        listRef.current?.scrollToIndex({index: findIndex});
      }
    };

    const handleFocusDataPicker = () => {
      if (
        isAlwaysSelectedWhenOnlyOne ||
        (list?.length === 1 && !!isAlwaysSelectedWhenOnlyOne) ||
        list.length === 0
      ) {
        setDisabled(true);
        return;
      }
      setDisabled(false);
    };

    const handlePress = (item: ItemPickerType) => {
      const isSame = item?.value === itemSelected?.value;
      if (isSame) {
        if (!require) {
          onChange?.(isSame ? initItemPicker : item);
        }
      } else {
        onChange?.(item);
      }
      modalSheetBottomApp.current?.close();
    };

    const handleRemoveValue = useCallback(() => {
      onChange?.(initItemPicker);
    }, [onChange]);

    const handlePressHeader = useCallback(() => {
      modalSheetBottomApp.current?.close();
    }, []);

    const handleSearchHeader = useCallback((text: string) => {
      setSearch(text);
    }, []);

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
            isHaveTitle={isHaveTitle}
          />
        );
      },
      [itemSelected, isHaveTitle],
    );

    const stickyHeaderIndices = useMemo(() => {
      return DATA.reduce((acc: number[], item, index) => {
        if (item.isTitle) {
          acc.push(index);
        }
        return acc;
      }, []);
    }, [DATA]);

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
          disabled={disabled}
          onRemoveValue={handleRemoveValue}
          require={require}
        />
        <BottomSheetModalApp
          snapPoints={[snapPoints]}
          ref={modalSheetBottomApp}
          onChange={handleChangeModal}
          pressBackdropClose
          enablePanDownToClose
          keySheet={keySheet}>
          <Box flex={1}>
            <HeaderSheetPicker
              title={title}
              onPress={handlePressHeader}
              searchLocal={searchLocal && !!list.length}
              onSearch={handleSearchHeader}
            />
            <Box flex={1}>
              <BottomSheetFlatList
                ref={listRef}
                key={String(title)}
                stickyHeaderIndices={stickyHeaderIndices}
                data={DATA}
                keyboardShouldPersistTaps="always"
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
    paddingHorizontal: scaler(20),
    paddingBottom: scaler(50),
    flexGrow: 1,
  },
  list: {
    flex: 1,
    marginTop: scaler(4),
  },
});
