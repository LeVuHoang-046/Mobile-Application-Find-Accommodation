import { Icons } from '@assets';
import {toast, Toast} from '@backpackapp-io/react-native-toast';
import { TouchableApp } from '@component/forms';
import { Box } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic, ETypeToastCustom } from '@constants';
import { scaler } from '@themes';
import React, {memo, useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useStyles} from 'react-native-unistyles';


type ToastCustomProps = {
  toastProps: Toast;
  type: ETypeToastCustom;
};

export const ToastCustom: React.NamedExoticComponent<ToastCustomProps> = memo(
  ({toastProps, type}) => {
    const {
      styles,
      theme: {colors},
    } = useStyles(stylesheet);
    const BgColor = useMemo(() => {
      switch (type) {
        case ETypeToastCustom.Error:
          return ColorsStatic.red3;
        case ETypeToastCustom.Success:
          return colors.green8;
        default:
          return colors.tint;
      }
    }, [type]);

    const handlePress = () => {
      toast.remove(toastProps.id);
    };

    return (
      <TouchableApp
        activeOpacity={1}
        onPress={handlePress}
        style={[
          {
            backgroundColor: BgColor,
            width: toastProps.width,
          },
          styles.button,
        ]}>
        <Box>
          {type === ETypeToastCustom.Loading ? (
            <ActivityIndicator color={ColorsStatic.white} />
          ) : (
            <Icons.Wardrobe color={ColorsStatic.white} />
          )}
        </Box>
        <Box flex={1}>
          <TextApp color={ColorsStatic.white} weight={500}>
            {toastProps?.message as string}
          </TextApp>
        </Box>
      </TouchableApp>
    );
  },
);

const stylesheet = StyleSheet.create({
  button: {
    borderRadius: scaler(5),
    columnGap: scaler(12),
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
});
