import {
  BoxDetail,
  BoxInformation,
  BoxInformationProps,
  TouchableApp,
} from '@component';
import {scaler} from '@themes';
import {memo} from 'react';

type BoxDependableLandlordProps = {
  item: any;
  onPress?: () => void;
};

export const BoxDependableLandlord: React.NamedExoticComponent<BoxDependableLandlordProps> =
  memo(({item, onPress}) => {
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
            return (
              <TouchableApp
                onPress={onPress}
                activeOpacity={1}
                key={`BoxDependableLandlord_${index}`}>
                <BoxInformation {..._} key={index} />
              </TouchableApp>
            );
          })}
        </BoxDetail>
      </>
    );
  });
