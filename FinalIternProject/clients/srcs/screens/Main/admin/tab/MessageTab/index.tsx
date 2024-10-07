import {Icons} from '@assets';
import {
  Absolute,
  AvatarUser,
  Box,
  HeaderApp,
  Row,
  TextApp,
  TouchableApp,
} from '@component';
import {ColorsStatic, RouteMain, RouteTabUser, ShadowStyle} from '@constants';
import {FontSize, scaler} from '@themes';
import React from 'react';
import {useStyles} from 'react-native-unistyles';

import { useNavigation } from '@react-navigation/native';
import { TAppNavigation } from '@types';
import { stylesheet } from './message.style';
import { BoxMessage } from './BoxMessage';

export const MessageTab = () => {
    const {styles} = useStyles(stylesheet);
    const navigation = useNavigation<TAppNavigation<RouteTabUser.MessageTab>>();
  
    const handleNavigate = () => {
      navigation.navigate(RouteMain.MessageChat); // Điều hướng đến màn hình chat chi tiết
    }
  
    return (
      <Box flex={1}>
        <HeaderApp
          title="Message"
          IconRight={<Icons.Search color={ColorsStatic.black} size={24} />}
        />
        <TouchableApp
          onPress={handleNavigate}
          activeOpacity={1}
          style={[styles.accountButton, ShadowStyle]}>
          <Box style={styles.avatar}>
            <AvatarUser size={50} />
          </Box>
          <Box ml={scaler(15)} style={{flex: 0.85}}>
            <TextApp weight={800} size={FontSize.Font14}>
              Support in finding a room
            </TextApp>
          </Box>
          <Absolute top={0} right={0}>
            <Row
              color={ColorsStatic.orange4}
              ph={scaler(10)}
              pv={scaler(2)}
              borderTopRightRadius={scaler(15)}
              borderBottomLeftRadius={scaler(10)}>
              <Icons.Shield size={18} color={ColorsStatic.white} />
              <TextApp
                weight={800}
                size={FontSize.Font11}
                pl={scaler(5)}
                color={ColorsStatic.white}>
                Admin
              </TextApp>
            </Row>
          </Absolute>
        </TouchableApp>
        <BoxMessage onPress={handleNavigate} item={null} />
      </Box>
    );
  };
