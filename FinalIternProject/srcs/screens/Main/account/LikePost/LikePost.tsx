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
import { useNavigation } from '@react-navigation/native';
import { TAppNavigation } from '@types';
import { RouteMain } from '@constants';

export const LikedPostScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {

  const navigation = useNavigation<TAppNavigation<RouteMain.LikePost>>();
  const handleNavigate = () => {
    navigation.navigate(RouteMain.DetailRoom)
  }

  const renderItem = useCallback(({item}: {item: any}) => {
    return <BoxLikedPost onPress={handleNavigate} item={item} />;
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
