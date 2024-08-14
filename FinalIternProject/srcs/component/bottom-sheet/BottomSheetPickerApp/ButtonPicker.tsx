import { Icons } from '@assets';
import { TouchableApp } from '@component/forms';
import { Box } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic, HEIGHT_ITEM_PICKER } from '@constants';
import { scaler } from '@themes';
import { StyleSheet } from 'react-native';
import { ButtonPickerProps } from './BottomSheetPickerApp.type';

export const ButtonPicker: React.FC<ButtonPickerProps> = ({
  item,
  onPress,
  value,
  style,
  isHaveTitle = false,
}) => {
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
        <Icons.Check
          color={ColorsStatic.tint}
          opacity={selected ? 1 : 0}
        />
      </TouchableApp>
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: HEIGHT_ITEM_PICKER,
    backgroundColor: ColorsStatic.white,
    paddingVertical: scaler(4),
    columnGap: scaler(8),
  },
});
