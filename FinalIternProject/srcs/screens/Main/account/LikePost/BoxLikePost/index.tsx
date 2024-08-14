import {
  BoxDetail,
  BoxInformation,
  BoxInformationProps,
  TouchableApp,
} from '@component';
import {scaler} from '@themes';
import {memo} from 'react';
type BoxLikedPostProps = {
  item: any;
  onPress?: () => void;
};

export const BoxLikedPost: React.NamedExoticComponent<BoxLikedPostProps> = memo(
  ({item, onPress}) => {
    const list: BoxInformationProps[] = [
      {
        tilte: 'Phòng mới Nguyễn Văn Trỗi gần Ga Văn Quán',
        price: '3.800.000đ/tháng',
        location: 'Phường Mộ La, Quận Hà Đông, Thành phố Hà Nội',
        district: 'Quận Hà Đông',
        buildingName: '501',
        area: '30',
        numberPeople: '2',
        isLiked: true,
      },
    ];

    return (
      <BoxDetail p={scaler(10)}>
        {list.map((_, index) => {
          return (
            <TouchableApp
              activeOpacity={1}
              onPress={onPress}
              key={`BoxLikedPost_${index}`}>
              <BoxInformation {..._} key={index} />
            </TouchableApp>
          );
        })}
      </BoxDetail>
    );
  },
);
