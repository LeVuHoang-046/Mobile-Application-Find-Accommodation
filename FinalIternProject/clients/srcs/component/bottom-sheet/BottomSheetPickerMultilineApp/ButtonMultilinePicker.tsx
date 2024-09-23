import { TouchableApp } from '@component/forms';
import { Box } from '@component/layout';
import { TextApp } from '@component/typography';
import { HEIGHT_ITEM_PICKER, ItemPickerAll } from '@constants';
import { FontSize, scaler } from '@themes';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ButtonPickerProps } from './BottomSheetPickerMultilineApp.type';

export const ButtonMultilinePicker: React.FC<ButtonPickerProps> = ({
  item,
  onPress,
  listSelected,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const isItemAll = item?.value === ItemPickerAll;
  const selected =
    (!!listSelected &&
      listSelected?.some(selected => selected.value === item.value)) ||
    (isItemAll && listSelected?.length === 0);

  return (
    <TouchableApp
      onPress={() => onPress?.(item)}
      style={[
        styles.buttonPicker,
        { borderColor: selected ? theme.colors.orange3 : theme.colors.gray1 },
      ]}
    >
      <Box>
        <TextApp weight={isItemAll ? 700 : 600}>{item?.label}</TextApp>
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
