import {BoxInformationVertical, BoxInformationVerticalProps} from '@component';
import {ColorsStatic, RouteMain} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@types';
import {memo} from 'react';
import {Pressable} from 'react-native';

type BoxSearchForNewsProps = {
  item: any;
};

export const BoxSearchForNews: React.NamedExoticComponent<BoxSearchForNewsProps> =
  memo(({item}) => {
    const navigation = useNavigation<TAppNavigation<RouteMain.SearchForNews>>();
    const list: BoxInformationVerticalProps[] = [
      {
        time: '1 hours ago',
        tilte: 'Đường Láng phòng đẹp sáng giá tốt',
        price: '4.500.000đ/tháng',
        location:
          '29 Dịch Vọng, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội',
        district: 'Quận Cầu Giấy',
        buildingName: 'Số/tên phòng: 404',
        area: '30m2',
        numberPeople: '4',
      },
    ];

    const handleNavigate = () => {
      navigation.navigate(RouteMain.DetailRoom);
    };

    return (
      <Pressable onPress={handleNavigate}>
        {list.map((_, index) => (
          <BoxInformationVertical
            styleOther={{color: ColorsStatic.gray10}}
            {..._}
            key={`BoxSearchForNews_${index}`}
          />
        ))}
      </Pressable>
    );
  });
