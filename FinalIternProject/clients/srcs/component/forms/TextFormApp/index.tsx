import { Box, BoxFormTitle, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic } from '@constants';
import { FontSize, scaler } from '@themes';
import React, { useMemo, useState } from 'react';
import { useController } from 'react-hook-form';
import { TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { TextFormAppProps } from '../forms.type';
import { stylesheetInputApp } from '../InputApp/inputApp.style';
import { Icons } from '@assets';


export const TextFormApp: React.FC<TextFormAppProps> = ({
  name,
  control,
  placeholder,
  max,
  iconLeft,
  height = scaler(90),
  title,
  require,
  ...props
}) => {
  const {
    field: {onChange, value},
    formState: {errors},
  } = useController({name, control});
  const {styles} = useStyles(stylesheetInputApp);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const isError = !!errors && !!errors[name];

  const ColorStatusInput = useMemo(() => {
    if (isFocus) {
      return ColorsStatic.blue1;
    }
    if (isError) {
      return ColorsStatic.red2;
    }
    return ColorsStatic.gray1;
  }, [isFocus, value, isError]);

  return (
    <BoxFormTitle
      width="100%"
      rowGap={scaler(2)}
      title={title}
      require={require}>
      <Row
        color={ColorsStatic.white}
        borderRadius={scaler(5)}
        borderColor={ColorStatusInput}
        pv={scaler(4)}
        borderBottomWidth={1} 
        ph={scaler(10)}>
        {iconLeft}
        <TextInput
          placeholder={placeholder}
          style={styles.textForm}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          // placeholderTextColor={ColorsStatic.gray1}
          multiline
          value={value}
          onChangeText={onChange}
          maxLength={max}
          
          {...props}
        />
      </Row>
      {max ? (
        <TextApp
          weight={600}
          size={FontSize.Font10}
          color={ColorsStatic.gray3}
          textAlign="right">
          {value?.length}/{max}
        </TextApp>
      ) : null}
    </BoxFormTitle>
  );
};
