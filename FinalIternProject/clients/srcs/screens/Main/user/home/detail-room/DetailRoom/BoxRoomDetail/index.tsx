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
import {BoardingHouseInfoType, RoomInfoType} from '@types';
import {
  useQueryFacilitiesByRoomId,
  useQueryImagesByRoomId,
  useQueryInteriorsByRoomId,
  useQueryRoomsByBoardingHouseId,
} from '@api';
import {formatNumberWithCommas, mapGender, mapTypeHouse} from '@utils';

type BoxRoomDetailProps = {
  item?: BoardingHouseInfoType;
};

export const BoxRoomDetail: React.NamedExoticComponent<BoxRoomDetailProps> =
  memo(({item}) => {
    const [activeRoomNumber, setActiveRoomNumber] =
      useState<RoomInfoType | null>(null);
    const {data: rooms} = useQueryRoomsByBoardingHouseId(item?.id);

    const {data: facilities} = useQueryFacilitiesByRoomId(
      activeRoomNumber?.id || (rooms?.[0]?.id ?? undefined),
    );
    const {data: interiors} = useQueryInteriorsByRoomId(
      activeRoomNumber?.id || (rooms?.[0]?.id ?? undefined),
    );

    const {data: images} = useQueryImagesByRoomId(activeRoomNumber?.id || (rooms?.[0]?.id ?? undefined))

    // Get the minimum and maximum price from the rooms data
    const prices = rooms?.map(room => parseInt(room.price)) || [];
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    const {styles} = useStyles(stylesheet);

    const list: BoxRoomDetailInformationProps[] = [
      {
        typeHome: mapTypeHouse(item?.type_house),
        gender: activeRoomNumber
          ? mapGender(activeRoomNumber.gender)
          : EGender.MaleFemale,
        title: item?.title,
        // Show price range if no room is selected, otherwise show the active room's price
        price: activeRoomNumber
          ? `${formatNumberWithCommas(activeRoomNumber.price)}đ/month`
          : `${formatNumberWithCommas(
              minPrice.toString(),
            )} - ${formatNumberWithCommas(maxPrice.toString())}đ/month`,
        location: `${item?.detail_address}, ${item?.ward_name}, ${item?.district_name}, ${item?.city_name}`,
        phoneNumber: item?.staff_phone,
      },
    ];

    const listInforIcon: BoxInformationIconServiceProps[] = activeRoomNumber
      ? [
          {
            icon: <Icons.Stair size={18} color={ColorsStatic.gray1} />,
            label: 'Floor',
            value: activeRoomNumber.floor.toString(),
          },
          {
            icon: <Icons.Area size={18} color={ColorsStatic.gray1} />,
            label: 'Area',
            value: `${activeRoomNumber.area}m²`,
          },
          {
            icon: <Icons.People size={18} color={ColorsStatic.gray1} />,
            label: 'People',
            value: activeRoomNumber.capacity.toString(),
          },
          {
            icon: <Icons.MoneyRange size={18} color={ColorsStatic.gray1} />,
            label: 'Deposit',
            value: `${formatNumberWithCommas(activeRoomNumber.deposit)}đ`,
          },
        ]
      : [];

    const listRooms: BoxInformationRoomNumberProps[] =
      rooms?.map(room => ({
        roomnNumber: room.name,
        status: room.status, // Display room name as the room number
      })) || [];

    const handlePressRoomNumber = (roomNumber: string) => {
      setActiveRoomNumber(prevRoom =>
        prevRoom?.name === roomNumber
          ? null
          : rooms?.find(room => room.name === roomNumber) || null,
      );
    };

    return (
      <PageScreen contentContainerStyle={styles.pageScreen}>
        <BoxDetail rowGap={scaler(8)} p={scaler(15)}>
          <SliderRoomDetail item={images} />
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
            onPressRoom={handlePressRoomNumber}
            list={listRooms}
            activeRoomNumber={activeRoomNumber}
          />
        </BoxDetail>
        <BoxServiceCharge
          itemFacilityies={facilities}
          itemInteriors={interiors}
        />
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
