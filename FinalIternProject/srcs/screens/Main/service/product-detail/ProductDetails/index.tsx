import {Icons} from '@assets';
import {
  Box,
  BoxButtonsForm,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {BoxProductDetails} from './BoxProductDetail';
import {ColorsStatic} from '@constants';

const ProductDetailsScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  return (
    <Box flex={1}>
      <HeaderApp
        title="Product details"
        IconRight={<Icons.ShoppingCart/>}
        goBack
      />
      {navigateFinish ? (
        <>
          <BoxProductDetails />
          <BoxButtonsForm
            titleLeftButton="Add to cart"
            titleRightButton="Buy now"
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
