import {Icons} from '@assets';
import {TouchableApp} from '@component/forms';
import {Box, Row} from '@component/layout';
import {TextApp} from '@component/typography';
import {scaler, shadow} from '@themes';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {HeaderSheetCalenderPickerProps} from './BottomSheetCalenderPicker.type';

export const HeaderSheetCalenderPicker: React.FC<
  HeaderSheetCalenderPickerProps
> = ({title, onPressClose, onPressConfirm, disabled}) => {
  const {
    styles,
    theme: {colors},
  } = useStyles(stylesheet);
  return (
    <Row
      justify="space-between"
      style={shadow.primary}
      color={colors.white}
      ph={scaler(10)}>
      <Box flex={1} align="flex-start">
        <TouchableApp style={styles.button(false)} onPress={onPressClose}>
          <Icons.X_Mark />
        </TouchableApp>
      </Box>
      <Box flex={2}>
        <TextApp textAlign="center">{title}</TextApp>
      </Box>
      <Box flex={1} align="flex-end">
        <TouchableApp
          style={styles.button(disabled)}
          onPress={onPressConfirm}
          disabled={disabled}>
          <TextApp weight={600} color={colors.tint}>
            Xác nhận
          </TextApp>
        </TouchableApp>
      </Box>
    </Row>
  );
};

const stylesheet = createStyleSheet({
  button: disabled => ({
    padding: scaler(12),
    opacity: disabled ? 0.3 : 1,
  }),
});
