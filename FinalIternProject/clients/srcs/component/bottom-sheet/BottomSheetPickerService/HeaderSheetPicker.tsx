import {memo} from 'react';
import {StyleSheet} from 'react-native';
import { HeaderSheetPickerServiceProps } from './BottomSheetPickerService.type';
import { Box, Row } from '@component/layout';
import { FontSize, scaler, shadow } from '@themes';
import { ColorsStatic } from '@constants';
import { TouchableApp } from '@component/forms';
import { Icons } from '@assets';
import { TextApp } from '@component/typography';
import { InputSheetSearchApp } from '@component/InputSheetSearchApp';


export const HeaderSheetPicker: React.NamedExoticComponent<HeaderSheetPickerServiceProps> =
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
