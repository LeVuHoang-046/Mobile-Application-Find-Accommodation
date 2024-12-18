import {Icons} from '@assets';
import {Absolute, Box, Row, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteMain, RouteTabUser} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {FontSize, scaler, shadow} from '@themes';
import {TAppNavigation} from '@types';
import React, {memo, useRef} from 'react';
import {ScrollView} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {stylesheet} from '../../index.style';
import {ModalDetail, ModalDetailHeaderBoard} from '../ModalDetail';

type OptionItem = {
  icon: string;
  text: string;
  action: () => void;
};

type BoxHeaderBoardProps = {
  onPress: (item: any) => void;
};

export const BoxHeaderBoard: React.NamedExoticComponent<BoxHeaderBoardProps> =
  memo(({onPress}) => {
    const {styles} = useStyles(stylesheet);

    const modalDetailRef = useRef<ModalDetailHeaderBoard>(null);
    const navigation = useNavigation<TAppNavigation<RouteTabUser.HomeTab>>();

    const OptionItems: OptionItem[] = [
      {icon: 'location-sharp', text: 'Nearby rooms', action: () => navigation.navigate(RouteMain.FindRoomAroundHere)},
      {icon: 'location-sharp', text: 'Room posts', action: () => navigation.navigate(RouteMain.SearchForNews)},
      {icon: 'location-sharp', text: 'Share room post',action: () => navigation.navigate(RouteMain.SearchForNews)},
      {icon: 'location-sharp', text: 'Transport',action: () => navigation.navigate(RouteMain.DesignRoomService)},
      {icon: 'location-sharp', text: 'Gas serviece',action: () => navigation.navigate(RouteMain.DesignRoomService)},
      {icon: 'location-sharp', text: 'Water service',action: () => navigation.navigate(RouteMain.DesignRoomService)},
      {icon: 'location-sharp', text: 'Laudry',action: () => navigation.navigate(RouteMain.DesignRoomService)},
      {icon: 'location-sharp', text: 'Repair service',action: () => navigation.navigate(RouteMain.DesignRoomService)},
      {icon: 'location-sharp', text: 'Design room service',action: () => navigation.navigate(RouteMain.DesignRoomService)},
    ];
    const RenderOptionItems: React.FC<OptionItem> = ({icon, text, action}) => {
      return (
        <TouchableApp
            onPress={action}
          style={styles.OptionContainer}>
          <Box justify="center" align="center">
            <Icon
              name={icon}
              size={30}
              color={'#000'}
              style={{paddingBottom: scaler(10)}}
            />
            <TextApp size={FontSize.Font12} textAlign="center">
              {text}
            </TextApp>
          </Box>
        </TouchableApp>
      );
    };

    const handleNavigate = () => {
      navigation.navigate(RouteMain.SearchForNews);
    };

    return (
      <>
        <Absolute top={scaler(140)} left={0} right={0}>
          <Box
            mh={scaler(15)}
            height={scaler(180)}
            color={ColorsStatic.white}
            borderRadius={scaler(15)}
            style={shadow.upto}>
            <Row pt={scaler(20)} pl={scaler(15)}>
              <TouchableApp style={{zIndex: 999}} onPress={onPress}>
                <Row
                  p={scaler(8)}
                  borderRadius={scaler(10)}
                  color={ColorsStatic.blue6}>
                  <Icons.Location size={20} color={ColorsStatic.blue1} />
                  <TextApp pl={scaler(8)} size={FontSize.Font14} weight={600}>
                    Hà Nội
                  </TextApp>
                </Row>
              </TouchableApp>
              <Box flex={1} zIndex={0} left={scaler(-15)}>
                <TouchableApp
                  onPress={handleNavigate}
                  activeOpacity={1}
                  style={styles.headerSearchBar}>
                  <TextApp size={FontSize.Font14} color={ColorsStatic.gray10}>
                    Find Postings
                  </TextApp>
                </TouchableApp>
              </Box>
            </Row>

            <Box style={styles.ListOpt}>
              <ScrollView horizontal>
                <Row style={[styles.OptionItemsContainer]}>
                  {OptionItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {RenderOptionItems(item)}
                    </React.Fragment>
                  ))}
                </Row>
              </ScrollView>
            </Box>
          </Box>
          <ModalDetail ref={modalDetailRef} />
        </Absolute>
      </>
    );
  });
