import { Center } from '@component';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useStyles} from 'react-native-unistyles';

export const LoadingComponent = () => {
  const {theme} = useStyles();
  return (
    <Center flex={1}>
      <ActivityIndicator color={theme.colors.tint} />
    </Center>
  );
};
