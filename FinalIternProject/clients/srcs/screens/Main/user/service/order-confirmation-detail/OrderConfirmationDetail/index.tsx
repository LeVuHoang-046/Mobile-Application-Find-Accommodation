import {Box, HeaderApp} from '@component';
import {BoxOrderConfirmationDetail} from './BoxOrderConfirmationDetail';

export const OrderConfirmationDetail = () => {
  return (
    <Box flex={1}>
      <HeaderApp title="Order confirmation" goBack />
      <BoxOrderConfirmationDetail />
    </Box>
  );
};
