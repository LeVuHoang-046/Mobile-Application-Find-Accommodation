import {Absolute, Box, Row, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteAuth, RouteMain, RouteTab} from '@constants';
import { useNavigation } from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import { TAppNavigation } from '@types';
import {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export const InputOTP = () => {
  const textInput = useRef<TextInput | null>(null);
  const lengthInput = 6;
  const defaultCountdown = 5;
  let clockCall: NodeJS.Timeout | null = null;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  
  const onChangeText = (val: string) => {
    setInternalVal(val);
  
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
    setCountdown((prevCountdown) => {
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
    setInternalVal('')
  }

  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      if (clockCall) {
        clearInterval(clockCall);
      }
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
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
        style={styles.AvoiddingView}>
        <TextApp mv={scaler(50)} size={FontSize.Font16}>
          Input your OTP code sent via SMS
        </TextApp>
        <Box>
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
              .map((data, index) => (
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
                  }}>
                  <TextApp
                    onPress={() => textInput.current?.focus()}
                    textAlign="center"
                    size={FontSize.Font16}>
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ''}
                  </TextApp>
                </Box>
              ))}
          </Row>
        </Box>
        <Row flex={1} mb={scaler(50)} align="flex-end">
          <TouchableApp onPress={onChangeNumber} style={styles.button}>
            <TextApp
              weight={700}
              size={FontSize.Font14}
              color={ColorsStatic.blue8}>
              Change number
            </TextApp>
          </TouchableApp>
          <TouchableApp onPress={onResendOTP} style={styles.button}>
            <TextApp
              weight={600}
              size={FontSize.Font14}
              color={enableResend ? ColorsStatic.orange2 : ColorsStatic.text}>
              Resend OTP ({countdown})
            </TextApp>
          </TouchableApp>
        </Row>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  AvoiddingView: {
    flex: 1,
    alignItems: 'center',
    padding: scaler(10),
  },
  inputOTP: {
    width: 0,
    height: 0,
    paddingHorizontal: scaler(145),
    paddingVertical: scaler(20),
  },
  button: {
    width: scaler(150),
    height: scaler(50),
    borderRadius: scaler(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
