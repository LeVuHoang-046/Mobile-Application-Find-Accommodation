import {StyleSheet} from 'react-native';
import {ButtonPickerProps} from './BottomSheetPickerApp.type';
import { ColorsStatic, HEIGHT_ITEM_PICKER } from '@constants';
import { Icons } from '@assets';
import { TouchableApp } from '@component/forms';
import { TextApp } from '@component/typography';

export const ButtonPicker: React.FC<ButtonPickerProps> = ({
  item,
  onPress,
  value,
  style,
}) => {
  const selected = !!value && value?.value === item?.value;
  return (
    <TouchableApp
      onPress={() => onPress?.(item)}
      style={[styles.buttonPicker, style]}>
      <TextApp weight={400}>{item?.label}</TextApp>
      {selected ? <Icons.Check color={ColorsStatic.tint} /> : null}
    </TouchableApp>
  );
};

const styles = StyleSheet.create({
  buttonPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT_ITEM_PICKER,
    backgroundColor: ColorsStatic.white,
  },
});
