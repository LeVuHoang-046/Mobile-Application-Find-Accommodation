import {
  BottomSheetModalApp,
  BottomSheetModalAppRef,
} from '@component/BottomSheetModalApp';
import {ButtonSelectBottomSheet} from '@component/button';
import {EmptyData} from '@component/EmptyData';
import {Box, Row} from '@component/layout';
import {LoadingComponent} from '@component/loading';
import {
  ColorsStatic,
  HEIGHT_ITEM_PICKER,
  ItemPickerAll,
  MAX_HEIGHT_MODAL,
  PADDING_BOTTOM_LIST,
  screenWidth,
} from '@constants';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {FontSize, scaler} from '@themes';
import {ForwardRefComponent, ItemPickerType} from '@types';
import {concatLabelListPicker} from '@utils';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import {BottomSheetPickerAppRef} from '../BottomSheetPickerApp/BottomSheetPickerApp.type';
import {BottomSheetPickerMultilineAppProps} from './BottomSheetPickerMultilineApp.type';
import {ButtonMultilinePicker} from './ButtonMultilinePicker';
import {HeaderSheetPicker} from './HeaderSheetPicker';
import {FlatList} from 'react-native-gesture-handler';
import {FlatListApp} from '@component/FlatListApp';
import {TextApp} from '@component/typography';
import {useStyles} from 'react-native-unistyles';
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
    const {theme} = useStyles();
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

    useEffect(() => {
      onChange?.(listPick);
    }, [listPick]);



    console.log({listPick})
    console.log({listSelected})


    useImperativeHandle(
      ref,
      () => ({
        open,
      }),
      [],
    );

    const open = () => {
      // setListPick(listSelected);
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
          if (prevState?.some(_item => _item.value === item.value)) {
            return prevState.filter(_item => _item.value !== item.value);
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
          <ButtonMultilinePicker
            item={item}
            onPress={handlePressItem}
            listSelected={listPick}
          />
        );
      },
      [listPick],
    );

    const handlePressClose = () => {
      setListPick(listSelected);
      modalSheetBottomApp.current?.close();
    };

    const handlePressConfirm = () => {
      onChange?.(listPick);
      modalSheetBottomApp.current?.close();
    };

    const handleChangeModal = (index: number) => {
      if (index === 0) {
        setListPick(listSelected);
      }
    };
    const handleRemoveValue = useCallback(() => {
      onChange?.([]);
    }, [onChange]);

    return (
      <>
        <Box flex={1}>
          <Box p={scaler(5)} mb={scaler(10)}>
            <TextApp
              // numberOfLines={1}
              size={FontSize.Font16}
              weight={700}
              color={theme.colors.text}>
              {title}
            </TextApp>
          </Box>
          <Row rowGap={scaler(20)} flexWrap='wrap' justify='space-between'>
          {list.map((item, index) => (
            <ButtonMultilinePicker
              key={`${String(keySheet)}_${item?.value}item${index}`}
              item={item}
              onPress={handlePressItem}
              listSelected={listPick}
              
              // placeholder={title}
            />
          ))}

          </Row>
        </Box>
        <LineApp/>

        {/* <ButtonSelectBottomSheet
          placeholder={title}
          label={concatLabelListPicker(listSelected)}
          onPress={() => {
            modalSheetBottomApp.current?.open();
          }}
          Icon={Icon}
          hideIcon={hideIcon}
          style={style}
          onRemoveValue={handleRemoveValue}
        />

        <BottomSheetModalApp
          snapPoints={[snapPoints]}
          ref={modalSheetBottomApp}
          keySheet={keySheet}
          onChange={handleChangeModal}
          >
          <Box flex={1}>
            <HeaderSheetPicker
              title={title}
              onPressClose={handlePressClose}
              onPressConfirm={handlePressConfirm}
            />
            <Box flex={1}>
              <BottomSheetFlatList
                key={String(keySheet)}
                data={list}
                keyExtractor={(_, i) => `${String(keySheet)}_${_?.value}_${i}`}
                bounces={false}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <Box height={1} color={ColorsStatic.gray4} opacity={0.5} />
                )}
                style={styles.list}
                ListEmptyComponent={<EmptyData color={ColorsStatic.white} />}
                onEndReached={onEndReached}
                onRefresh={handleRefresh}
                refreshing={isFetching}
                initialNumToRender={10}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  isFetchingNextPage ? <LoadingComponent /> : null
                }
              />
            </Box>
          </Box>
        </BottomSheetModalApp> */}
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
