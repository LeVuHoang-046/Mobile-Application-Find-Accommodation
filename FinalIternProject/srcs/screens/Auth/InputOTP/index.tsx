import React, { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import { Absolute, Box, Row, TextApp, TouchableApp } from '@component';
import { ColorsStatic } from '@constants';
import auth from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/native';
import { FontSize, scaler } from '@themes';

export const InputOTP = () => {
  const textInput = useRef<TextInput | null>(null);
  const lengthInput = 6;
  const defaultCountdown = 5;
  let clockCall: NodeJS.Timeout | null = null;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const route = useRoute();
  const { phoneNumber } = route.params as { phoneNumber: string };

  useEffect(() => {
    const sendVerification = async () => {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setVerificationId(confirmation.verificationId);
      } catch (error) {
        const errorMessage = (error as Error).message || 'An error occurred';
        Alert.alert('Error', errorMessage);
      }
    };

    sendVerification();

    return () => {
      if (clockCall) {
        clearInterval(clockCall);
      }
    };
  }, [phoneNumber]);

  const confirmCode = async () => {
    if (verificationId && internalVal.length === lengthInput) {
      try {
        const credential = auth.PhoneAuthProvider.credential(
          verificationId,
          internalVal
        );
        await auth().signInWithCredential(credential);
        Alert.alert('Login Successful');
        setInternalVal('');
      } catch (error) {
        const errorMessage = (error as Error).message || 'An error occurred';
        Alert.alert('Error', errorMessage);
      }
    }
  };

  const onChangeText = (val: string) => {
    setInternalVal(val);
    if (val.length === lengthInput) {
      confirmCode();
    }
  };

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);

    return () => {
      if (clockCall) {
        clearInterval(clockCall);
      }
    };
  }, []);

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

  const onChangeNumber = () => {
    setInternalVal('');
    // Optionally handle changing phone number here
  };

  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      const sendVerification = async () => {
        try {
          const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
          setVerificationId(confirmation.verificationId);
        } catch (error) {
          const errorMessage = (error as Error).message || 'An error occurred';
          Alert.alert('Error', errorMessage);
        }
      };

      sendVerification();
    }
  };

  useEffect(() => {
    textInput.current?.focus();
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
          {/* Remove FirebaseRecaptchaVerifierModal */}
          <Absolute bottom={scaler(10)} left={scaler(5)}>
            <TextInput
              ref={textInput}
              onChangeText={onChangeText}
              style={styles.inputOTP}
              value={internalVal}
              maxLength={lengthInput}
              returnKeyType="done"
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
            <TouchableApp onPress={onChangeNumber}>
              <TextApp size={FontSize.Font16}>Change phone number</TextApp>
            </TouchableApp>
            <Row>
              <TextApp size={FontSize.Font14}>Resend OTP in</TextApp>
              <TextApp
                size={FontSize.Font14}
                color={enableResend ? ColorsStatic.blue8 : ColorsStatic.gray4}
              >
                {countdown}s
              </TextApp>
            </Row>
            {enableResend && (
              <TouchableApp onPress={onResendOTP}>
                <TextApp size={FontSize.Font16} color={ColorsStatic.blue8}>
                  Resend OTP
                </TextApp>
              </TouchableApp>
            )}
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  AvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaler(20),
  },
  inputOTP: {
    fontSize: FontSize.Font18,
    textAlign: 'center',
    width:300,
    height:40,
    backgroundColor:'red'
  },
  // Remove recaptchaContainer style
});
