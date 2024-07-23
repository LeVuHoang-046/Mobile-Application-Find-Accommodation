import React, {useMemo, useState} from 'react';
import {useController} from 'react-hook-form';
import {TextInput} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {EVariantInput} from '../forms.enum';
import {IconButton} from '../IconButton';
import {Box, BoxAnimatedFade, InputAppProps, Row} from '@component';
import {scaler} from '@themes';
import {Icons} from '@assets';
import {stylesheetInputApp} from './inputApp.style';

export const InputApp: React.FC<InputAppProps> = ({
  name,
  control,
  placeholder = '',
  max,
  errors,
  onFocus,
  IconLeft,
  IconRight,
  variant,
  onChangeText,
  valueText,
  customStyle,
  iconSize = 14,
  ...props
}) => {
  const {styles, theme} = useStyles(stylesheetInputApp);

  const {
    field: {onChange, onBlur, value},
  } = useController({name, control});

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);

  const showBtnDelete = isFocus && (!!value?.length || !!valueText?.length);

  const ColorStatusInput = useMemo(() => {
    if (isFocus) {
      return theme.colors.tint;
    }
    if (value?.length > 0) {
      return theme.colors.gray2;
    }
    return theme.colors.gray1;
  }, [isFocus, value, valueText]);

  const handleChangeText = (text: string = '') => {
    if (onChangeText) {
      onChangeText(text);
    } else {
      onChange(text);
    }
  };

  return (
    <Box width="100%" {...(typeof customStyle === 'object' ? customStyle : {})}>
      <Row
        height={scaler(30)}
        color={theme.colors.white}
        borderRadius={scaler(5)}
        borderColor={theme.colors.gray4}
        borderWidth={1}>
        <Box>{!!IconLeft && <IconLeft color={ColorStatusInput} />}</Box>
        <Row color={theme.colors.white} flex={1}>
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            onFocus={e => {
              setIsFocus(true);
              onFocus?.(e);
            }}
            onBlur={() => {
              setIsFocus(false);
              onBlur();
            }}
            placeholderTextColor={theme.colors.gray1}
            secureTextEntry={variant === EVariantInput.Password && show}
            value={valueText ?? value}
            onChangeText={handleChangeText}
            maxLength={max}
            {...props}
          />
          <Box pr={10} color={theme.colors.white}>
            {!!IconRight && <IconRight size={iconSize} />}
          </Box>
        </Row>

        {!!showBtnDelete ? (
          <BoxAnimatedFade>
            <IconButton
              style={{paddingBottom: scaler(5), paddingTop: scaler(5)}}
              onPress={handleChangeText}
              IconElement={<Icons.CircleX size={12} color={ColorStatusInput} />}
            />
          </BoxAnimatedFade>
        ) : null}
        {variant === EVariantInput.Password ? (
          <BoxAnimatedFade>
            <IconButton
              IconElement={
                show ? (
                  <Icons.EyeOff size={12} color={ColorStatusInput} />
                ) : (
                  <Icons.Eye color={ColorStatusInput} size={12} />
                )
              }
              onPress={() => setShow(!show)}
            />
          </BoxAnimatedFade>
        ) : null}
      </Row>
      {/* <TextApp>{'error'}</TextApp> */}
      {/* {!!errors && errors[name] && (
        <TextApp>{errors[name]?.message as string}</TextApp>
      )} */}
    </Box>
  );
};
