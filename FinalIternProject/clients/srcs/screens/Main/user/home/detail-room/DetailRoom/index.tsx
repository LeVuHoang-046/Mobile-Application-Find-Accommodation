import {Icons} from '@assets';
import {
  Box,
  BoxButtonsForm,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {BoxRoomDetail} from './BoxRoomDetail';
import { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '@types';
import { RouteMain } from '@constants';
import { useQueryBoardingHouseDetail } from '@api';

type DetailRoomRouteProp = RouteProp<
  AppStackParamList,
  RouteMain.DetailRoom
>;


const DetailRoomScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const [isHeartPressed, setIsHeartPressed] = useState(false);

  const route = useRoute<DetailRoomRouteProp>();
  const {id} = route.params;
  
  const {data} = useQueryBoardingHouseDetail(id);

  const handleHeartPress = () => {
    setIsHeartPressed(!isHeartPressed);
  };
  return (
    <Box flex={1}>
      <HeaderApp
        title="Detail room"
        goBack
        IconRight={isHeartPressed ? <Icons.Heart size={24} color='red'/>  : <Icons.HeartOutLine size={24} />}
        onPressRight={handleHeartPress}
      />
      {navigateFinish ? (
        <>
          <BoxRoomDetail item={data} />
          <BoxButtonsForm titleBetweenButton="Chat" />
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};
export const DetailRoom = performanceNavigation(DetailRoomScreen);
