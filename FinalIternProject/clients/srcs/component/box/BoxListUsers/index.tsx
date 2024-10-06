import { AvatarUser } from '@component/AvatarUser';
import {TouchableApp} from '@component/forms';
import { Box, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic } from '@constants';
import { FontSize, scaler } from '@themes';
import React from 'react';

export type BoxListUsersProps = {
    name?: string;
    phoneNumber?: string;
}

export const BoxListUsers: React.FC<BoxListUsersProps> = ({
    name,
    phoneNumber,
 
}) => {
  return (
      <Row
        columnGap={scaler(8)}
        p={scaler(10)}
        borderBottomColor={ColorsStatic.gray1}
        borderBottomWidth={0.5}
       >
        <AvatarUser size={50} />
        <Box rowGap={scaler(5)}>
          <TextApp weight={700} size={FontSize.Font14}>{name}</TextApp>
          <TextApp>{phoneNumber}</TextApp>
        </Box>
      </Row>
 
  );
};
