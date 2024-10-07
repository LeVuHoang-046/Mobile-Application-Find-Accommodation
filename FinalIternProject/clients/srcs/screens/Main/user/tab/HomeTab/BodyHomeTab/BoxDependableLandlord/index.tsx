import {useQueryBoardingHouseInfo, useQueryRoomsByBoardingHouseId} from '@api';
import {
  BoxDetail,
  BoxInformation,
  BoxInformationProps,
  TouchableApp,
} from '@component';
import {scaler} from '@themes';
import {BoardingHouseInfoType} from '@types';
import {formatNumberWithCommas} from '@utils';
import {memo} from 'react';

type BoxDependableLandlordProps = {
  item: BoardingHouseInfoType;
  onPress?: () => void;
};

export const BoxDependableLandlord: React.NamedExoticComponent<BoxDependableLandlordProps> =
  memo(({item, onPress}) => {
    const {data: rooms} = useQueryRoomsByBoardingHouseId(item?.id);


    const prices = rooms?.map(room => parseInt(room.price)) || [];
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : null;

    let priceText = '';
    
    if (minPrice !== null && maxPrice !== null && minPrice !== maxPrice) {
      priceText = `from ${formatNumberWithCommas(minPrice.toString())}VND`;
    } else if (minPrice !== null) {
      priceText = `${formatNumberWithCommas(minPrice.toString())}VND`;
    } else if (maxPrice !== null) {
      priceText = `${formatNumberWithCommas(maxPrice.toString())}VND`;
    } else {
      priceText = 'Price not available'; // or any default message
    }

    const list: BoxInformationProps[] = [
      {
        title: item.title,
        buildingName: item.name_building,
        location: `${item.ward_name}, ${item.district_name},  ${item.city_name} `,
        district: item.district_name,
        price: priceText,
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
