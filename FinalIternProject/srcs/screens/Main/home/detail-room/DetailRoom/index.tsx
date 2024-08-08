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

const DetailRoomScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  return (
    <Box flex={1}>
      <HeaderApp title="Detail room" goBack IconRight={Icons.HeartOutLine} />
      {navigateFinish ? (
        <>
          <BoxRoomDetail item={null} />

          <BoxButtonsForm />
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};
export const DetailRoom = performanceNavigation(DetailRoomScreen);
