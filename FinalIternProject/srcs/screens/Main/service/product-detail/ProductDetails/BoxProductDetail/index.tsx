import {Box, PageScreen, SliderSwipe, TextApp} from '@component';
import {BoxContainer} from '@component/box/BoxContainer';
import {ColorsStatic, RouteMain, screenWidth} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {TAppNavigation} from '@types';
import {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';

type BoxProductDetailsProps = {
  item?: any;
};

export const BoxProductDetails: React.NamedExoticComponent<BoxProductDetailsProps> =
  memo(({item}) => {
    const navigation =
      useNavigation<TAppNavigation<RouteMain.ProductDetails>>();

    const handleImagePress = useCallback(
      (index: number) => {
        navigation.navigate(RouteMain.ImageRoomDetail, {
          images: data,
          activeIndex: index,
        });
      },
      [navigation],
    );

    const data = [
      'https://thietkenoithat.com/Portals/0/xNews/uploads/2022/6/23/thiet-ke-phong-ngu-nho(17).jpg',
      'https://media.noithatcaco.vn/upanh/uploads/04-2023/6oq0vl.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWJQKHEKNsPC_VUMLkvS3IjVPQaGIcYQtwbQ&s',
      'https://noithattugia.com/wp-content/uploads/2022/04/thiet-ke-noi-that-phong-ngu-cho-be-gai-voi-tong-mau-hong-chu-dao-ket-hop-cung-cac-do-noi-that-co-mau-nhe-nhang-nhu-xanh-reu-va-trang_1659933121.jpg',
    ];

    return (
      <PageScreen contentContainerStyle={styles.pageScreen}>
        <Box p={scaler(10)} color={ColorsStatic.white}>
          <SliderSwipe
            onImagePress={handleImagePress}
            widthSlider={screenWidth - scaler(20)}
            data={data}
          />
          <Box pb={scaler(10)}>
            <TextApp size={FontSize.Font18} weight={700}>
              Thiết kế/Decor phòng theo yêu cầu
            </TextApp>
            <TextApp
              size={FontSize.Font16}
              weight={700}
              color={ColorsStatic.red2}>
              1.500.000 VND
            </TextApp>
            <TextApp pt={scaler(5)} size={FontSize.Font14} weight={700}>
              Đã bán: 51
            </TextApp>
          </Box>
        </Box>
        <Box pb={scaler(100)} color={ColorsStatic.white}>
          <BoxContainer
            title="Mô tả sản phẩm"
            text="Giá trên cho một phòng.
                Lưu ý chỉ là chi phí khỏa sát lên thiết kế, còn chi phí dồ đac và ti công chưa bao gồm"
            colorTile={ColorsStatic.red1}
            styleText={styles.textDescribe}
          />
        </Box>
      </PageScreen>
    );
  });

const styles = StyleSheet.create({
  textDescribe: {
    fontSize: FontSize.Font14,
  },
  pageScreen: {
    paddingHorizontal: 0,
  },
});
