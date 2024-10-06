import {BoxInformationVertical, BoxInformationVerticalProps, TouchableApp} from '@component';
import { EGender } from '@constants';
import {FontSize, scaler} from '@themes';
import {memo} from 'react';
import {StyleSheet} from 'react-native';

type BoxLookingForRoomatesProps = {
  item: any;
  onPress?: () => void;
};

export const BoxLookingForRoomates: React.NamedExoticComponent<BoxLookingForRoomatesProps> =
  memo(({item, onPress}) => {
    const list: BoxInformationVerticalProps[] = [
      {
        time: '1 hours ago',
        tilte: 'Đường Láng phòng đẹp sáng giá tốt',
        price: '4.500.000đ/tháng',
        location:
          '29 Dịch Vọng, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội',
        district: 'Quận Cầu Giấy',
        area: '30m2',
        numberPeople: '4',
        gender: EGender.Male,
        isBold: true,
      },
    ];
    return (
      <>
        {list.map((_, index) => {
          return (
            <TouchableApp onPress={onPress} activeOpacity={1} key={`BoxLookingForRoomates_${index}`}>
              <BoxInformationVertical
                styleTitle={styles.title}
                style={styles.boxContainer}
                {..._}
                key={index}
              />
            </TouchableApp>
          );
        })}
      </>
    );
  });
const styles = StyleSheet.create({
  boxContainer: {
    width: scaler(250),
  },
  title: {
    fontSize: FontSize.Font14,
    fontWeight: '700',
  },

});
