import {TouchableApp} from '@component/forms';
import {Box} from '@component/layout';
import {TextApp} from '@component/typography';
import {HEIGHT_ITEM_PICKER} from '@constants';
import {scaler} from '@themes';
import {ItemPickerType} from '@types';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';

type ListPickerProps = {
  data: ItemPickerType[];
  indexSelect: number;
  onSelect: (index: number) => void;
  keyList: string;
};

export const ListPicker: React.FC<ListPickerProps> = ({
  data,
  indexSelect,
  onSelect,
  keyList,
}) => {
  const listRef = useRef<FlatList>(null);
  const scrollY = useRef<number>(0);

  useEffect(() => {
    listRef.current?.scrollToIndex({index: indexSelect || 0});
  }, [indexSelect, data]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.current = offsetY;
  };

  const handleScrollEnd = () => {
    const index = Math.round(scrollY.current / HEIGHT_ITEM_PICKER);
    if (index !== indexSelect) {
      onSelect(index);
    }
  };

  const handlePress = (index: number) => {
    onSelect(index);
  };

  const renderItemMonth = useCallback(
    ({item, index}: {item: ItemPickerType; index: number}) => {
      return (
        <ItemPicker
          item={item}
          onPress={handlePress}
          indexSelect={indexSelect}
          index={index}
        />
      );
    },
    [indexSelect],
  );

  return (
    <Box flex={1} ph={scaler(20)}>
      <FlatList
        ref={listRef}
        key={keyList}
        snapToInterval={HEIGHT_ITEM_PICKER}
        getItemLayout={(_, index) => ({
          length: HEIGHT_ITEM_PICKER,
          offset: HEIGHT_ITEM_PICKER * index,
          index,
        })}
        data={data}
        initialScrollIndex={indexSelect}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        keyExtractor={(_, i) => `${keyList || ''}_picker_${i}`}
        bounces={false}
        renderItem={renderItemMonth}
        contentContainerStyle={styles.contentContainer}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        decelerationRate="fast"
      />
    </Box>
  );
};

type ItemPickerProps = {
  item: ItemPickerType;
  onPress?: (index: number) => void;
  indexSelect: number;
  index: number;
};

const ItemPicker: React.FC<ItemPickerProps> = ({
  item,
  onPress,
  index,
  indexSelect,
}) => {
  const selected = indexSelect === index;
  return (
    <TouchableApp onPress={() => onPress?.(index)} style={styles.buttonPicker}>
      <TextApp weight={selected ? 700 : 400}>{item?.label}</TextApp>
    </TouchableApp>
  );
};

const styles = StyleSheet.create({
  list: {
    height: HEIGHT_ITEM_PICKER * 5,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: HEIGHT_ITEM_PICKER * 2,
  },
  buttonPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT_ITEM_PICKER,
  },
});
