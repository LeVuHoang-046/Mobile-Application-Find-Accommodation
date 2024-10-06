import {Icons, Images} from '@assets';
import {Box, ImageApp, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteAuth} from '@constants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {AppStackParamList, TAppNavigation} from '@types';
import {useState} from 'react';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {authenticationAPI} from '@api';

type SignUpRouteProp = RouteProp<AppStackParamList, RouteAuth.SignUp>;

export const SignUp = () => {
  const navigation = useNavigation<TAppNavigation<RouteAuth.LOGIN>>();
  const route = useRoute<SignUpRouteProp>();
  const uid = route.params?.uid;

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const SaveUser = async (uid: any, name: string, phonenumber: string) => {
    try {
      await firestore().collection('users').doc(uid).set({
        name,
        phonenumber,
      });
      // console.log('User saved successfully');
    } catch (error) {
      console.log('Error saving user:', error);
    }
  };

  const onSignUp = async () => {
    let valid = true;

    // Reset errors
    setNameError('');
    setPhoneError('');

    if (!name) {
      setNameError('Full name is required');
      valid = false;
    }

    if (!phoneNumber) {
      setPhoneError('Phone number is required');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const api = '/register';
    const formattedPhoneNumber = `+84${phoneNumber.replace(/[^0-9]/g, '')}`;

    try {
      // Try to verify the phone number using Firebase
      const confirmation = await auth().signInWithPhoneNumber(
        formattedPhoneNumber,
      );
      // If phone verification is successful, proceed with the registration
      if (confirmation.verificationId) {
        try {
          // Call your API to register the user
          const res = await authenticationAPI.handleAuthentication(
            api,
            {
              name: name,
              phoneNumber: formattedPhoneNumber,
            },
            'post',
          );
          // console.log({res})

          // Check if the backend indicates that the phone number already exists
          if (res.message === 'User already registered') {
            setPhoneError('Phone number already exists');
            return; // Stop further processing
          }

          // Save the user to Firestore or SQL after backend registration is successful
          await SaveUser(uid, name, formattedPhoneNumber);

          // Navigate to OTP screen for further verification
          navigation.navigate(RouteAuth.InputOTP, {
            phoneNumber: formattedPhoneNumber,
            confirm: confirmation,
          });
        } catch (apiError) {
          // Handle errors related to the API request
          console.log('API Error during sign up:', apiError);
          setPhoneError('Phone number already exists!');
        }
      }
    } catch (firebaseError) {
      // Handle errors related to Firebase phone verification
      console.log('Firebase Error:', firebaseError);
      setPhoneError('Phone number is invalid!');
    }
  };

  return (
    <Box flex={1} color={ColorsStatic.blue7}>
      <SafeAreaView edges={['top']} />
      <TouchableApp onPress={() => navigation.goBack()} style={styles.goBack}>
        <Icons.BackLeft size={18} />
      </TouchableApp>
      <Box height={scaler(200)} color={ColorsStatic.blue7}>
        <ImageApp
          source={Images.SignUp3}
          resizeMode="contain"
          style={styles.image}
        />
      </Box>
      <Box
        flex={1}
        color={ColorsStatic.white}
        borderTopLeftRadius={scaler(50)}
        borderTopRightRadius={scaler(50)}>
        <Box rowGap={scaler(10)} mh={scaler(20)} mt={scaler(30)}>
          <TextApp pl={scaler(15)} weight={700}>
            Full Name
          </TextApp>
          <TextInput
            style={[nameError ? styles.textInputError : styles.textInput]}
            value={name}
            onChangeText={text => setName(text)}
          />
          {nameError ? (
            <TextApp style={styles.errorText}>{nameError}</TextApp>
          ) : null}

          <TextApp pl={scaler(15)} weight={700}>
            Phone Number
          </TextApp>
          <TextInput
            keyboardType="phone-pad"
            style={[phoneError ? styles.textInputError : styles.textInput]}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          {phoneError ? (
            <TextApp style={styles.errorText}>{phoneError}</TextApp>
          ) : null}

          <TouchableApp onPress={onSignUp} style={styles.buttonSignUp}>
            <TextApp weight={700} size={FontSize.Font14}>
              Sign Up
            </TextApp>
          </TouchableApp>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  goBack: {
    backgroundColor: ColorsStatic.orange2,
    width: scaler(30),
    height: scaler(30),
    marginTop: scaler(5),
    marginLeft: scaler(5),
    padding: scaler(5),
    borderTopRightRadius: scaler(12),
    borderBottomLeftRadius: scaler(12),
  },
  textInput: {
    borderRadius: scaler(15),
    paddingLeft: scaler(10),
    fontSize: FontSize.Font16,
    backgroundColor: ColorsStatic.gray9,
  },
  textInputError: {
    borderRadius: scaler(15),
    paddingLeft: scaler(10),
    fontSize: FontSize.Font16,
    backgroundColor: ColorsStatic.gray9,
    borderColor: ColorsStatic.red2,
    borderWidth: scaler(1),
  },
  errorText: {
    color: ColorsStatic.red2,
    marginTop: scaler(5),
    marginLeft: scaler(15),
  },
  buttonSignUp: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsStatic.orange4,
    padding: scaler(10),
    borderRadius: scaler(10),
    marginTop: scaler(5),
  },
});
