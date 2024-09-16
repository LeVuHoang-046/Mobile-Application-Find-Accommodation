import {Icons} from '@assets';
import {
  Absolute,
  Box,
  BoxButtonsForm,
  HeaderApp,
  LoadingComponent,
  PageScreen,
  performanceNavigation,
  PerformanceNavigationHOC,
  TextApp,
} from '@component';
import {BoxProductDetails} from './BoxProductDetail';
import {ColorsStatic, RouteMain} from '@constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList, TAppNavigation } from '@types';
import { FontSize, scaler } from '@themes';
import { useState } from 'react';

type ProductDetailsRouteProp = RouteProp<
  AppStackParamList,
  RouteMain.ProductDetails
>;

const ProductDetailsScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const route = useRoute<ProductDetailsRouteProp>();
  const {item, quantity, cartCount} = route.params;
  const navigation = useNavigation<TAppNavigation<RouteMain.ProductDetails>>();
  const [count, setCount] = useState<number>(cartCount);

  const handleNavigateOrderDetail = () => {
    navigation.navigate(RouteMain.OrderConfirmationDetail,{selectedItem: item, quantity})
  }

  if (!item || !quantity) {
    return (
      <PageScreen contentContainerStyle={{flex:1,justifyContent:'center', alignContent:'center'}}>
        <TextApp>No item selected.</TextApp>
      </PageScreen>
    );
  }
  const handleCartCount = () => {
    setCount(prevCount => prevCount + 1);
  };


  return (
    <Box flex={1}>
      <HeaderApp
        title="Product details"
        goBack
        IconRightSecond={
          <Box mr={scaler(7)}>
            <Icons.ShoppingCart />
            {count > 0 && (
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
                  {count}
                </TextApp>
              </Box>
              </Absolute>
            )}
          </Box>
        }
      />
      {navigateFinish ? (
        <>
          <BoxProductDetails item={item} />
          <BoxButtonsForm
            titleLeftButton="Add to cart"
            titleRightButton="Buy now"
            onPressLeftButton={handleCartCount}
            onPressRightButton={handleNavigateOrderDetail}
            iconLeft={<Icons.ShoppingCartPlus color={ColorsStatic.red1} />}
            iconRight
          />
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const ProductDetails = performanceNavigation(ProductDetailsScreen);
