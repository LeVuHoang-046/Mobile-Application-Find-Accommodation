import { useQueryRoomsByBoardingHouseId } from '@api';
import { BoxInformationVertical, BoxInformationVerticalProps } from '@component';
import { ColorsStatic, RouteMain, ShadowStyle } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { scaler } from '@themes';
import { BoardingHouseInfoType, RoomInfoType, TAppNavigation } from '@types';
import { formatNumberWithCommas } from '@utils';
import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type BoxSearchForNewsProps = {
  item: BoardingHouseInfoType;
  itemInfor?: RoomInfoType;
};

export const BoxSearchForNews: React.NamedExoticComponent<BoxSearchForNewsProps> =
  memo(({item}) => {
    const navigation = useNavigation<TAppNavigation<RouteMain.SearchForNews>>();

    const {data: rooms} = useQueryRoomsByBoardingHouseId(item.id);
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
      priceText = 'Price not available'; 
    }
    const firstRoom = rooms && rooms.length > 0 ? rooms[0] : null;
    
    const list: BoxInformationVerticalProps[] = [
      {
        time: '1 hours ago',
        tilte: item.title,
        price: priceText,
        location:
          `${item?.ward_name}, ${item?.district_name}, ${item?.city_name}`,
        district: item?.district_name,
        buildingName: item.name_building,
        area: firstRoom ? `${firstRoom.area} m²` : 'N/A', 
        numberPeople: firstRoom ? `${firstRoom.capacity}` : 'N/A',
      },
    ];

    const handleNavigate = () => {
      navigation.navigate(RouteMain.DetailRoom, {id: item.id});
    };

    return (
      <Pressable onPress={handleNavigate}>
      {list.map((_, index) => (
          <BoxInformationVertical
            styleOther={styles.textOther}
            style={[styles.container,ShadowStyle]}
            {..._}
            key={`BoxSearchForNews_${index}`}
          />
        ))}
      </Pressable>
    );
  });
  const styles = StyleSheet.create({
    textOther:{
      color: ColorsStatic.gray10
    },
    container:{
      borderWidth:scaler(0.25),
      
    }
  })
