import {Icons, Images} from '@assets';
import {Absolute, Box, Row} from '@component/layout';
import {ImageApp} from '@component/media';
import {TextApp} from '@component/typography';
import {ColorsStatic} from '@constants';
import {FontSize, scaler} from '@themes';
import {ImageProps, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type BoxInformationProps = {
  source?: StyleProp<ImageProps>;
  tilte?: string;
  price?: string;
  location?: string;
  district?: string;
  buildingName?: string;
  area?: string;
  numberPeople?: string;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  stylePrice?: StyleProp<TextStyle>;
  styleOther?: StyleProp<TextStyle>;
  isLiked?: boolean;
};

export const BoxInformation: React.FC<BoxInformationProps> = ({
  source = Images.nhaTro,
  tilte,
  price,
  location,
  district,
  buildingName,
  area,
  numberPeople,
  style,
  styleTitle,
  stylePrice,
  styleOther,
  isLiked = false,
}) => {
  const {styles, theme} = useStyles(stylesheet);

  return (
    <Row columnGap={scaler(15)} style={style}>
      <Box height={scaler(120)} width={scaler(100)}>
        <ImageApp source={source} style={styles.image} />
      </Box>
      <Box rowGap={scaler(3)} flex={1}>
        <TextApp
          style={[styles.titleText, styleTitle]}
          size={FontSize.Font14}
          weight={700}>
          {tilte}
        </TextApp>
        <TextApp
          size={FontSize.Font14}
          color={ColorsStatic.red2}
          style={stylePrice}
          weight={700}>
          {price}
        </TextApp>
        <Row>
          <Icons.LocationHome size={12} color={ColorsStatic.red1} />
          <TextApp
            style={[styles.textOther, styleOther]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {location}
          </TextApp>
        </Row>
        <Row>
          <Icons.District size={12} />
          <TextApp style={[styles.textOther, styleOther]}>{district}</TextApp>
        </Row>
        {buildingName && (
          <Row>
            <Icons.Tower size={14} />
            <TextApp style={[styles.textOther, styleOther]}>
              {buildingName}
            </TextApp>
          </Row>
        )}
        <Row>
          {area && (
            <>
              <Icons.Area size={11} />
              <TextApp style={[styles.textOther, styleOther]} pr={scaler(12)}>
                {area}
              </TextApp>
            </>
          )}
          {numberPeople && (
            <>
              <Icons.UserGroup size={11} />
              <TextApp style={[styles.textOther, styleOther]}>
                {numberPeople}
              </TextApp>
            </>
          )}
        </Row>

        {isLiked ? (
          <Absolute bottom={5} right={5}>
            <Icons.Heart size={20} color={ColorsStatic.red2} />
          </Absolute>
        ) : null}
      </Box>
    </Row>
  );
};

const stylesheet = createStyleSheet(() => ({
  image: {
    height: '100%',
    width: '100%',
    borderRadius: scaler(5),
  },
  titleText: {
    textTransform: 'uppercase',
  },
  textOther: {
    paddingLeft: scaler(5),
  },
}));
