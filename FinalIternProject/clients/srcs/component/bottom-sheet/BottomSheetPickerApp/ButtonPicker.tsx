import {TouchableApp} from '@component/forms';
import {Box} from '@component/layout';
import {TextApp} from '@component/typography';
import {HEIGHT_ITEM_PICKER} from '@constants';
import {FontSize, scaler} from '@themes';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {ButtonPickerProps} from './BottomSheetPickerApp.type';
import { LineApp } from '@component/LineApp';

export const ButtonPicker: React.FC<ButtonPickerProps> = ({
  item,
  onPress,
  value,
  style,
  isHaveTitle = false,
  isLastItem = false,
}) => {
  const {styles} = useStyles(stylesheet);
  const selected = !!value && value?.value === item?.value;

  return (
    <>
    <TouchableApp
      disabled={!!item?.isTitle}
      onPress={() => onPress?.(item)}
      style={[styles.buttonPicker, style]}>
      <Box p={scaler(10)} flex={1}>
        <TextApp size={FontSize.Font13} weight={item?.isTitle ? 700 : 600}>
          {item?.label}
        </TextApp>
      </Box>
      <Box style={styles.circle(selected)}>
        {selected && <Box style={styles.tick} />}
      </Box>
    </TouchableApp>
    {!isLastItem && <LineApp space={0} />}
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  buttonPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: HEIGHT_ITEM_PICKER,
    backgroundColor: theme.colors.white,
    columnGap: scaler(8),
  },
  circle: (isActive: boolean) => ({
    width: scaler(20),
    height: scaler(20),
    borderRadius: scaler(10),
    borderWidth: scaler(2),
    borderColor: isActive ? theme.colors.tint : theme.colors.gray2,
    backgroundColor: isActive ? theme.colors.white : undefined,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  tick: {
    width: scaler(10),
    height: scaler(10),
    backgroundColor: theme.colors.tint,
    borderRadius: scaler(5),
  },
}));
