import {Icons} from '@assets';
import {
  Box,
  ButtonBuyService,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import React from 'react';
import {StyleSheet} from 'react-native';
import {BoxDesignRoomService} from './BoxDesignRoomService';

const DesignRoomServiceScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  return (
    <Box flex={1}>
      <HeaderApp
        title="Room design consultation"
        goBack
        IconRight={<Icons.Menu/>}
        IconRightSecond={<Icons.ShoppingCart/>}
      />
      {navigateFinish ? (
        <>
          <BoxDesignRoomService item={null}/>
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const DesignRoomService = performanceNavigation(DesignRoomServiceScreen)

const styles = StyleSheet.create({});
