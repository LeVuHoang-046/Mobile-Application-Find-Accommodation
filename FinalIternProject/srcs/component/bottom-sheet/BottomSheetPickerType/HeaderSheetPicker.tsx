import { TouchableApp } from '@component/forms';
import { Box, Row } from '@component/layout';
import { ColorsStatic } from '@constants';
import {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { HeaderSheetPickerProps } from './BottomSheetPickerType.type';
import { FontSize, scaler, shadow } from '@themes';
import { Icons } from '@assets';
import { TextApp } from '@component/typography';
import { InputSheetSearchApp } from '@component/InputSheetSearchApp';
 './BottomSheetPickerApp.type';


export const HeaderSheetPicker: React.NamedExoticComponent<HeaderSheetPickerProps> =
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
