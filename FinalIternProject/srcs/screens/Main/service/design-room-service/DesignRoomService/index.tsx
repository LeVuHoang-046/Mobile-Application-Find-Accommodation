import { Icons } from '@assets';
import {
  Absolute,
  Box,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
  TextApp
} from '@component';
import { ColorsStatic, RouteMain } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { FontSize, scaler } from '@themes';
import { TAppNavigation } from '@types';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BoxDesignRoomService } from './BoxDesignRoomService';

const DesignRoomServiceScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const [cartCount, setCartCount] = useState(0);

  const navigation = useNavigation<TAppNavigation<RouteMain.DesignRoomService>>();

  const handleNavigate = () => {
    navigation.navigate(RouteMain.ShoppingCartDetail)
  }

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const handleNavigateManaOrder = () => {
    navigation.navigate(RouteMain.ManaServiceOrder)
  }

  return (
    <Box flex={1}>
      <HeaderApp
        title="Room design consultation"
        goBack
        onPressRight={handleNavigateManaOrder}
        onPressRightSecond={handleNavigate}
        IconRight={<Icons.Menu />}
        IconRightSecond={
          <Box>
            <Icons.ShoppingCart />
            {cartCount > 0 && (
              <Absolute top={scaler(-9)} right={scaler(-9)}>
              <Box
                color={ColorsStatic.red2}
                borderRadius={scaler(10)}
                width={scaler(15)}
                height={scaler(15)}
                justify="center"
                align="center">
                <TextApp
                  color={ColorsStatic.white}
                  size={FontSize.Font11}
                  weight={700}>
                  {cartCount}
                </TextApp>
              </Box>
              </Absolute>
            )}
          </Box>
        }
      />
      {navigateFinish ? (
        <>
          <BoxDesignRoomService item={null} cartCount={cartCount} onAddToCart={handleAddToCart} />
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const DesignRoomService = performanceNavigation(DesignRoomServiceScreen);

const styles = StyleSheet.create({});
