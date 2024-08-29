import {Icons, Images} from '@assets';
import {TouchableApp} from '@component/forms';
import {Box, Row} from '@component/layout';
import {ImageApp} from '@component/media';
import {TextApp} from '@component/typography';
import {ColorsStatic, ShadowStyle} from '@constants';
import {FontSize, scaler} from '@themes';
import {ImageRequireSource, StyleSheet} from 'react-native';

export type ButtonBuyServiceProps = {
  image?: ImageRequireSource;
  title: string;
  price: string;
  onPress?: () => void;
  onPressBuy?: () => void;
  onPressAdd?: () => void;
};

export const ButtonBuyService: React.FC<ButtonBuyServiceProps> = ({
  image,
  title,
  price,
  onPress,
  onPressBuy,
  onPressAdd
}) => {
  return (
    <TouchableApp onPress={onPress} style={[styles.buttonContainer, ShadowStyle]}>
      <Box
        style={styles.boxImage}
        height={scaler(120)}
        borderRadius={scaler(10)}>
        <ImageApp source={image} style={styles.image} resizeMode="stretch" />
      </Box>
      <TextApp height={scaler(40)} weight={700} size={FontSize.Font16}>
        {title}
      </TextApp>
      <TextApp
        pb={scaler(10)}
        weight={700}
        color={ColorsStatic.red2}
        size={FontSize.Font14}>
        {price}
      </TextApp>
      <Row columnGap={scaler(5)}>
        <TouchableApp onPress={onPressBuy} style={styles.buttonBuy}>
          <TextApp
            textAlign="center"
            weight={700}
            size={FontSize.Font14}
            color={ColorsStatic.white}>
            Buy now
          </TextApp>
        </TouchableApp>
        <TouchableApp onPress={onPressAdd} style={styles.addToCart}>
          <Icons.ShoppingCartPlus size={17} />
        </TouchableApp>
      </Row>
    </TouchableApp>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: scaler(180),
    backgroundColor: ColorsStatic.white,
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(8),
    rowGap: scaler(0),
    borderRadius: scaler(10),
  },
  boxImage: {
    overflow: 'hidden',
    marginBottom: scaler(10),
  },
  buttonBuy: {
    backgroundColor: ColorsStatic.red2,
    padding: scaler(8),
    borderRadius: scaler(5),
    flex: 1,
  },
  addToCart: {
    padding: scaler(8),
    borderWidth: 1,
    borderRadius: scaler(5),
  },
});