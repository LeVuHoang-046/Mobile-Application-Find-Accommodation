import {Icons} from '@assets';
import {
  Box,
  ButtonChooseActivity,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';

import {useNavigation} from '@react-navigation/native';
import React from 'react';

const ManaPostScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const navigation = useNavigation();
  return (
    <Box flex={1}>
      <HeaderApp title="Manage Post" goBack />
      {navigateFinish ? (
        <>
          <ButtonChooseActivity
            iconLeft={Icons.HomeSearchOutLine}
            title="Find Accommodation"
          />
          <ButtonChooseActivity
            title="Find Rommate"
            iconLeft={Icons.AccountPlus}
          />
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const ManaPost = performanceNavigation(ManaPostScreen);
