import {Icons} from '@assets';
import {
  Box,
  BoxDetail,
  BoxInformationIconServiceProps,
  BoxInformationRoomNumberProps,
  BoxRoomDetailInformation,
  BoxRoomDetailInformationProps,
  ListBoxInformationIcon,
  ListBoxRoomNumber,
  PageScreen,
} from '@component';
import {LineApp} from '@component/LineApp';
import {ColorsStatic, EGender} from '@constants';
import {scaler} from '@themes';
import {memo, useState} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {BoxLandlordInformation} from '../BoxLandlordInformation';
import {BoxServiceCharge} from '../BoxServiceCharge';
import {SliderRoomDetail} from '../SliderRoomDetail';

type BoxRoomDetailProps = {
  item: any;
};

export const BoxRoomDetail: React.NamedExoticComponent<BoxRoomDetailProps> =
  memo(({item}) => {
    const [activeRoomNumber, setActiveRoomNumber] = useState<string | null>(
      null,
    );

    const {styles} = useStyles(stylesheet);
    const list: BoxRoomDetailInformationProps[] = [
      {
        typeHome: 'HomeStay',
        gender: EGender.MaleFemale,
        title: 'ĐH Y Hà Nội - Còn 4 slot báo full - Giá rẻ',
        price: '1.000.000 - 1.400.000đ/tháng',
        location:
          '69A Hoàng Văn Thái, Phườg Khương Mai, Quận Thanh Xuân, Thành phố Hà Nội',
        phoneNumber: '087988123',
      },
    ];

    const listInforIcon: BoxInformationIconServiceProps[] = [
      {
        icon: <Icons.Stair size={18} color={ColorsStatic.gray1} />,
        label: 'Floor',
        value: '2',
      },
      {
        icon: <Icons.Area size={18} color={ColorsStatic.gray1} />,
        label: 'Area',
        value: '31m2',
      },
      {
        icon: <Icons.People size={18} color={ColorsStatic.gray1} />,
        label: 'People',
        value: '2',
      },
      {
        icon: <Icons.MoneyRange size={18} color={ColorsStatic.gray1} />,
        label: 'Deposit',
        value: '1.000.000đ',
      },
    ];

    const listRooms: BoxInformationRoomNumberProps[] = [
      {
        roomnNumber: '202',
      },
      {
        roomnNumber: '203',
      },
    ];

    const handlePressRoomnumber = (roomNumber: string) => {
      setActiveRoomNumber(prevRoomNumber =>
        prevRoomNumber === roomNumber ? null : roomNumber,
      );
    };

    return (
      <PageScreen contentContainerStyle={styles.pageScreen}>
        <BoxDetail rowGap={scaler(8)} p={scaler(15)}>
          <SliderRoomDetail />
          <Box>
            {list.map((_, index) => (
              <BoxRoomDetailInformation key={index} {..._} />
            ))}
          </Box>
        </BoxDetail>
        <BoxDetail p={scaler(10)}>
          {activeRoomNumber && (
            <>
              <ListBoxInformationIcon isBold list={listInforIcon} />
              <LineApp />
            </>
          )}
          <ListBoxRoomNumber
            onPressRoom={handlePressRoomnumber}
            list={listRooms}
            activeRoomNumber={activeRoomNumber}
          />
        </BoxDetail>
        <BoxServiceCharge />
        <BoxLandlordInformation />
      </PageScreen>
    );
  });

const stylesheet = createStyleSheet({
  pageScreen: {
    paddingHorizontal: 0,
    paddingBottom: scaler(90),
  },
});
