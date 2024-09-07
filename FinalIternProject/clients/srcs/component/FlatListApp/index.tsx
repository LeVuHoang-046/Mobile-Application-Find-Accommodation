import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import React, {useCallback} from 'react';
import {FlatList, FlatListProps, StyleSheet} from 'react-native';
import {EmptyData} from '../EmptyData';
import {Box} from '@component/layout';
import {scaler} from '@themes';
import {Animations} from '@assets/animations';
import {LoadingLottieApp} from '@component/loading';

type FlatListAppProps = {
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  isFetching?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<any, any>>;
  refetch?: ({
    ...options
  }?: RefetchOptions) => Promise<QueryObserverResult<any, any>>;
} & FlatListProps<any>;

export const FlatListApp: React.FC<FlatListAppProps> = ({
  isLoading = false,
  isFetchingNextPage = false,
  isFetching = false,
  hasNextPage = false,
  fetchNextPage,
  refetch,
  data,
  renderItem,
  contentContainerStyle,
  keyExtractor,
  style,
  ...props
}) => {
  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage?.();
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

  const handleRefresh = useCallback(() => {
    refetch?.();
  }, [refetch]);

  if (!!isLoading) {
    return <LoadingLottieApp />;
  }

  return (
    <Box flex={1}>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={[styles.flatList, style]}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListEmptyComponent={<EmptyData />}
        ListFooterComponent={
          isFetchingNextPage ? (
            <LoadingLottieApp
              source={Animations.LoadMore}
              heightLottie={scaler(50)}
            />
          ) : null
        }
        onRefresh={handleRefresh}
        refreshing={isFetching}
        keyExtractor={keyExtractor}
        {...props}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: scaler(30),
    paddingHorizontal: scaler(12),
    rowGap: scaler(8),
    flexGrow: 1,
  },
  flatList: {
    flexGrow: 1,
    marginTop: scaler(8),
  },
});
