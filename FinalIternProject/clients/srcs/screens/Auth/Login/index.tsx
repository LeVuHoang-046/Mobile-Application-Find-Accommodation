import React, {useState} from 'react';
import {Alert, StyleSheet, TextInput} from 'react-native';
import {Absolute, Box, Row, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteAuth} from '@constants';
import {useNavigation} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TAppNavigation} from '@types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontSize, scaler} from '@themes';
import {authenticationAPI, useQueryUserInformation} from '@api';
import { getUserInformation } from '@services';

export const Login = () => {
  const navigation = useNavigation<TAppNavigation<RouteAuth.LOGIN>>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [focusInput, setFocusInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onChangePhone = (number: string) => {
    setPhoneNumber(number.replace(/[^0-9+]/g, ''));
  };
  const onPressLogin = async () => {
    try {
      if (phoneNumber) {
        const formattedPhoneNumber = `+84${phoneNumber.replace(/[^0-9]/g, '')}`;
        const res = await authenticationAPI.handleAuthentication(
          '/login',
          {phoneNumber: formattedPhoneNumber},
          'post',
        );
        console.log('message!!:',res);
        try {
          const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
          navigation.navigate(RouteAuth.InputOTP, { phoneNumber: formattedPhoneNumber, confirm: confirmation });

        } catch(error) {
            setErrorMessage('Failed to check registration or send OTP. Please try again.')
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Account does not exist in the system.');
    }
  };
  // if (phoneNumber) {
  //     const formattedPhoneNumber = `+84${phoneNumber.replace(/[^0-9]/g, '')}`;

  //     try {
  //         // Step 2: Check if the phone number is registered
  //         const response = await fetch('http://10.15.189.161/auth/register', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ phone: formattedPhoneNumber }),
  //         });
  //         const data = await response.json();

  //         if (data.registered) {
  //             // Step 3: Proceed with Firebase OTP if registered
  //             const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
  //             setConfirm(confirmation);
  //             navigation.navigate(RouteAuth.InputOTP, { phoneNumber: formattedPhoneNumber, confirm: confirmation });
  //         } else {
  //             // Step 4: Show an error message if not registered
  //             Alert.alert('Error', 'This phone number is not registered.');
  //         }
  //     } catch (error) {
  //         Alert.alert('Error', 'Failed to check registration or send OTP. Please try again.');
  //     }
  // } else {
  //     Alert.alert('Error', 'Please enter a phone number.');
  // }

  return (
    <Box flex={1}>
      <SafeAreaView edges={['top']} />
      <Box
        height={scaler(280)}
        color={ColorsStatic.blue7}
        borderBottomRightRadius={scaler(30)}
        borderBottomLeftRadius={scaler(30)}
      />
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
              onFocus={() => setFocusInput(true)}
              onBlur={() => setFocusInput(false)}
              autoFocus={focusInput}
            />
          </Row>
          {errorMessage ? (
            <TextApp size={FontSize.Font14} color={ColorsStatic.red2} mt={scaler(5)} textAlign='center'>
              {errorMessage}
            </TextApp>
          ) : null}
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
            <TouchableApp onPress={() => navigation.navigate(RouteAuth.SignUp)}>
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
