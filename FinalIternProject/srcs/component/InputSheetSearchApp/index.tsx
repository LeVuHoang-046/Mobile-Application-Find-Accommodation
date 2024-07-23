import { Icons } from '@assets';
import { Box, BoxAnimatedFade, IconButton, Row } from '@component';
import { ColorsStatic } from '@constants';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import { FontSize, scaler } from '@themes';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';


type InputSheetSearchAppProps = {
  onSearch?: (text: string) => void;
};

export const InputSheetSearchApp: React.FC<InputSheetSearchAppProps> = ({
  onSearch,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [text, onChangeText] = useState<string>('');

  const showBtnDelete = isFocus && !!text?.length;

  const ColorStatusInput = useMemo(() => {
    if (isFocus) {
      return ColorsStatic.blue1;
    }
    if (!text || text?.length > 0) {
      return ColorsStatic.gray2;
    }
    return ColorsStatic.gray1;
  }, [isFocus, text]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch?.(text);
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [text]);

  return (
    <Row
      height={scaler(30)}
      color={isFocus ? `${ColorsStatic.blue1}10` : ColorsStatic.gray6}
      borderRadius={scaler(5)}
      borderColor={isFocus ? ColorsStatic.blue1 : ColorsStatic.gray4}
      borderWidth={1}
      ph={scaler(10)}>
      <Box flex={1}>
        <BottomSheetTextInput
          placeholder={'Tìm kiếm'}
          style={styles.input}
          onFocus={_ => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          placeholderTextColor={ColorsStatic.gray1}
          value={text}
          onChangeText={onChangeText}
        />
      </Box>
      {!!showBtnDelete ? (
        <BoxAnimatedFade>
          <IconButton
            onPress={() => onChangeText('')}
            IconElement={
              <Icons.CircleX color={ColorStatusInput} size={12} />
            }
          />
        </BoxAnimatedFade>
      ) : null}
      <Icons.Search color={ColorStatusInput} />
    </Row>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
    fontSize: FontSize.Font12,
    fontWeight: '600',
    paddingLeft: 12,
    color: ColorsStatic.gray2,
    fontFamily: 'Mulish-SemiBold',
    paddingVertical: 0,
  },
});
