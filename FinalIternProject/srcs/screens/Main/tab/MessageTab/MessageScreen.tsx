import {Icons} from '@assets';
import {Box, HeaderApp} from '@component';
import {ColorsStatic} from '@constants';
import React from 'react';

export const MessageScreen = () => {
  return (
    <Box flex={1}>
      <HeaderApp
        title="Message"
        IconRight={<Icons.Search color={ColorsStatic.black} size={24} />}
      />
      
    </Box>
  );
};
