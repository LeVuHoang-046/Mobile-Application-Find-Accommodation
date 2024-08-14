import {Icons} from '@assets';
import {
  Box,
  ButtonChooseActivity,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import { RouteMain } from '@constants';

import {useNavigation} from '@react-navigation/native';
import { TAppNavigation } from '@types';
import React from 'react';

const ManaPostScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const navigation = useNavigation<TAppNavigation<RouteMain.ManagePost>>();
  const handleNavigateAccommodation = () => {
    navigation.navigate(RouteMain.RoomSearchPost)
  }
  const handleNavigateRoommate = () => {
    navigation.navigate(RouteMain.RoommateSearchPost)
  }
  return (
    <Box flex={1}>
      <HeaderApp title="Manage Post" goBack />
      {navigateFinish ? (
        <>
          <ButtonChooseActivity
            iconLeft={Icons.HomeSearchOutLine}
            title="Find Accommodation"
            onPress={handleNavigateAccommodation}
          />
          <ButtonChooseActivity
            title="Find Rommate"
            iconLeft={Icons.AccountPlus}
            onPress={handleNavigateRoommate}
          />
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const ManaPost = performanceNavigation(ManaPostScreen);
