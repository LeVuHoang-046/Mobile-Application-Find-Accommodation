import {Images} from '@assets';
import {
  Box,
  ButtonChooseServiceProps,
  HeaderApp,
  ListButtonServiceTab,
  PageScreen,
} from '@component';
import { RouteMain, RouteTabUser } from '@constants';
import { useNavigation } from '@react-navigation/native';
import {scaler} from '@themes';
import { TAppNavigation } from '@types';
import React from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export const ServiceScreen = () => {
  const {styles} = useStyles(stylesheet);

  const navigation = useNavigation<TAppNavigation<RouteTabUser.ServiceTab>>();


  const list: ButtonChooseServiceProps[] = [
    {
      image: Images.designRoom,
      title: 'Room design consultation',
      onPress: () => navigation.navigate(RouteMain.DesignRoomService)
    },
    {
      image: Images.waterElectricRepair,
      title: 'Repair service',
      onPress: () => navigation.navigate(RouteMain.RepairService)
    },
    {
      image: Images.laudryService,
      title: 'Laudry service',
      onPress: () => navigation.navigate(RouteMain.LaundryService)
    },
    {
      image: Images.waterService,
      title: 'Water service',
      onPress: () => navigation.navigate(RouteMain.WaterService)
    },
    {
      image: Images.gas,
      title: 'Gas Service',
      onPress: () => navigation.navigate(RouteMain.GasService)
    },
    {
      image: Images.transportSerice,
      title: 'Transportation service',
      onPress: () => navigation.navigate(RouteMain.TransportService)
    },
    {
      image: Images.decord,
      title: 'Cheap furniture',
      onPress: () => navigation.navigate(RouteMain.DesignRoomService)
    },
  ];

  return (
    <Box flex={1}>
      <HeaderApp title="Sales service" />
      <PageScreen contentContainerStyle={styles.container}>
        <ListButtonServiceTab list={list} />
      </PageScreen>
    </Box>
  );
};

const stylesheet = createStyleSheet({
  container: {
    marginTop: scaler(10),
  },
});
