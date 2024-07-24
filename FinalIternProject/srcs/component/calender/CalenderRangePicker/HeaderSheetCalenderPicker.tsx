import {StyleSheet} from 'react-native';
import {HeaderSheetCalenderPickerProps} from './BottomSheetCalenderPicker.type';
import { Box, Row } from '@component/layout';
import { scaler, shadow } from '@themes';
import { ColorsStatic } from '@constants';
import { TouchableApp } from '@component/forms';
import { Icons } from '@assets';
import { TextApp } from '@component/typography';

export const HeaderSheetCalenderPicker: React.FC<
  HeaderSheetCalenderPickerProps
> = ({title, onPressClose, onPressConfirm}) => {
  return (
    <Row
      justify="space-between"
      style={shadow.primary}
      color={ColorsStatic.white}
      ph={scaler(10)}>
      <Box flex={1} align="flex-start">
        <TouchableApp style={styles.button} onPress={onPressClose}>
          <Icons.X_Mark />
        </TouchableApp>
      </Box>
      <Box flex={2}>
        <TextApp textAlign="center">{title}</TextApp>
      </Box>
      <Box flex={1} align="flex-end">
        <TouchableApp style={styles.button} onPress={onPressConfirm}>
          <TextApp weight={600} color={ColorsStatic.tint}>
            Xác nhận
          </TextApp>
        </TouchableApp>
      </Box>
    </Row>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: scaler(12),
  },
});
