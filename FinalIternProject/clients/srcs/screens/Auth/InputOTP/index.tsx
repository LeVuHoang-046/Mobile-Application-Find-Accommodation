import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import { Absolute, Box, Row, TextApp, TouchableApp } from '@component';
import { ColorsStatic, RouteAuth } from '@constants';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FontSize, scaler } from '@themes';
import { AppStackParamList, TAppNavigation } from '@types';
import firestore from '@react-native-firebase/firestore';
import { useTokenUserStore } from '@stores';

type LoginRouteProp = RouteProp<
  AppStackParamList,
  RouteAuth.InputOTP
>;

export const InputOTP = () => {
  const textInput = useRef<TextInput | null>(null);
  const lengthInput = 6;
  const defaultCountdown = 30;
  let clockCall: NodeJS.Timeout | null = null;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const route = useRoute<LoginRouteProp>();

  const navigation = useNavigation<TAppNavigation<RouteAuth.LOGIN>>();


  const { phoneNumber, confirm } = route.params;
// console.log({confirm})

const { refetch } = useTokenUserStore();

  const decrementClock = () => {
    setCountdown(prevCountdown => {
      if (prevCountdown <= 1) {
        setEnableResend(true);
        clearInterval(clockCall ?? 0);
        return 0;
      } else {
        return prevCountdown - 1;
      }
    });
  };

  const confirmCode = async (code: string) => {
    try {
      const userCredential = await confirm.confirm(code);
      setOtpSubmitted(true);
  
      if (!userCredential || !userCredential.user) {
        throw new Error('UserCredential or user is null');
      }
  
      const user = userCredential.user;
  
      // Check if the user is signed in
      const currentUser = auth().currentUser;
      console.log("Current user:", currentUser);
  
      if (currentUser && currentUser.uid === user.uid) {
        // Get the ID token
        const Token = await currentUser.getIdToken();
        console.log('User ID Token:', Token);
        refetch()
        Alert.alert('Login Successful', 'Welcome!');
      } else { 
        console.log('User session not active');
        Alert.alert('Error', 'There was an issue with your login session.');
        navigation.navigate(RouteAuth.LOGIN)
      }
    } catch (error) {
      console.error('OTP confirmation failed:', error);
      Alert.alert('Invalid code', 'The code you entered is incorrect.');
    }
  };
  

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user && !!otpSubmitted) {
        console.log('User is signed in:', user);
        // Alert.alert('Success', 'You have successfully logged in.');
      } else {
        console.log('User is not signed in');
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [otpSubmitted]);

  const onChangeText = (val: string) => {
    setInternalVal(val);
    if (val.length === lengthInput) {
      confirmCode(val);
    }
  };
  const startCountdown = () => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
  };

  const onResendOTP = async () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      startCountdown()
      try {
        const newConfirmation = await auth().signInWithPhoneNumber(phoneNumber);
        Alert.alert('Success', 'A new OTP has been sent to your phone.');
      } catch (error) {
        Alert.alert('Error', 'Failed to resend OTP. Please try again.');
      }
    }
  };

  useEffect(() => {
    textInput.current?.focus();
    startCountdown(); // Start countdown if required initially
    return () => {
      if (clockCall) {
        clearInterval(clockCall);
      }
    };
  }, []);

  return (
    <Box flex={1}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.AvoidingView}
      >
        <TextApp mv={scaler(50)} size={FontSize.Font16}>
          Input your OTP code sent via SMS
        </TextApp>
        <Box>
          <Absolute bottom={scaler(40)} left={scaler(5)}>
            <TextInput
              ref={textInput}
              onChangeText={onChangeText}
              style={styles.inputOTP}
              value={internalVal}
              maxLength={lengthInput}
              // returnKeyType="done"
              keyboardType="numeric"
            />
          </Absolute>
          <Row>
            {Array(lengthInput)
              .fill(0)
              .map((_, index) => (
                <Box
                  key={index}
                  pv={scaler(11)}
                  width={scaler(40)}
                  m={scaler(5)}
                  justify="center"
                  align="center"
                  borderBottomWidth={scaler(1.5)}
                  style={{
                    borderBottomColor:
                      index === internalVal.length
                        ? ColorsStatic.orange2
                        : ColorsStatic.black,
                  }}
                >
                  <TextApp
                    onPress={() => textInput.current?.focus()}
                    textAlign="center"
                    size={FontSize.Font18}
                  >
                    {internalVal[index] || ''}
                  </TextApp>
                </Box>
              ))}
          </Row>
          <Box mt={scaler(20)}>
            <TouchableApp 
            onPress={onResendOTP} 
            disabled={!enableResend}
            >
              <TextApp size={FontSize.Font18} color={enableResend ? ColorsStatic.blue8 : ColorsStatic.gray1}>
                Resend OTP ({countdown}s)
              </TextApp>
            </TouchableApp>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  AvoidingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputOTP: {
    width: scaler(290),
    height: scaler(0),
    paddingVertical: scaler(40),
  },
});
