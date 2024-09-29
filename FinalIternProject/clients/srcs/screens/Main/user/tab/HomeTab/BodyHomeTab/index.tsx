import {Box, BoxShowMore, Row} from '@component';
import {scaler} from '@themes';
import {BoxDependableLandlord} from './BoxDependableLandlord';
import {BoxDistrictFindOut} from './BoxDistrictFindOut';
import {BoxLowCostRoom} from './BoxLowCostRoom';
import { ScrollView, StyleSheet } from 'react-native';
import { BoxLookingForRoomates } from './BoxLookingForRoommates';
import { useNavigation } from '@react-navigation/native';
import { TAppNavigation } from '@types';
import { RouteMain, RouteTabUser } from '@constants';
import { useQueryBoardingHouseInfo } from '@api';

export const BodyHomeTab = () => {
  const fakeData = Array(6).fill(0);
  const { data } = useQueryBoardingHouseInfo();

  const navigation = useNavigation<TAppNavigation<RouteTabUser.HomeTab>>();
  const handleNavigate = (id: number) => {
    navigation.navigate(RouteMain.DetailRoom,{id})
  }
 
  return (
    <>
      <BoxDistrictFindOut />
      <Box ph={scaler(10)}>
        <BoxShowMore label="Dependable lanlord" />
        {data?.map((item, index) => (
          <BoxDependableLandlord onPress={()=>handleNavigate(item.id)} item={item} key={item.id} />
        ))}
        <BoxShowMore label="Low-cost room" />
        <Row justify='space-between' flexWrap="wrap" rowGap={scaler(30)} pb={scaler(5)} >
          {fakeData.map((item, index) => (
            <BoxLowCostRoom onPress={()=>handleNavigate} item={item} key={index} />
          ))}
        </Row>
        <BoxShowMore label="Looking for roommates" />
        <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        horizontal>
          <Row columnGap={scaler(15)}>
          {fakeData.map((item, index) => (
            <BoxLookingForRoomates onPress={()=>handleNavigate} item={item} key={index} />
          ))}

          </Row>
        </ScrollView>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView:{
    paddingBottom: scaler(10)
  }
})
