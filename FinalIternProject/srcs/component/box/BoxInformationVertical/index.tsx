import {Icons, Images} from '@assets';
import {TouchableApp} from '@component/forms';
import {Box, Row} from '@component/layout';
import {ImageApp} from '@component/media';
import {TextApp} from '@component/typography';
import {ColorsStatic, EGender, ShadowStyle} from '@constants';
import {FontSize, scaler, shadow} from '@themes';
import {ImageProps, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type BoxInformationVerticalProps = {
  source?: StyleProp<ImageProps>;
  tilte?: string;
  price?: string;
  location?: string;
  district?: string;
  buildingName?: string;
  area?: string;
  numberPeople?: string;
  time?: string;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  stylePrice?: StyleProp<TextStyle>;
  styleOther?: StyleProp<TextStyle>;
  gender?: EGender;
  isBold?: boolean;
};

export const BoxInformationVertical: React.FC<BoxInformationVerticalProps> = ({
  source = Images.nhaTro,
  tilte,
  price,
  location,
  district,
  buildingName,
  area,
  numberPeople,
  time,
  style,
  styleTitle,
  stylePrice,
  styleOther,
  gender,
  isBold = false,
}) => {
  const {styles} = useStyles(stylesheet);

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
    <Box style={[ styles.buttonContainer, style]}>
      <Box height={scaler(90)}>
        <ImageApp source={source} style={styles.image} />
      </Box>
      <Box rowGap={scaler(3)} p={scaler(5)}>
        <Row>
          <Icons.Dot color={ColorsStatic.orange2} />
          <TextApp color={ColorsStatic.orange2} weight={700}>
            {time}
          </TextApp>
        </Row>

        <TextApp
          style={styleTitle}
          weight={700}
          size={FontSize.Font13}
          numberOfLines={1}
          ellipsizeMode="tail">
          {tilte}
        </TextApp>

        <TextApp style={stylePrice} weight={700} color={ColorsStatic.red1}>
          {price}
        </TextApp>
        <Row columnGap={scaler(3)}>
          <Icons.Location size={14} />
          <TextApp
            weight={isBold ? 700 : undefined}
            style={styleOther}
            numberOfLines={1}
            ellipsizeMode="tail">
            {location}
          </TextApp>
        </Row>
        {district && (
          <Row columnGap={scaler(5)}>
            <Icons.District size={12} />
            <TextApp weight={isBold ? 700 : undefined} style={styleOther}>
              {district}
            </TextApp>
          </Row>
        )}
        {buildingName && (
          <Row columnGap={scaler(3)}>
            <Icons.Tower />
            <TextApp weight={isBold ? 700 : undefined} style={styleOther}>
              {buildingName}
            </TextApp>
          </Row>
        )}
        <Row columnGap={scaler(5)}>
          {area && (
            <>
              <Icons.Area size={11} />
              <TextApp
                weight={isBold ? 700 : undefined}
                style={styleOther}
                pr={scaler(12)}>
                {area}
              </TextApp>
            </>
          )}
          {numberPeople && (
            <>
              <Icons.UserGroup size={11} />
              <TextApp
                weight={isBold ? 700 : undefined}
                style={styleOther}
                pr={scaler(12)}>
                {numberPeople}
              </TextApp>
            </>
          )}
          {gender && (
            <>
              {getGenderIcon(gender)}
              <TextApp weight={isBold ? 700 : undefined}>{gender}</TextApp>
            </>
          )}
        </Row>
      </Box>
    </Box>
  );
};
const stylesheet = createStyleSheet(() => ({
  image: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: scaler(10),
    borderTopLeftRadius: scaler(10),
  },
  buttonContainer: {
    width: scaler(175),
    height: scaler(230),
    backgroundColor: ColorsStatic.white,
    borderRadius: scaler(10),
  },
}));
