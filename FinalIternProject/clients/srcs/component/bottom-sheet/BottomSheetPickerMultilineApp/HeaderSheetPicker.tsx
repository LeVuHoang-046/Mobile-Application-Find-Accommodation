import { Icons } from '@assets';
import { TouchableApp } from '@component/forms';
import { Box, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic } from '@constants';
import { FontSize, scaler, shadow } from '@themes';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { HeaderSheetPickerMultilineProps } from './BottomSheetPickerMultilineApp.type';

export const HeaderSheetPicker: React.FC<HeaderSheetPickerMultilineProps> = ({
  title,
  onPressClose,
  onPressConfirm,
}) => {
  const {styles, theme} = useStyles(stylesheet);
  return (
    <Row
      justify="space-between"
      style={shadow.primary}
      color={ColorsStatic.white}
      ph={scaler(8)}>
      <Box flex={1} align="flex-start">
        <TouchableApp style={styles.button} onPress={onPressClose}>
          <Icons.X_Mark />
        </TouchableApp>
      </Box>
      <Box flex={2}>
        <TextApp textAlign="center" size={FontSize.Font15} weight={700}>
          {title}
        </TextApp>
      </Box>
      <Box flex={1} align="flex-end">
        <TouchableApp style={styles.button} onPress={onPressConfirm}>
          <TextApp weight={600} color={theme.colors.tint}>
            Confirm
          </TextApp>
        </TouchableApp>
      </Box>
    </Row>
  );
};

const stylesheet = createStyleSheet({
  button: {
    padding: scaler(12),
  },
});
