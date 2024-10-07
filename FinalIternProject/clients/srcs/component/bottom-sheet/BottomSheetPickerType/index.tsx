import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
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
  BottomSheetPickerTypeProps,
  BottomSheetPickerTypeRef,
} from './BottomSheetPickerType.type';
import {
  ColorsStatic,
  HEIGHT_ITEM_PICKER,
  initItemPicker,
  ItemPickerAll,
  MAX_HEIGHT_MODAL,
  PADDING_BOTTOM_LIST,
} from '@constants';
import {FontSize, scaler} from '@themes';
import {
  BottomSheetModalApp,
  BottomSheetModalAppRef,
} from '@component/BottomSheetModalApp';
import {searchAndSortFilter, sortBetweenTitlePicker} from '@utils';
import {ButtonPicker} from './ButtonPicker';
import {
  ButtonSelectBottomSheet,
  ButtonSelectBottomSheetType,
} from '@component/button';
import {HeaderSheetPicker} from './HeaderSheetPicker';
import {Absolute, Box} from '@component/layout';
import {EmptyData} from '@component/EmptyData';
import {LoadingComponent} from '@component/loading';
import {TouchableApp} from '@component/forms';
import {TextApp} from '@component/typography';

export const BottomSheetPickerType: ForwardRefComponent<
  BottomSheetPickerTypeRef,
  BottomSheetPickerTypeProps
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
      // disabledBtn,
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
        scaler(100) +
        2 * PADDING_BOTTOM_LIST +
        (searchLocal ? scaler(100) : 0);

      return _height > MAX_HEIGHT_MODAL ? MAX_HEIGHT_MODAL : _height;
    }, [list?.length, searchLocal]);

    const [disabled, setDisabled] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [tempSelectedItem, setTempSelectedItem] = useState<ItemPickerType>(itemSelected); 
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

    const handlePress = useCallback((item: ItemPickerType) => {
        setTempSelectedItem(item)
    //   const isSame = item?.value === itemSelected?.value;
    //   if (isSame) {
    //     if (!require) {
    //       onChange?.(isSame ? initItemPicker : item);
    //     }
    //   } else {
    //     onChange?.(item);
    //   }
    //   modalSheetBottomApp.current?.close();
    },[tempSelectedItem]);

    const handlePressApply = () => {
        if (!require || tempSelectedItem?.value !== itemSelected?.value) {
            onChange?.(tempSelectedItem);
          }
    
      modalSheetBottomApp.current?.close();
        
    }

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
            value={tempSelectedItem}
            isHaveTitle={isHaveTitle}
          />
        );
      },
      [tempSelectedItem, isHaveTitle],
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
        <ButtonSelectBottomSheetType
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
                data={list}
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
                  <Box height={1} color={theme.colors.gray1} opacity={0.7} />
                )}
                style={styles.list}
                ListEmptyComponent={<EmptyData color={theme.colors.white} />}
                ListFooterComponent={
                  isFetchingNextPage ? <LoadingComponent /> : null
                }
              />
              <Absolute bottom={30} right={scaler(20)} left={scaler(20)}>
                <Box flex={1}>
                  <TouchableApp onPress={handlePressApply} style={styles.buttonApply}>
                    <TextApp
                      size={FontSize.Font14}
                      weight={700}
                      color={ColorsStatic.white}
                      textAlign="center">
                      Apply
                    </TextApp>
                  </TouchableApp>
                </Box>
              </Absolute>
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
  buttonApply: {
    backgroundColor: ColorsStatic.orange5,
    paddingVertical: scaler(15),
    borderRadius: scaler(20),
  },
});
