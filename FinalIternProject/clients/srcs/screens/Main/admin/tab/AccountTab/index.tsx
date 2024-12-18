import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icons} from '@assets';
import {Box, ButtonArrowProps, Row, TextApp, TouchableApp} from '@component';
import {BoxButtonsArrow} from '@component/box/BoxButtonArrow';
import {ColorsStatic, ETypeToastCustom, RouteMain, RouteTabUser} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {TAppNavigation} from '@types';
import {useQueryClient} from '@tanstack/react-query';
import {pushToastCustom} from '@utils/toast';
import {ToastPosition} from '@backpackapp-io/react-native-toast';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import {usePhoneUserStore, useTokenUserStore} from '@stores';
import {GlobalService} from '@component/GlobalUI';

export const AccountTab = () => {
  const navigation = useNavigation<TAppNavigation<RouteTabUser.AccountTab>>();
  const queryClient = useQueryClient();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const {clearToken} = useTokenUserStore();
  const {clearPhoneNumber} = usePhoneUserStore()
  const handleLogout = async () => {
    try {
      GlobalService.showLoading();
      await auth().signOut();

      // Clear token from query cache
      queryClient.removeQueries({queryKey: ['authToken']});
      console.log('Token removed from cache');
      clearToken();
      clearPhoneNumber();

      setTimeout(() => {
        pushToastCustom(
          'Sign out successful',
          ETypeToastCustom.Success,
          ToastPosition.BOTTOM,
        );
        GlobalService.hideLoading();
      }, 1500);
    } catch (error) {
    } finally {
    }
  };
  const Buttons: ButtonArrowProps[] = [
    {
      Icon: Icons.LogOut,
      label: 'Sign out',
      onPress: () => setModalVisible(true),
    },
  ];

  return (
    <Box flex={1}>
      <SafeAreaView edges={['top']} />
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <ScrollView contentContainerStyle={{height: 1000}}>
        {/* <BoxHeader /> */}
        <Box mh={scaler(15)} mt={scaler(30)}>
          <BoxButtonsArrow style={styles.listBox} buttons={Buttons} isBold />
        </Box>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}>
        <Box
          color={ColorsStatic.white}
          p={scaler(20)}
          borderRadius={scaler(10)}
          align="center">
          <TextApp mb={scaler(10)} weight={700} size={FontSize.Font16}>
            Sign Out
          </TextApp>
          <TextApp
            mb={scaler(15)}
            size={FontSize.Font13}
            weight={600}
            color={ColorsStatic.gray3}>
            Are you sure you want to Sign out?
          </TextApp>
          <Row justify="space-between">
            <TouchableApp
              onPress={() => setModalVisible(false)}
              style={styles.modalButtonCancelled}>
              <TextApp color={ColorsStatic.white}>No</TextApp>
            </TouchableApp>
            <TouchableApp
              onPress={handleLogout}
              style={styles.modalButtonConfirm}>
              <TextApp color={ColorsStatic.white}>Yes</TextApp>
            </TouchableApp>
          </Row>
        </Box>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  listBox: {
    borderRadius: scaler(8),
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonCancelled: {
    flex: 1,
    marginHorizontal: scaler(10),
    padding: scaler(10),
    backgroundColor: ColorsStatic.gray3,
    borderRadius: scaler(20),
    alignItems: 'center',
  },
  modalButtonConfirm: {
    flex: 1,
    marginHorizontal: scaler(10),
    padding: scaler(10),
    backgroundColor: ColorsStatic.orange3,
    borderRadius: scaler(20),
    alignItems: 'center',
  },
});
