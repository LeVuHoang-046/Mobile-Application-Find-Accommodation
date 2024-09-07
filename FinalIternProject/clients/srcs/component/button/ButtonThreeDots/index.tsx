import { Icons } from '@assets';
import { TouchableApp } from '@component/forms';
import { Row } from '@component/layout';
import { Circle } from '@component/layout/Circle';
import { scaler } from '@themes';
import {StyleProp, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';


type ButtonThreeDots = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const ButtonThreeDots: React.FC<ButtonThreeDots> = ({
  onPress,
  style,
}) => {
  const {
    styles,
    theme: {colors},
  } = useStyles(stylesheet);
  return (
    <TouchableApp style={[styles.container, style]} onPress={onPress}>
      {/* <Row
        color={`${colors.tint}1a`}
        p={scaler(5)}
        columnGap={scaler(3)}
        borderRadius={scaler(3)}>
        <Circle color={colors.tint} />
        <Circle color={colors.tint} />
        <Circle color={colors.tint} />
      </Row> */}
      <Icons.ThreeDots/>
    </TouchableApp>
  );
};

const stylesheet = createStyleSheet(_ => ({
  container: {
    padding: scaler(3),
   
  },
}));
