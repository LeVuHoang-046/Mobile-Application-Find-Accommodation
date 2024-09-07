import { Images } from '@assets';
import { ImageApp } from '@component';
import { scaler } from '@themes';
import React from 'react';
import {StyleProp} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';
import {createStyleSheet, useStyles} from 'react-native-unistyles';


type AvatarUserProps = {
  size?: number;
  style?: StyleProp<ImageStyle>;
  border?: number;
};

export const AvatarUser: React.FC<AvatarUserProps> = ({
  size = 60,
  border = 2,
  style,
}) => {
  const {styles} = useStyles(stylesheet);
  return (
    <ImageApp
      source={Images.avatarDefault}
      style={[styles.avatar(size, border), style]}
    />
  );
};

const stylesheet = createStyleSheet(theme => ({
  avatar: (size, border) => ({
    width: scaler(size),
    height: scaler(size),
    borderRadius: scaler(size / 2),
    borderWidth: scaler(border),
    borderColor: theme.colors.white,
  }),
}));
