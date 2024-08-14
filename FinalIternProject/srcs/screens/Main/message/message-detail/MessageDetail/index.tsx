import {
  Box,
  HeaderApp,
  HeaderUserChat,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {RouteMain} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@types';
import {BoxInputChat} from './BoxInputChat';

const MessageDetailScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const navigation = useNavigation<TAppNavigation<RouteMain.MessageDetail>>();

  const handleNavigate = () => {
    navigation.navigate(RouteMain.LandlordInformationDetail);
  };

  return (
    <Box flex={1}>
      <HeaderUserChat title="GOHOMY" goBack onPressUser={handleNavigate} />
      {navigateFinish ? (
        <Box>
          <BoxInputChat item={null} />
        </Box>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const MessageDetail = performanceNavigation(MessageDetailScreen);
