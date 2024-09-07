import {
  BoxInformationVertical,
  BoxInformationVerticalProps,
  TouchableApp,
} from '@component';
import {memo} from 'react';

type BoxLowCostRoomProps = {
  item: any;
  onPress?: () => void;
};

export const BoxLowCostRoom: React.NamedExoticComponent<BoxLowCostRoomProps> =
  memo(({item, onPress}) => {
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

    return (
      <>
        {list.map((_, index) => {
          return (
            <TouchableApp
              onPress={onPress}
              activeOpacity={1}
              key={`BoxLowCostRoom_${index}`}>
              <BoxInformationVertical {..._} key={index} />
            </TouchableApp>
          );
        })}
      </>
    );
  });
