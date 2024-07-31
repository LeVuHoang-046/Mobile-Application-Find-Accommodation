import {
  Box,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {FlatListApp} from '@component/FlatListApp';
import {useCallback} from 'react';
import {BoxLikedPost} from './BoxLikePost';

export const LikedPostScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const renderItem = useCallback(({item}: {item: any}) => {
    return <BoxLikedPost item={item} />;
  }, []);

  return (
    <Box flex={1}>
      <HeaderApp title="Liked Post" goBack />
      {navigateFinish ? (
        <>
          <FlatListApp
            data={Array(10).fill(0)}
            renderItem={renderItem}
            refreshing={false}
          />
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const LikedPost = performanceNavigation(LikedPostScreen);
