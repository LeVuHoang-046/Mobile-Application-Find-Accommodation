import React, {useEffect, useState} from 'react';
import {Modal, View, Button, StyleSheet, FlatList} from 'react-native'; // Import Modal from React Native
import {Icons} from '@assets';
import {AvatarUser, Box, Row, TextApp, TouchableApp} from '@component';
import {
  ColorsStatic,
  CONFIG_SSO,
  EStatusBooking,
  RouteMain,
  ShadowStyle1,
} from '@constants';
import {FontSize, scaler} from '@themes';
import {
  BoardingHouseInfoType,
  BookingData,
  BookingInfoType,
  TAppNavigation,
  UserMeType,
} from '@types';
import axios from 'axios';
import {formatDate, formatDateTime} from '@utils';
import {useNavigation} from '@react-navigation/native';

type ConfirmedProps = {
  dataUser?: UserMeType;
};

export const Confirmed: React.FC<ConfirmedProps> = ({dataUser}) => {
  const [appointmentData, setAppointmentData] = useState<BookingInfoType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<BookingInfoType | null>(null);

  useEffect(() => {
    const getBookingsByUserId = async (userId: any) => {
      try {
        const response = await axios.get(
          `${CONFIG_SSO.BASE.HOME}/api/bookings/user`,
          {
            params: {user_id: userId}, // Axios will serialize params for you
          },
        );

        if (response.data.success) {
          setAppointmentData(response.data.data); // Set the appointments data to state
        } else {
          console.error(response.data.message); // Handle error message
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (dataUser?.user_id) {
      getBookingsByUserId(dataUser.user_id); // Fetch bookings for the user
    }
  }, [dataUser]);

  const handleCancelPress = (appointment: BookingInfoType) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const confirmCancel = async () => {
    if (selectedAppointment) {
      try {
        // Update the appointment status to cancelled (5)
        await axios.patch(
          `${CONFIG_SSO.BASE.HOME}/api/bookings/${selectedAppointment.id}/cancel`,
          {
            status: EStatusBooking.Cancelled, // Status code for cancelled
          },
        );

        // Optionally remove the appointment from the state if you want to reflect immediately
        setAppointmentData(prevData =>
          prevData.map(item =>
            item.id === selectedAppointment.id
              ? {...item, status: EStatusBooking.Cancelled} // Update the status instead of removing
              : item,
          ),
        );

        setIsModalVisible(false);
        setSelectedAppointment(null);
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }
    }
  };

  // Filter appointments to only show those with status = 0
  const filteredAppointments = appointmentData.filter(
    item => item.status === EStatusBooking.Comfirmed,
  );
  const navigation =
    useNavigation<TAppNavigation<RouteMain.AppointmentSchedule>>();
  const handleNaviagte = (id?: number) => {
    if (id !== undefined) {
      navigation.navigate(RouteMain.DetailRoom, {id});
    } else {
      console.warn('Invalid id, navigation cancelled.');
    }
  };
  return (
    <>
      <FlatList
        data={filteredAppointments} // Use the filtered appointments
        keyExtractor={item => `appointment-${item.id}`}
        renderItem={({item}) => (
          <Box p={scaler(10)}>
            <Box
              style={ShadowStyle1}
              color={ColorsStatic.white}
              p={scaler(8)}
              borderRadius={scaler(10)}
              rowGap={scaler(15)}>
              <Row columnGap={scaler(10)}>
                <Row minH={scaler(88)} align="flex-start">
                  <AvatarUser size={40} />
                </Row>
                <Box rowGap={scaler(5)}>
                  <TextApp size={FontSize.Font16}>
                    Staff: {item.customer_name}
                  </TextApp>
                  <Row columnGap={scaler(5)}>
                    <Icons.Phone color={ColorsStatic.gray1} />
                    <TextApp>{item.phone_number}</TextApp>
                  </Row>
                  <Row columnGap={scaler(5)}>
                    <Icons.Post color={ColorsStatic.gray1} size={18} />
                    <TextApp>
                      Post:{' '}
                      <TouchableApp
                        onPress={() => handleNaviagte(item.boarding_house_id)}>
                        <TextApp
                          textDecorationLine="underline"
                          color={ColorsStatic.blue3}>
                          {item.boarding_house_title || 'N/A'}
                        </TextApp>
                      </TouchableApp>
                    </TextApp>
                  </Row>
                  <Row columnGap={scaler(5)}>
                    <Icons.Calendar size={18} color={ColorsStatic.gray1} />
                    <TextApp>
                      Thoi gian: {`${formatDate(item.booking_date)}`}
                    </TextApp>
                  </Row>
                </Box>
              </Row>
              <TouchableApp
                style={styles.button}
                onPress={() => handleCancelPress(item)}>
                <TextApp
                  textAlign="center"
                  weight={600}
                  color={ColorsStatic.white}>
                  Cancel the appointment
                </TextApp>
              </TouchableApp>
            </Box>
          </Box>
        )}
      />

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextApp>Are you sure you want to cancel this appointment?</TextApp>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              <Button title="Confirm" onPress={confirmCancel} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorsStatic.orange3,
    paddingVertical: scaler(8),
    borderRadius: scaler(10),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: scaler(20),
    backgroundColor: ColorsStatic.white,
    borderRadius: scaler(10),
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scaler(20),
  },
});
