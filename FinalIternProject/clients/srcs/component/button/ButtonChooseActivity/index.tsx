
import { TouchableApp } from '@component/forms';
import { Box, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import {ColorsStatic} from '@constants';
import {FontSize, scaler} from '@themes';
import {StyleSheet} from 'react-native';

export type ButtonChooseActivityProps = {
  title?: string;
  iconLeft?: React.ElementType;
  sizeIcon?: number;
  onPress?: () => void;
};

export const ButtonChooseActivity: React.FC<ButtonChooseActivityProps> = ({
  title,
  iconLeft: IconLeft,
  sizeIcon = 30,
  onPress
}) => {
  return (
    <Box ph={scaler(15)} pt={scaler(15)}>
      <TouchableApp onPress={onPress} style={styles.touchBox}>
        <Row>
          {IconLeft && <IconLeft size={sizeIcon} />}
          <TextApp pl={scaler(10)} size={FontSize.Font16} weight={700}>{title}</TextApp>
        </Row>
      </TouchableApp>
    </Box>
  );
};

const styles = StyleSheet.create({
  touchBox: {
    backgroundColor: ColorsStatic.white,
    paddingVertical: scaler(25),
    paddingHorizontal:scaler(20),
    borderRadius: scaler(8),
  },
});
