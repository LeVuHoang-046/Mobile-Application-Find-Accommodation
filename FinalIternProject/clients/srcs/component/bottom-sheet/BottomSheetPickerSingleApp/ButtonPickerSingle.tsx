import {createStyleSheet, useStyles} from 'react-native-unistyles';
import { ButtonPickerSingleProps } from './BottomSheetPickerSingleApp.type';
import { Box } from '@component/layout';
import { TouchableApp } from '@component/forms';
import { TextApp } from '@component/typography';
import { Icons } from '@assets';
import { scaler } from '@themes';
import { HEIGHT_ITEM_PICKER } from '@constants';


export const ButtonPickerSingle: React.FC<ButtonPickerSingleProps> = ({
  item,
  onPress,
  value,
  style,
  isHaveTitle = false,
}) => {
  const {styles, theme} = useStyles(stylesheet);
  const selected = !!value && value?.value === item?.value;
  return (
    <TouchableApp
    onPress={() => onPress?.(item)}
    style={[
      styles.buttonPicker,
      { borderColor: selected ? theme.colors.orange3 : theme.colors.gray1 },
    ]}
  >
    <Box>
      <TextApp weight={600}>{item?.label}</TextApp>
    </Box>
  </TouchableApp>
  );
};

const stylesheet = createStyleSheet(theme => ({
    buttonPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: HEIGHT_ITEM_PICKER,
        backgroundColor: theme.colors.white,
        width: scaler(110),
        borderWidth: scaler(1.5),
        borderRadius: scaler(7),
        paddingVertical: scaler(4),
        columnGap: scaler(8),
      },
}));
