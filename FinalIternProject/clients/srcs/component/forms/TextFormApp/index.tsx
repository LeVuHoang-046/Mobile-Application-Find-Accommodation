import { Box, BoxFormTitle, Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { ColorsStatic } from '@constants';
import { FontSize, scaler } from '@themes';
import React, { useMemo, useState } from 'react';
import { useController } from 'react-hook-form';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { TextFormAppProps } from '../forms.type';
import { stylesheetInputApp } from '../InputApp/inputApp.style';
import { Icons } from '@assets';

const formatNumberWithCommas = (value: string) => {
  const cleanValue = value.replace(/[^\d]/g, ''); // Remove any non-numeric characters
  if (!cleanValue) return '';

  // Convert to number and format with commas
  const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedValue;
};

export const TextFormApp: React.FC<TextFormAppProps> = ({
  name,
  control,
  placeholder,
  max,
  iconLeft,
  height = scaler(40),
  title,
  require,
  isNumber = false,
  keyboardType = 'default',
  isOnPress = false,
  onPress, // Add onPress here if needed
  ...props
}) => {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({ name, control });
  const { styles } = useStyles(stylesheetInputApp);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [formattedValue, setFormattedValue] = useState<string>(value?.toString() || '');

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

  const handleInputChange = (text: string) => {
    // Format the number with commas
    const formatted = formatNumberWithCommas(text);

    // Remove commas and send the clean value to form state
    const cleanValue = formatted.replace(/[^\d]/g, ''); // Remove non-numeric characters
    onChange(cleanValue); // Store clean value in form state

    // Update the TextInput field with the formatted value
    setFormattedValue(formatted);
  };

  return (
    <BoxFormTitle
      width="100%"
      rowGap={scaler(2)}
      title={title}
      require={require}
    >
      {isOnPress ? (
        <TouchableOpacity 
          onPress={onPress} // Call onPress when the component is pressed
          activeOpacity={0.8}
          style={{ height, backgroundColor: ColorsStatic.white,paddingTop: scaler(5), paddingHorizontal: scaler(10) }} // Adjust style as needed
        >
          <Row
            color={ColorsStatic.white}
            borderRadius={scaler(5)}
            borderColor={ColorStatusInput}
            pv={scaler(4)}
            borderBottomWidth={1}
            columnGap={scaler(5)}
          >
            {iconLeft}
            <TextApp>{placeholder}</TextApp> 
          </Row>
        </TouchableOpacity>
      ) : (
        <Row
          color={ColorsStatic.white}
          borderRadius={scaler(5)}
          borderColor={ColorStatusInput}
          pv={scaler(4)}
          borderBottomWidth={1}
          ph={scaler(10)}
        >
          {iconLeft}
          <TextInput
            placeholder={placeholder}
            style={styles.textForm}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            multiline
            value={isNumber ? formattedValue : value ? value.toString() : ''}
            maxLength={max}
            onChangeText={isNumber ? handleInputChange : onChange}
            keyboardType={keyboardType}
            {...props}
          />
        </Row>
      )}
      {max ? (
        <TextApp
          weight={600}
          size={FontSize.Font10}
          color={ColorsStatic.gray3}
          textAlign="right"
        >
          {value?.length}/{max}
        </TextApp>
      ) : null}
    </BoxFormTitle>
  );
};
