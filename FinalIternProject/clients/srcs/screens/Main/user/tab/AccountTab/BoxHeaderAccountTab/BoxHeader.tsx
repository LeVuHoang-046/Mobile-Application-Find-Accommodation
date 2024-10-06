import { useQueryUserInformation } from '@api';
import {Icons} from '@assets';
import {Absolute, AvatarUser, Box, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteMain, RouteTabUser, screenWidth} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {getUserInformation} from '@services';
import { usePhoneUserStore } from '@stores';
import {FontSize, scaler} from '@themes';
import {TAppNavigation} from '@types';
import {memo, useEffect, useState} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';

export const BoxHeader: React.NamedExoticComponent = memo(() => {
  const navigation = useNavigation<TAppNavigation<RouteTabUser.AccountTab>>();
  const {phoneNumber} = usePhoneUserStore();
  const { data } = useQueryUserInformation(phoneNumber ?? '');
  // console.log({phoneNumber})

  const handleNavigate = () => {
    navigation.navigate(RouteMain.UpdateInformation);
  };

  return (
    <>
      <Box style={styles.header}>
        <Absolute right={15} top={15}>
          <TouchableHighlight>
            <Icons.Setting />
          </TouchableHighlight>
        </Absolute>
      </Box>
      <Absolute top={scaler(145)}>
        <TouchableApp
          onPress={handleNavigate}
          activeOpacity={1}
          style={styles.accountButton}>
          <Box style={styles.avatar}>
            <AvatarUser size={50} />
          </Box>
          <Box ml={scaler(10)} style={{flex: 0.85}}>
            <TextApp weight={600} size={FontSize.Font14}>
              {data?.fullName || ''} 
            </TextApp>
            <TextApp weight={600} pt={scaler(10)}>
              {data?.phone || ''} 
            </TextApp>
          </Box>
          <Icons.ArrowRight size={22} color={ColorsStatic.black} />
        </TouchableApp>
      </Absolute>
    </>
  );
});

const styles = StyleSheet.create({
  header: {
    backgroundColor: ColorsStatic.gray1,
    height: scaler(180),
    justifyContent: 'center',
  },
  accountButton: {
    backgroundColor: ColorsStatic.white,
    zIndex: 100,
    borderRadius: scaler(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scaler(70),
    marginHorizontal: scaler(12),
    width: screenWidth - 30,
    padding: scaler(10),
  },
  avatar: {
    width: '100%',
    height: '100%',
    flex: 0.15,
  },
});
