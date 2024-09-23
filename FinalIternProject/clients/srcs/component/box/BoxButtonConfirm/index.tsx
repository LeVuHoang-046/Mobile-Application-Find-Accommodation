import { TouchableApp } from '@component/forms';
import { Box } from '@component/layout';
import { TextApp } from '@component/typography';
import { scaler, shadow } from '@themes';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import { stylesheet } from './BoxButtonConfirm.style';


interface BoxButtonConfirmProps {
  onPress: () => void;
  isFormValid: boolean;
  title?: string;
}

export const BoxButtonConfirm: React.FC<BoxButtonConfirmProps> = ({
  onPress,
  isFormValid,
  title = 'Xác nhận',
}) => {
  const inset = useSafeAreaInsets();
  const {styles, theme} = useStyles(stylesheet);

  return (
    <Box mb={scaler(20)} color={theme.colors.white} style={shadow.upto}>
      <TouchableApp
        onPress={onPress}
        style={styles.buttonSubmit(inset.bottom, isFormValid)}
        disabled={!isFormValid}>
        <TextApp
          weight={600}
          color={isFormValid ? theme.colors.white : theme.colors.text}>
          {title}
        </TextApp>
      </TouchableApp>
    </Box>
  );
};
