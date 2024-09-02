import React, { useState, useEffect } from 'react';
import { Button, TextInput, Alert } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Box } from '@component';

export const Login = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // Verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState<string>('');

  // Handle login state change
  const  onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      // User is logged in, handle successful login
      Alert.alert('Success', 'You have successfully logged in.');
      // Here, you could navigate away from the screen or update UI accordingly
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press for signing in with phone number
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error('Error during sign-in:', error); // Log the error
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  }
  
  const confirmCode = async() => {
    try {
      if (confirm) {
        await confirm.confirm(code);
      }
    } catch (error) {
      console.error('Error during code confirmation:', error); // Log the error
      Alert.alert('Invalid code', 'The code you entered is incorrect.');
    }
  }
  

  if (!confirm) {
    return (
      <Box mt={80} p={10}>

        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+84947506530')}
        />
      </Box>
    );
  }

  return (
    <Box  p={10}>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        placeholder="Enter OTP"
        keyboardType="numeric"
        style={{padding:100}}
      />
      <Button title="Confirm Code" onPress={confirmCode} />
    </Box>
  );
}