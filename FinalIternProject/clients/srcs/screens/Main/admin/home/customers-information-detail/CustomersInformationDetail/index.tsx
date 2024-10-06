import {Icons} from '@assets';
import {
  Absolute,
  AvatarUser,
  Box,
  HeaderApp,
  LoadingComponent,
  PageScreen,
  performanceNavigation,
  PerformanceNavigationHOC,
  Row,
  TextApp,
} from '@component';
import {FontSize, scaler} from '@themes';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const CustomersInformationDetailScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const {styles, theme} = useStyles(stylesheet);
  return (
    <Box flex={1}>
      <HeaderApp title="Landlord information" goBack />
      {navigateFinish ? (
        <PageScreen contentContainerStyle={styles.pageScreen}>
          <Box height={scaler(120)} color={'pink'}>
            {/* <ImageApp source={Images.bgImg4} style={styles.image} /> */}
          </Box>
          <Absolute zIndex={999} top={scaler(70)} left={0} right={0}>
            <Row justify="center">
              <Box rowGap={scaler(15)} align="center">
                <AvatarUser size={100} />
                <TextApp textAlign="center" weight={700} size={FontSize.Font16}>
                  Le Vu Hoang
                </TextApp>
              </Box>
            </Row>
          </Absolute>
          <Row mt={scaler(110)} columnGap={scaler(15)} ph={scaler(15)}>
            <Box
              flex={1}
              color={theme.colors.gray8}
              height={scaler(120)}
              p={scaler(15)}
              rowGap={scaler(35)}
              borderRadius={scaler(10)}>
              <Row columnGap={scaler(8)} pt={scaler(2)}>
                <Icons.Phone color={theme.colors.blue1} size={18} />
                <TextApp weight={600}>Phone number</TextApp>
              </Row>
              <TextApp size={FontSize.Font14}>0123456789</TextApp>
            </Box>
            <Box
              flex={1}
              color={theme.colors.gray8}
              height={scaler(120)}
              p={scaler(15)}
              rowGap={scaler(35)}
              borderRadius={scaler(10)}>
              <Row columnGap={scaler(8)}>
                <Icons.Email />
                <TextApp weight={600}>Email</TextApp>
              </Row>
              <TextApp size={FontSize.Font14}>admin12345@gmail.com</TextApp>
            </Box>
          </Row>
        </PageScreen>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

const stylesheet = createStyleSheet(theme => ({
  image: {
    width: '100%',
    height: '100%',
  },
  pageScreen: {
    paddingHorizontal: 0,
    backgroundColor: theme.colors.white,
  },
}));

export const CustomersInformationDetail = performanceNavigation(
  CustomersInformationDetailScreen,
);
