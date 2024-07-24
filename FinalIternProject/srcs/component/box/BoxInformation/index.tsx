import {Icons, Images} from '@assets';
import {Box, Row} from '@component/layout';
import {ImageApp} from '@component/media';
import {TextApp} from '@component/typography';
import {ColorsStatic} from '@constants';
import {FontSize, scaler} from '@themes';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type BoxInformationProps = {
  img?: string;
  tilte?: string;
  price?: number;
  location?: string;
  district?: string;
  buildingName?: string;
  area?: number;
  numberPeople?: number;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  stylePrice?: StyleProp<TextStyle>;
  styleOther?: StyleProp<TextStyle>;
};

export const BoxInformation: React.FC<BoxInformationProps> = ({
  img,
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
}) => {
  const {styles,theme} = useStyles(stylesheet);

  return (
      <Row 
      columnGap={scaler(15)} 
      p={scaler(5)}
      style={style}>
        <Box height={scaler(120)} width={scaler(100)}>
          <ImageApp source={Images.nhaTro} style={styles.image} />
        </Box>
        <Box rowGap={scaler(3)} flex={1}>
          <TextApp style={styles.titleText} size={FontSize.Font14} weight={700}>
            Khai truong toa nha moi King Kong. Full do noi that
          </TextApp>
          <TextApp
            size={FontSize.Font14}
            color={ColorsStatic.red2}
            weight={700}>
            Tu 1.500.000d/thang
          </TextApp>
          <Row>
            <Icons.LocationHome size={12} color={ColorsStatic.red1} />
            <TextApp style={styles.textOther}>
              Phuong kim ma, Quan Ba dinh, Ha Noi
            </TextApp>
          </Row>
          <Row>
            <Icons.District size={12} />
            <TextApp style={styles.textOther}>Quan Dong Da</TextApp>
          </Row>
          <Row>
            <Icons.Tower size={14} />
            <TextApp style={styles.textOther}>Ten toa nha: CHH 10</TextApp>
          </Row>
          <Row>
            <Icons.Area size={11} />
            <TextApp style={styles.textOther} pr={scaler(12)}>
              6m2
            </TextApp>
            <Icons.UserGroup size={11} />
            <TextApp style={styles.textOther}>1</TextApp>
          </Row>
        </Box>
      </Row>
    // </Box>
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
