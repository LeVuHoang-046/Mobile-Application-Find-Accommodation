import { Icons } from '@assets';
import { TouchableApp } from '@component/forms';
import { Box, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic } from '@constants';
import { FontSize, scaler, shadow } from '@themes';
import React from 'react';
import {StyleSheet} from 'react-native';


type HeaderCalenderPickerProps = {
  title?: string;
  onPress?: () => void;
};

export const HeaderCalenderPicker: React.FC<HeaderCalenderPickerProps> = ({
  title,
  onPress,
}) => {
  return (
    <Box style={shadow.primary} color={ColorsStatic.white}>
      <Row justify="space-between" ph={scaler(10)}>
        <TouchableApp style={styles.buttonClose} onPress={onPress}>
          <Icons.X_Mark />
        </TouchableApp>
        <Box flex={6}>
          <TextApp size={FontSize.Font14} weight={700} textAlign="center">{title}</TextApp>
        </Box>
        <Box flex={1} />
      </Row>
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonClose: {
    flex: 1,
    paddingVertical: scaler(12),
  },
});
