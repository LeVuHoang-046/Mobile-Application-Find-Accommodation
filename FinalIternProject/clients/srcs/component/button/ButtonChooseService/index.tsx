import {TouchableApp} from '@component/forms';
import {Box} from '@component/layout';
import {ImageApp} from '@component/media';
import {TextApp} from '@component/typography';
import {ColorsStatic, ShadowStyle} from '@constants';
import {FontSize, scaler} from '@themes';
import {ImageRequireSource, StyleSheet} from 'react-native';

export type ButtonChooseServiceProps = {
  image: ImageRequireSource;
  title: string;
  onPress?: () => void;
};

export const ButtonChooseService: React.FC<ButtonChooseServiceProps> = ({
  image,
  title,
  onPress
}) => {
  return (
    <>
      <TouchableApp onPress={onPress} style={[styles.button, ShadowStyle]}>
        <Box height={scaler(100)} width={scaler(130)}>
          <ImageApp source={image} style={styles.image} resizeMode="stretch" />
        </Box>
        <TextApp textAlign="center" weight={700} size={FontSize.Font14}>
          {title}
        </TextApp>
      </TouchableApp>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    rowGap: scaler(10),
    borderRadius: scaler(10),
    backgroundColor: ColorsStatic.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: scaler(180),
    height: scaler(150),
  },
});
