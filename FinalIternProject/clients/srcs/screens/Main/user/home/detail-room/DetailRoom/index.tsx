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

const DetailRoomScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  
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
          <BoxRoomDetail item={null} />
          <BoxButtonsForm titleBetweenButton="Chat" />
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};
export const DetailRoom = performanceNavigation(DetailRoomScreen);
