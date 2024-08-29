import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput } from 'react-native';
import { Absolute, Box, Row, TextApp, TouchableApp } from '@component';
import { ColorsStatic, RouteAuth } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { FontSize, scaler } from '@themes';
import auth from '@react-native-firebase/auth';
import { TAppNavigation } from '@types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Login = () => {
  const navigation = useNavigation<TAppNavigation<RouteAuth.LOGIN>>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [focusInput, setFocusInput] = useState(true);

  const onChangePhone = (number: string) => {
    // Remove non-numeric characters except '+' at the start
    const formattedNumber = number.replace(/[^0-9+]/g, '');
    setPhoneNumber(formattedNumber);
  };

  const onChangeFocus = () => {
    setFocusInput(true);
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };

  const onPressLogin = async () => {
    if (phoneNumber) {
      // Ensure phone number starts with '+' and country code
      const formattedPhoneNumber = `+84${phoneNumber.replace(/[^0-9]/g, '')}`;
      console.log('Formatted Phone Number:', formattedPhoneNumber);
      try {
        const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
        if (confirmation.verificationId) {
          navigation.navigate(RouteAuth.InputOTP, { phoneNumber: formattedPhoneNumber });
        } else {
          Alert.alert('Error', 'Failed to get verification ID.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please enter a phone number.');
    }
  };

  return (
    <Box flex={1}>
      <SafeAreaView edges={['top']} />
      <Box
        height={scaler(280)}
        color={ColorsStatic.blue7}
        borderBottomRightRadius={scaler(30)}
        borderBottomLeftRadius={scaler(30)}></Box>
      <Absolute
        color={ColorsStatic.white}
        right={0}
        left={0}
        top={scaler(250)}
        mh={scaler(15)}
        pv={scaler(15)}
        borderRadius={scaler(20)}>
        <Box rowGap={scaler(7)} mh={scaler(15)}>
          <Row
            ph={scaler(10)}
            borderWidth={scaler(1)}
            borderRadius={scaler(20)}
            borderColor={ColorsStatic.gray1}>
            <TextApp size={FontSize.Font16}>{'+84 |'}</TextApp>
            <TextInput
              placeholder="Phone number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={onChangePhone}
              style={styles.input}
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
              autoFocus={focusInput}
            />
          </Row>
          <TouchableApp
          onPress={onPressLogin}
            style={[
              styles.btn,
              {
                backgroundColor: phoneNumber
                  ? ColorsStatic.blue8
                  : ColorsStatic.gray1,
              },
            ]}>
            <TextApp size={FontSize.Font18} color={ColorsStatic.white}>
              Login
            </TextApp>
          </TouchableApp>
          <Row pv={scaler(5)} columnGap={scaler(15)} justify="center">
            <TextApp size={FontSize.Font14}>Don't have an account yet?</TextApp>
            <TouchableApp onPress={()=> navigation.navigate(RouteAuth.SignUp)}>
              <TextApp size={FontSize.Font12} color={ColorsStatic.blue8}>
                Sign Up
              </TextApp>
            </TouchableApp>
          </Row>
        </Box>
      </Absolute>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: FontSize.Font16,
    flex: 1,
  },
  btn: {
    marginTop: scaler(8),
    paddingVertical: scaler(12),
    borderRadius: scaler(30),
    alignItems: 'center',
  },
});