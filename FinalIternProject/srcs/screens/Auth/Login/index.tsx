import {Absolute, Box, Row, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteAuth} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {TAppNavigation} from '@types';
import {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Login = () => {
  const navigation = useNavigation<TAppNavigation<RouteAuth.LOGIN>>();
  const handleNavigate = () => {
    navigation.navigate(RouteAuth.SignUp);
  };

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [focusInput, setFocusInput] = useState(true);

  const onChangePhone = (number: string) => {
    const maxNumber = number.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (maxNumber.length <= 10) {
      setPhoneNumber(maxNumber);
    }
  };

  const onChangeFocus = () => {
    setFocusInput(true);
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };

  const onPressLogin = () => {
    if (phoneNumber) {
      navigation.navigate(RouteAuth.InputOTP);
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
            <TouchableApp onPress={handleNavigate}>
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
