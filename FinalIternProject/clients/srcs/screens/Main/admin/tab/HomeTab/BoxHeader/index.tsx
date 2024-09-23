import {AvatarUser, Box, Row, TextApp} from '@component';
import {ColorsStatic} from '@constants';
import {FontSize, scaler} from '@themes';

export const BoxHeader = () => {
  return (
    <Box
      height={scaler(200)}
      color={ColorsStatic.blue4}
      borderBottomLeftRadius={scaler(35)}
      borderBottomRightRadius={scaler(35)}>
      <TextApp
        pt={scaler(10)}
        textAlign="center"
        color={ColorsStatic.white}
        size={FontSize.Font18}
        weight={800}>
        DashBoard
      </TextApp>
      <Row justify="space-between" ph={scaler(15)} mt={scaler(20)}>
        <Box rowGap={scaler(8)}>
          <TextApp weight={600} size={FontSize.Font14} color={ColorsStatic.white}>
            Welcome back!
          </TextApp>
          <TextApp weight={700} size={FontSize.Font18} color={ColorsStatic.white}>
            Le Vu Hoang
          </TextApp>
        </Box>
        <Box>
          <AvatarUser size={scaler(50)}/>
        </Box>
      </Row>
    </Box>
  );
};
