import { StyleSheet } from 'react-native';
import { ButtonPickerProps } from './BottomSheetPickerType.type';
import { Box } from '@component/layout';
import { TouchableApp } from '@component/forms';
import { FontSize, scaler } from '@themes';
import { TextApp } from '@component/typography';
import { ColorsStatic, HEIGHT_ITEM_PICKER } from '@constants';

export const ButtonPicker: React.FC<ButtonPickerProps> = ({
  item,
  onPress,
  value,
  style,
  isHaveTitle = false,
}) => {
  const selected = !!value && value?.label === item?.label;

  return (
    <Box pl={isHaveTitle && !item.isTitle ? scaler(20) : 0}>
      <TouchableApp
        disabled={!!item?.isTitle}
        onPress={() => onPress?.(item)}
        style={[
          styles.buttonPicker,
          selected && styles.selectedButton, 
          style,
        ]}
      >
        <Box flex={1}>
          <TextApp
            textAlign="center"
            size={FontSize.Font14}
            weight={item?.isTitle ? 700 : 600}
            color={selected ? ColorsStatic.orange5 : ColorsStatic.text}
          >
            {item?.label}
          </TextApp>
        </Box>
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
    backgroundColor: ColorsStatic.gray4,
    paddingVertical: scaler(4),
    columnGap: scaler(8),
    marginBottom: scaler(10),
    borderRadius: scaler(15),
  },
  selectedButton: {
    backgroundColor: ColorsStatic.orange4, 
  },
});
