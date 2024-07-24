import {StyleSheet} from 'react-native';
import {HeaderSheetPickerProps} from './BottomSheetPickerApp.type';
import { scaler, shadow } from '@themes';
import { ColorsStatic } from '@constants';
import { Icons } from '@assets';
import { Box, Row } from '@component/layout';
import { TouchableApp } from '@component/forms';
import { TextApp } from '@component/typography';
import { InputSheetSearchApp } from '@component/InputSheetSearchApp';

export const HeaderSheetPicker: React.FC<HeaderSheetPickerProps> = ({
  title,
  onPress,
  onSearch,
}) => {
  return (
    <Box style={shadow.primary} color={ColorsStatic.white}>
      <Row justify="space-between" ph={scaler(10)}>
        <TouchableApp style={styles.buttonClose} onPress={onPress}>
          <Icons.X_Mark />
        </TouchableApp>
        <Box flex={6}>
          <TextApp textAlign="center">{title}</TextApp>
        </Box>
        <Box flex={1} />
      </Row>
      {!!onSearch ? (
        <Box ph={scaler(10)} pb={scaler(16)}>
          <InputSheetSearchApp onSearch={onSearch} />
        </Box>
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonClose: {
    flex: 1,
    paddingVertical: scaler(12),
  },
});
