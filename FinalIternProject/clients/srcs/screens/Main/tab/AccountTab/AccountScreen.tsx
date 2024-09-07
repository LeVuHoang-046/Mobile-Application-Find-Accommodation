import React from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icons} from '@assets';
import {Box, ButtonArrowProps} from '@component';
import {BoxButtonsArrow} from '@component/box/BoxButtonArrow';
import {RouteMain, RouteTab} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {scaler} from '@themes';
import {TAppNavigation} from '@types';
import {BoxHeader} from './BoxHeaderAccountTab/BoxHeader';

export const AccountScreen = () => {
  const navigation = useNavigation<TAppNavigation<RouteTab.AccountTab>>();

  const Buttons: ButtonArrowProps[] = [
    {
      Icon: Icons.Post,
      label: 'Manage post',
      onPress: () => navigation.navigate(RouteMain.ManagePost),
    },
    {
      Icon: Icons.CreditCart,
      label: 'Manage service orders',
      onPress: () => navigation.navigate(RouteMain.ManaServiceOrder),
    },
    {
      Icon: Icons.CalendarClockOutLine,
      label: 'Appointment schedule',
      onPress: () => navigation.navigate(RouteMain.AppointmentSchedule),
    },
    {
      Icon: Icons.CreditCart,
      label: 'Bills',
      onPress: () => navigation.navigate(RouteMain.Bills),
    },
    {
      Icon: Icons.ScriptText,
      label: 'Contracts',
      onPress: () => navigation.navigate(RouteMain.Contract),
    },
    {
      Icon: Icons.HeartOutLine,
      label: 'Liked post',
      onPress: () => navigation.navigate(RouteMain.LikePost),
    },
    {
      Icon: Icons.FileLock,
      label: 'Term & policies',
      onPress: () => navigation.navigate(RouteMain.TermPolicies),
    },
    {
      Icon: Icons.AlertOutLine,
      label: 'Report a problem',
      onPress: () => navigation.navigate(RouteMain.ReportProblem),
    },
    {
      Icon: Icons.LogOut,
      label: 'Log out',
      // onPress: () => navigation.navigate(RouteMain.w)
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
        <BoxHeader />
        <Box mh={scaler(15)} mt={scaler(30)}>
          <BoxButtonsArrow style={styles.listBox} buttons={Buttons} isBold />
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  listBox: {
    borderRadius: scaler(8),
  },
});
