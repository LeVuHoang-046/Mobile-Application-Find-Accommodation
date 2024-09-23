import {createStyleSheet, useStyles} from 'react-native-unistyles';
import { ButtonPickerServiceProps } from './BottomSheetPickerService.type';
import { Box } from '@component/layout';
import { scaler } from '@themes';
import { TouchableApp } from '@component/forms';
import { TextApp } from '@component/typography';
import { Icons } from '@assets';
import { HEIGHT_ITEM_PICKER } from '@constants';


export const ButtonPicker: React.FC<ButtonPickerServiceProps> = ({
  item,
  onPress,
  value,
  style,
  isHaveTitle = false,
}) => {
  const {styles, theme} = useStyles(stylesheet);
  const selected = !!value && value?.value === item?.value;
  return (
    <Box pl={isHaveTitle && !item.isTitle ? scaler(20) : 0}>
      <TouchableApp
        disabled={!!item?.isTitle}
        onPress={() => onPress?.(item)}
        style={[styles.buttonPicker, style]}>
        <Box flex={1}>
          <TextApp weight={item?.isTitle ? 700 : 400}>{item?.label}</TextApp>
        </Box>
        <Icons.Check color={theme.colors.tint} opacity={selected ? 1 : 0} />
      </TouchableApp>
    </Box>
  );
};

const stylesheet = createStyleSheet(theme => ({
  buttonPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: HEIGHT_ITEM_PICKER,
    backgroundColor: theme.colors.white,
    paddingVertical: scaler(4),
    columnGap: scaler(8),
  },
}));
