import {
  Box,
  BoxDetail,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {BoxInformation} from '@component/box/BoxInformation';
import {screenWidth} from '@constants';
import {scaler} from '@themes';
import {StyleSheet} from 'react-native';

export const LikedPostScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  return (
    <Box flex={1}>
      <HeaderApp title="Liked Post" goBack />
      {navigateFinish ? (
        <>
          <BoxDetail p={scaler(10)} m={scaler(10)}>
            <BoxInformation />
          </BoxDetail>
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const LikedPost = performanceNavigation(LikedPostScreen);

const styles = StyleSheet.create({
  headercontainer: {
    width: screenWidth,
    backgroundColor: 'red',
    height: 60,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
