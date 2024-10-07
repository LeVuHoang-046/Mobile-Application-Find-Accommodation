import {Icons} from '@assets';
import {
  Box,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
  Row,
  TextApp,
} from '@component';
import {ColorsStatic, RouteMain} from '@constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import { AppStackParamList } from '@types';
import { formatDate } from '@utils';
import {memo} from 'react';

type ScheduleSuccessfullyRouteProp = RouteProp<AppStackParamList, RouteMain.ScheduleSuccessfully>;

const ScheduleSuccessfullyScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
    const route = useRoute<ScheduleSuccessfullyRouteProp>();
    const { bookingData } = route.params; 
    console.log({bookingData})
    

  return (
    <Box flex={1}>
      <HeaderApp title="Schedule Successfully" goBack />
      {navigateFinish ? (
        <Box color={ColorsStatic.white} flex={1}>
          <Box
            color={ColorsStatic.white}
            rowGap={scaler(20)}
            align="center"
            pv={scaler(20)}>
            <Box
              color={ColorsStatic.green8}
              p={scaler(2)}
              borderRadius={scaler(50)}>
              <Icons.Check size={40} color={ColorsStatic.white} />
            </Box>
            <TextApp weight={700} size={FontSize.Font14}>
              Schedule Successfully
            </TextApp>
          </Box>

          <Box  rowGap={scaler(10)} pb={scaler(10)}>
            <Row justify='space-between' ph={scaler(10)} >
              <TextApp weight={600} color={ColorsStatic.gray3} >Post title</TextApp>
              <TextApp weight={700} color={ColorsStatic.blue3}>{bookingData.boarding_house_title}</TextApp>
            </Row>
            <Row justify='space-between' ph={scaler(10)}>
              <TextApp weight={600} color={ColorsStatic.gray3} flex={0.2}>Full name</TextApp>
              <TextApp weight={700} >{bookingData.customer_name}</TextApp>
            </Row>
            <Row justify='space-between' ph={scaler(10)}>
              <TextApp weight={600} color={ColorsStatic.gray3}>Phone number</TextApp>
              <TextApp weight={700} >{bookingData.phone_number}</TextApp>
            </Row>
            <Row justify='space-between' ph={scaler(10)}>
              <TextApp weight={600} color={ColorsStatic.gray3} >Appointment</TextApp>
              <TextApp weight={700} >{`${formatDate(bookingData.booking_date)}`}</TextApp>
            </Row>
          </Box>
        </Box>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const ScheduleSuccessfully = performanceNavigation(
  ScheduleSuccessfullyScreen,
);
