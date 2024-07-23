import { Icons } from '@assets';
import { Center, TextApp } from '@component';
import { FontSize } from '@themes';
import React from 'react';
import {ColorValue} from 'react-native';
import {useStyles} from 'react-native-unistyles';


type EmptyDataProps = {
  color?: ColorValue;
};

export const EmptyData: React.FC<EmptyDataProps> = ({color}) => {
  const {
    theme: {colors},
  } = useStyles();
  return (
    <Center flex={1} color={color || colors.background}>
      <Icons.Empty />
      <TextApp color={colors.gray3} size={FontSize.Font12} weight={400}>
        No Information
      </TextApp>
    </Center>
  );
};
