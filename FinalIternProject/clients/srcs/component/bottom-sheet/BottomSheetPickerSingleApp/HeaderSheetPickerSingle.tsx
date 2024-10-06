import { Icons } from '@assets';
import { TouchableApp } from '@component/forms';
import { InputSheetSearchApp } from '@component/InputSheetSearchApp';
import { Box, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic } from '@constants';
import { FontSize, scaler, shadow } from '@themes';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { HeaderSheetPickerSingleProps } from './BottomSheetPickerSingleApp.type';

export const HeaderSheetPickerSingle: React.NamedExoticComponent<HeaderSheetPickerSingleProps> =
  memo(({title, onPress, onSearch, searchLocal}) => {
    return (
      <Box style={shadow.primary} color={ColorsStatic.white}>
        <Row justify="space-between" ph={scaler(20)}>
          <TouchableApp style={styles.buttonClose} onPress={onPress}>
            <Icons.X_Mark />
          </TouchableApp>
          <Box flex={6}>
            <TextApp textAlign="center" size={FontSize.Font15} weight={700}>
              {title}
            </TextApp>
          </Box>
          <Box flex={1} />
        </Row>
        {searchLocal ? (
          <Box ph={scaler(10)} pb={scaler(16)}>
            <InputSheetSearchApp onSearch={onSearch} />
          </Box>
        ) : null}
      </Box>
    );
  });

const styles = StyleSheet.create({
  buttonClose: {
    flex: 1,
    paddingVertical: scaler(12),
  },
});
