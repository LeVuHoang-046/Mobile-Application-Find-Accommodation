import { PermissionsAndroid, Platform } from 'react-native';
import GetLocation from 'react-native-get-location';

export async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (!hasPermission) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message: 'Please allow permission to continue...',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      console.log('Permission already granted');
      getCurrentLocation();
    }
  }
}

export function getCurrentLocation() {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
  .then(location => {
    // console.log('my location:', location);
  })
  .catch(error => {
    const { code, message } = error;
    console.warn(code, message);
  });
}
