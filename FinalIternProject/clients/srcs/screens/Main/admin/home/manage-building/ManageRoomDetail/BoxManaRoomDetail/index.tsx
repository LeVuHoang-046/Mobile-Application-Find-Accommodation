import { Icons } from '@assets';
import {
  Box,
  BoxButtonsAvailabel,
  BoxDetail,
  BoxInformationIconServiceProps,
  BoxManaInformationRoomNumberProps,
  BoxRoomDetailInformation,
  BoxRoomDetailInformationProps,
  ListBoxInformationIcon,
  ListManaBoxRoomNumber,
  PageScreen,
} from '@component';
import { LineApp } from '@component/LineApp';
import { ColorsStatic, EGender, EStatusRoom, RouteMain } from '@constants';
import { scaler } from '@themes';
import { memo, useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BoardingHouseInfoType, RoomInfoType, TAppNavigation } from '@types';
import {
  useQueryFacilitiesByRoomId,
  useQueryImagesByRoomId,
  useQueryInteriorsByRoomId,
  useQueryRoomsByBoardingHouseId,
} from '@api';
import { formatNumberWithCommas, mapGender, mapTypeHouse } from '@utils';
import { BoxLandlordInformation } from '../BoxLandLordInformation';
import { BoxServiceCharge } from '../BoxServiceCharge';
import { SliderRoomDetail } from '../SliderRoomDetail';
import { ConfirmationModal } from '../ModalDetail';
import { api, deleteRoomById, updateRoomStatusById } from '@services';
import { useNavigation } from '@react-navigation/native';

type BoxManaRoomDetailProps = {
  item?: BoardingHouseInfoType;
  onRoomSelect?: (isSelected: boolean) => void;
};

export const BoxManaRoomDetail: React.NamedExoticComponent<BoxManaRoomDetailProps> =
  memo(({ item, onRoomSelect }) => {
    const navigation = useNavigation<TAppNavigation<RouteMain.ManaDetailRoom>>();
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [roomAvailability, setRoomAvailability] = useState<boolean | null>(
      null,
    );
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State for delete modal visibility


    const [activeRoomNumber, setActiveRoomNumber] =
      useState<RoomInfoType | null>(null);

    // Safely access rooms data
    const { data: rooms = [], refetch: refetchRooms } = useQueryRoomsByBoardingHouseId(
      item?.id,
    );

    // Safely access facilities and interiors
    const { data: facilities = [] } = useQueryFacilitiesByRoomId(
      activeRoomNumber?.id || (rooms?.[0]?.id ?? undefined),
    );
    const { data: interiors = [] } = useQueryInteriorsByRoomId(
      activeRoomNumber?.id || (rooms?.[0]?.id ?? undefined),
    );

    // Safely access images
    const { data: images = [] } = useQueryImagesByRoomId(
      activeRoomNumber?.id || (rooms?.[0]?.id ?? undefined),
    );

    // Get the minimum and maximum price from the rooms data
    const prices = Array.isArray(rooms) ? rooms.map(room => parseInt(room.price)) : [];
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    const { styles } = useStyles(stylesheet);
    console.log({activeRoomNumber})
    const list: BoxRoomDetailInformationProps[] = [
      {
        typeHome: mapTypeHouse(item?.type_house),
        gender: activeRoomNumber
          ? mapGender(activeRoomNumber.gender)
          : EGender.MaleFemale,
        title: item?.title || 'N/A',
        // Show price range if no room is selected, otherwise show the active room's price
        price: activeRoomNumber
          ? `${formatNumberWithCommas(activeRoomNumber.price)}đ/month`
          : `${formatNumberWithCommas(
              minPrice.toString(),
            )} - ${formatNumberWithCommas(maxPrice.toString())}đ/month`,
        location: `${item?.detail_address || ''}, ${item?.ward_name || ''}, ${item?.district_name || ''}, ${item?.city_name || ''}`,
        phoneNumber: item?.staff_phone || 'N/A',
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
      
      const listRooms: BoxManaInformationRoomNumberProps[] =
      rooms.length > 0
        ? rooms.map(room => ({
            roomnNumber: room.name || 'N/A',
            status: room.status as EStatusRoom,
          }))
        : [];

    const handlePressRoomNumber = (roomNumber: string) => {
      setActiveRoomNumber((prevRoom) => {
        const newActiveRoom = prevRoom?.name === roomNumber ? null : rooms?.find(room => room.name === roomNumber) || null;
        
        // Notify parent component about the room selection state
        onRoomSelect?.(newActiveRoom !== null);
        
        return newActiveRoom;
      });
    };

    const handlePress = useCallback(() => {
      setIsModalVisible(true); // Show modal when button is pressed
    }, []);

    const handleConfirm = (available: boolean) => {
      setRoomAvailability(available);
      // You can add any additional logic here based on availability
      console.log(`Room is now ${available ? 'available' : 'unavailable'}`);
    };

    const handleUpdateStatus = useCallback(
      async (available: boolean) => {
        if (!activeRoomNumber) return;

        try {
          // Set the new status based on the availability boolean
          const newStatus = available
            ? EStatusRoom.Available
            : EStatusRoom.Unavailable;

          // Call the update status function
          await updateRoomStatusById(activeRoomNumber.id, newStatus);
          refetchRooms();
          // Optionally, update the roomAvailability state and refetch room data
          setRoomAvailability(available);

          console.log(
            `Room status updated to ${available ? 'Available' : 'Unavailable'}`,
          );
        } catch (error) {
          console.error('Error updating room status:', error);
        } finally {
          // Close modal after updating
          setIsModalVisible(false);
        }
      },
      [activeRoomNumber, refetchRooms],
    );


    const handleDeletePress = useCallback(() => {
      setIsDeleteModalVisible(true); // Show the delete confirmation modal
    }, []);

    const handleConfirmDelete = useCallback(async () => {
      if (!activeRoomNumber) return;

      try {
        // Use the deleteRoomById function to delete the room
        await deleteRoomById(activeRoomNumber.id);
        
        // Refetch rooms or update the UI after deletion
        refetchRooms();
    
        console.log(`Room ID ${activeRoomNumber.id} deleted successfully`);
        
        // Clear the active room selection
        setActiveRoomNumber(null);
      } catch (error) {
        console.error('Error deleting room:', error);
      } finally {
        // Close the delete modal
        setIsDeleteModalVisible(false);
      }
    }, [activeRoomNumber, refetchRooms]);

    const handleNavigate = () => {
      navigation.navigate(RouteMain.FormUpdateRoom, { roomData: activeRoomNumber, onRoomUpdateRefetch: refetchRooms });
      console.log({activeRoomNumber})
    };

    return (
      <>
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
            <ListManaBoxRoomNumber
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
        {activeRoomNumber && (
          <BoxButtonsAvailabel
            titleLeftButton="Delete room"
            titleBetweenButton="Update"
            onPressBetwwen={handleNavigate}
            onPressLeftButton={handleDeletePress}
            onPressRightButton={handlePress}
          />
        )}
        <ConfirmationModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onConfirm={() => handleUpdateStatus(true)}
          onDeny={() => handleUpdateStatus(false)}
        />
        <ConfirmationModal
          visible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          onDeny={() => setIsDeleteModalVisible(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this room?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      </>
    );
  });

const stylesheet = createStyleSheet({
  pageScreen: {
    paddingHorizontal: 0,
    paddingBottom: scaler(90),
  },
});
