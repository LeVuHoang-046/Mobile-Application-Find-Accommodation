import {Icons} from '@assets';
import {Box, Row} from '@component/layout';
import {PageScreen} from '@component/PageScreen';
import {TextApp} from '@component/typography';
import {ColorsStatic, EGender, ETypeHouses} from '@constants';
import {FontSize, scaler} from '@themes';
import {StyleProp, TextStyle} from 'react-native';
import {createStyleSheet} from 'react-native-unistyles';

export type BoxRoomDetailInformationProps = {
  typeHome?: ETypeHouses;
  gender?: EGender;
  title?: string;
  price?: string;
  location?: string;
  phoneNumber?: string;
  styleTitle?: StyleProp<TextStyle>;
  stylePrice?: StyleProp<TextStyle>;
  styleOther?: StyleProp<TextStyle>;
};

export const BoxRoomDetailInformation: React.FC<
  BoxRoomDetailInformationProps
> = ({
  typeHome,
  gender,
  title,
  price,
  location,
  phoneNumber,
  styleTitle,
  stylePrice,
  styleOther,
}) => {
  const getGenderIcon = (gender?: EGender) => {
    switch (gender) {
      case EGender.Male:
        return <Icons.GenderMale />;
      case EGender.Female:
        return <Icons.GenderFemale />;
      case EGender.MaleFemale:
        return <Icons.GenderMaleFemale />;
      default:
        return null;
    }
  };
  return (
    <Box rowGap={scaler(8)}>
      <Row columnGap={scaler(5)}>
        <Icons.Dot size={18} color={ColorsStatic.orange2} />
        <TextApp
          pr={scaler(12)}
          size={FontSize.Font13}
          weight={700}
          color={ColorsStatic.orange2}>
          {typeHome}
        </TextApp>
        {getGenderIcon(gender)}
        <TextApp weight={700} size={FontSize.Font13}>
          {gender}
        </TextApp>
      </Row>
      <TextApp  style={styleTitle} weight={700} size={FontSize.Font15}>
        {title}
      </TextApp>
      <TextApp style={stylePrice} weight={700} color={ColorsStatic.red1} size={FontSize.Font13}>
        {price}
      </TextApp>
      <Row pr={scaler(5)} columnGap={scaler(5)}>
        <Icons.Location size={18} />
        <TextApp style={styleOther} weight={600}>{location}</TextApp>
      </Row>
      <Row columnGap={scaler(5)}>
        <Icons.Phone size={16} color={ColorsStatic.blue1} />
        <TextApp style={styleOther} weight={600}>{phoneNumber}</TextApp>
      </Row>
    </Box>
  );
};


