import React, {useEffect, useState} from 'react';
import {Modal, View, Button, StyleSheet, FlatList} from 'react-native'; // Import Modal from React Native
import {Icons} from '@assets';
import {AvatarUser, Box, Row, TextApp, TouchableApp} from '@component';
import {
  ColorsStatic,
  EStatusBooking,
  RouteMain,
  ShadowStyle1,
} from '@constants';
import {FontSize, scaler} from '@themes';
import {
  BoardingHouseInfoType,
  BookingData,
  TAppNavigation,
  UserMeType,
} from '@types';
import axios from 'axios';
import {formatDate} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {useQueryBookingsByStatus} from '@api';

type ConfirmedProps = {
  dataUser?: UserMeType;
};

export const Confirmed: React.FC<ConfirmedProps> = ({dataUser}) => {
  const [appointmentData, setAppointmentData] = useState<BookingData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<BookingData | null>(null);

  const {data: Confirmed} = useQueryBookingsByStatus(EStatusBooking.Comfirmed);
  // console.log({Confirmed});

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
        data={Confirmed} // Use the filtered appointments
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
                    Customer: {item.customer_name}
                  </TextApp>
                  <Row columnGap={scaler(5)}>
                    <Icons.Phone color={ColorsStatic.gray1} />
                    <TextApp>{item.phone_number}</TextApp>
                  </Row>
                  <Row columnGap={scaler(5)}>
                    <Icons.Post color={ColorsStatic.gray1} size={18} />
                    <TextApp>
                      Post:{' '}
                      {/* <TouchableApp
                        onPress={() => handleNaviagte(item.boarding_house_id)}> */}
                        <TextApp
                          textDecorationLine="underline"
                          color={ColorsStatic.blue3}>
                          {item.boarding_house_title || 'N/A'}
                        </TextApp>
                      {/* </TouchableApp> */}
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
              <TouchableApp style={styles.button}>
                <TextApp
                  textAlign="center"
                  weight={600}
                  color={ColorsStatic.white}>
                  Confirm
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
              <Button title="Confirm" />
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
