import {Icons, Images} from '@assets';
import {Box, ImageApp, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteAuth} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {TAppNavigation} from '@types';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const SignUp = () => {
  const navigation = useNavigation<TAppNavigation<RouteAuth.LOGIN>>();
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
          <TextInput style={styles.textInput} />
          <TextApp pl={scaler(15)} weight={700}>
            Phone Number
          </TextApp>
          <TextInput keyboardType="phone-pad" style={styles.textInput} />
          {/* <TextApp pl={scaler(15)} weight={700}>Password</TextApp>
          <TextInput secureTextEntry style={styles.textInput} />
          
          <TextApp pl={scaler(15)} weight={700}>Verify password</TextApp>
          <TextInput secureTextEntry style={styles.textInput} /> */}
          <TouchableApp style={styles.buttonSignUp}>
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
  buttonSignUp: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsStatic.orange4,
    padding: scaler(10),
    borderRadius: scaler(10),
    marginTop: scaler(5),
  },
});
