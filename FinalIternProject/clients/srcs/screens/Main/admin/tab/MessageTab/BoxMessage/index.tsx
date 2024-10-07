import {AvatarUser, Box, Row, TextApp, TouchableApp} from '@component';
import {ShadowStyle, ShadowStyle1} from '@constants';
import {FontSize, scaler} from '@themes';
import {memo} from 'react';
import {useStyles} from 'react-native-unistyles';
import { stylesheet } from '../message.style';


type BoxMessageProps = {
  item: any;
  onPress?: () => void;
};

export const BoxMessage: React.NamedExoticComponent<BoxMessageProps> = memo(
  ({item, onPress}) => {
    const {styles} = useStyles(stylesheet);
    return (
      <TouchableApp
        onPress={onPress}
        activeOpacity={1}
        style={[styles.accountButton, ShadowStyle]}>
        <Box style={styles.avatar}>
          <AvatarUser size={50} />
        </Box>
        <Box ml={scaler(15)} style={{flex: 0.85}} rowGap={scaler(10)}>
          <Row justify="space-between">
            <TextApp weight={800} size={FontSize.Font14}>
              GOHOMY
            </TextApp>
            <TextApp pr={scaler(10)}>03-08-2024</TextApp>
          </Row>
          <TextApp numberOfLines={1} ellipsizeMode="tail">
            chào bạn, bạn đang quan tâm phòng bên mình ạ
          </TextApp>
        </Box>
      </TouchableApp>
    );
  },
);
