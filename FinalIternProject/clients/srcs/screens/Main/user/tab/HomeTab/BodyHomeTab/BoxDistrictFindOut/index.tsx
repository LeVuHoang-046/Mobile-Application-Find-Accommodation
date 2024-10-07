import {Images} from '@assets';
import {
  Absolute,
  Box,
  BoxShowMore,
  ImageApp,
  LinearGradientShadow,
  Row,
  TextApp,
  TouchableApp,
} from '@component';
import {FontSize, scaler} from '@themes';
import React from 'react';
import {ScrollView} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from '../../index.style';
import { useQueryCities, useQueryDistricts } from '@api';
import { useNavigation } from '@react-navigation/native';
import { TAppNavigation } from '@types';
import { RouteMain, RouteTabUser } from '@constants';

type DistrictItem = {
  image: any;
  text: string;
  // action: () => void;
}; 
interface BoxDistrictFindOutProps {
  onDistrictPress?: (district: string) => void; // Add a prop for district press
}

export const BoxDistrictFindOut: React.FC<BoxDistrictFindOutProps> = ({onDistrictPress}) => {
  const {styles, theme} = useStyles(stylesheet);
  const DistrictItems: DistrictItem[] = [
    {image: Images.imageBaDinh, text: 'Ba Đình'},
    {image: Images.imageCauGiay, text: 'Cầu Giấy'},
    {image: Images.imageDongDa, text: 'Đống Đa'},
    {image: Images.imageThanhXuan, text: 'Thanh Xuân'},
    {image: Images.imageHaiBaTrung, text: 'Hai Bà Trưng'},
    {image: Images.imageHoangMai, text: 'Hoàng Mai'},
    {image: Images.imageNamTuLiem, text: 'Nam Từ Liêm'},
    {image: Images.imageTayHo, text: 'Tây Hồ'},
    {image: Images.imageLongBien, text: 'Long Biên'},
    {image: Images.imageHoanKiem, text: 'Hoàn Kiếm'},
    {image: Images.imageThanhTri, text: 'Thanh Trì'},
    {image: Images.imageBacTuLiem, text: 'Bắc Từ Liêm'},
    {image: Images.imageHaDong, text: 'Hà Đông'},
  ];
  const RenderDistrictItems: React.FC<DistrictItem> = ({
    image,
    text,
    // action,
  }) => {
    const navigation = useNavigation<TAppNavigation<RouteTabUser.HomeTab>>();
    const handleNavigate = () => {
      // onDistrictPress(text);
      navigation.navigate(RouteMain.SearchForNews, {district: text})
    }
    return (
      <TouchableApp
          onPress={handleNavigate}
        style={styles.DistrictContainer}>
        <ImageApp source={image} style={styles.imageDistrict} />
        <LinearGradientShadow />
        <Absolute bottom={0} left={0} right={0}>
          <TextApp
            mb={scaler(20)}
            textAlign="center"
            color={theme.colors.white}
            size={FontSize.Font14}>
            {text}
          </TextApp>
        </Absolute>
      </TouchableApp>
    );
  };

  const navigation = useNavigation<TAppNavigation<RouteTabUser.HomeTab>>();
  const handleNavigate = () => {
    // onDistrictPress(text);
    navigation.navigate(RouteMain.SearchForNews)
  }

  return (
    <>
      <Box ph={scaler(10)} mt={scaler(130)}>
        <BoxShowMore onPress={handleNavigate}
        label='Find out'
        />
        <ScrollView horizontal>
          <Row columnGap={scaler(15)}>
            {DistrictItems.map((item, index) => (
              <React.Fragment key={index}>
                {RenderDistrictItems(item)}
              </React.Fragment>
            ))}
          </Row>
        </ScrollView>
      </Box>
    </>
  );
};
