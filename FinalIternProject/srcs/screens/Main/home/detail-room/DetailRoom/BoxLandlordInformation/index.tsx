import {Icons} from '@assets';
import {
  AvatarUser,
  Box,
  BoxDetail,
  Row,
  TextApp,
  TouchableApp,
} from '@component';
import { BoxContainer } from '@component/box/BoxContainer';
import {ColorsStatic, RouteMain, screenWidth} from '@constants';
import { useNavigation } from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import { TAppNavigation } from '@types';
import {StyleSheet} from 'react-native';

export const BoxLandlordInformation = () => {

  const navigation = useNavigation<TAppNavigation<RouteMain.DetailRoom>>();
  const handleNavigate = () => {
    navigation.navigate(RouteMain.LandlordInformationDetail)
  }

  return (
    <>
      <BoxDetail>
        <TouchableApp onPress={handleNavigate} activeOpacity={1}>
          <Row p={scaler(10)}>
            <Box style={styles.avatar}>
              <AvatarUser size={40} />
            </Box>
            <Box ml={scaler(10)} style={{flex: 0.85}}>
              <TextApp weight={800} size={FontSize.Font14}>
                Le Vu Hoang
              </TextApp>
              <TextApp weight={800} color={ColorsStatic.orange2} pt={scaler(7)}>
                12 posts
              </TextApp>
            </Box>
            <Icons.ArrowRight size={22} color={ColorsStatic.black} />
          </Row>
        </TouchableApp>
      </BoxDetail>
      <BoxContainer
      title='Detail'
      showIcon
      text='Chi tiết liên hệ 0987654321'
      />
      <BoxDetail height={300}/>

    </>
  );
};
const styles = StyleSheet.create({

  avatar: {
    width: '100%',
    height: '100%',
    flex: 0.15,
  },
});
