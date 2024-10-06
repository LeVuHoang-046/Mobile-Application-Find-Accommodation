import { TouchableApp } from '@component/forms';
import { Box, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic, HEIGHT_ITEM_PICKER, ItemPickerAll } from '@constants';
import { scaler } from '@themes';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ButtonPickerProps } from './BottomSheetPickerMultilineApp.type';
import React from 'react';

export const ButtonMultilinePicker: React.FC<ButtonPickerProps> = ({
  item,
  onPress,
  listSelected,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const isItemAll = item?.label === ItemPickerAll;
  const selected = 
    (!!listSelected &&
      listSelected?.some(selected => selected.label === item.label)) ||
    (isItemAll && listSelected?.length === 0);

  return (
    <TouchableApp
      onPress={() => onPress?.(item)}
      style={[
        styles.buttonPicker,
        { borderColor: selected ? theme.colors.orange3 : theme.colors.gray1 },
      ]}
    >
      <Row columnGap={scaler(10)}>
        {item.icon && (
           item?.icon({ size: 16, color: ColorsStatic.orange3})
        )}
      {item.label && (
        <TextApp weight={isItemAll ? 600 : 600}>{item?.label}</TextApp>
      )}
      </Row>
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
    width: scaler(165),
    borderWidth: scaler(1.5),
    borderRadius: scaler(7),
    paddingVertical: scaler(7),
    
    columnGap: scaler(8),
  },
}));
