import {BoxDetail, BoxInformation, BoxInformationProps} from '@component';
import {scaler} from '@themes';
import {memo} from 'react';

type BoxDependableLandlordProps = {
  item: any;
};

export const BoxDependableLandlord: React.NamedExoticComponent<BoxDependableLandlordProps> =
  memo(({item}) => {
    const list: BoxInformationProps[] = [
      {
        tilte: 'Siêu CCMN giá cực tốt cho SV Hà Đông',
        price: '3.500.000',
        location: 'Phường Văn Quán, Quận Hà Đông',
        district: 'Quận Hà Đông',
        buildingName: 'phòng trọ mpl',
        area: '25',
        numberPeople: '3',
      },
    ];

    return (
      <>
        <BoxDetail mv={scaler(5)} p={scaler(10)}>
          {list.map((_, index) => {
            return <BoxInformation {..._} key={index} />;
          })}
        </BoxDetail>
      </>
    );
  });
