import {Box, ButtonTabPage, LoadingComponent, Row} from '@component';
import {ColorsStatic, EDetailTab} from '@constants';
import { scaler } from '@themes';
import {TabPageType} from '@types';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';

type TabPagesProps = {
  list: TabPageType[];
  renderItem: ListRenderItem<TabPageType>;
  loading?: boolean;
};

export const TabPages: React.FC<TabPagesProps> = ({
  list,
  renderItem,
  loading = false,
}) => {
  const [tab, setTab] = useState<EDetailTab>(EDetailTab.First);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    onScrollToTab();
  }, [tab]);

  const onScrollToTab = () => {
    flatListRef.current?.scrollToIndex({
      index: tab,
      animated: true,
    });
  };

  const handlePressTab = (index: number) => {
    setTab(index);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Row>
        {list?.map(item => {
          return (
            <ButtonTabPage
              index={item.keyTab}
              title={item.title}
              onPress={handlePressTab}
              style={styles.tab}
              indexFocus={tab}
              key={`tab_${item.keyTab}`}
            />
          );
        })}
      </Row>
      <Box flex={1}>
        <FlatList
          ref={flatListRef}
          data={list}
          renderItem={renderItem}
          scrollEnabled={false}
          style={{flex: 1}}
          horizontal
          bounces={false}
          keyExtractor={(_, i) => i.toString()}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsStatic.white,
    paddingHorizontal: scaler(0),

  },
});
