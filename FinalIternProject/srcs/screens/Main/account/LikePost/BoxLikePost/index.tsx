import {BoxDetail, BoxInformation, BoxInformationProps} from '@component';
import {scaler} from '@themes';
import {memo} from 'react';
type BoxLikedPostProps = {
  item: any;
};

export const BoxLikedPost: React.NamedExoticComponent<BoxLikedPostProps> = memo(
  ({item}) => {
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
          return <BoxInformation {..._} key={index} />;
        })}
      </BoxDetail>
    );
  },
);
