import { Box } from '@component';
import { ColorsStatic, screenWidth, ShadowStyle } from '@constants';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { requestLocationPermission } from '@utils';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import { scaler } from '@themes';

export const BoxFindRoomAroundHere = () => {
  const [region, setRegion] = useState({
    latitude: 21.017293927431666,
    longitude: 105.78452239651166,
    latitudeDelta: 2,
    longitudeDelta: 2,
  });

  useEffect(() => {
    requestLocationPermission();

    // Watch the user's location in real-time
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Unable to retrieve your location.');
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update location every 10 meters
      }
    );

    // Clean up the subscription when the component unmounts
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const handleMyLocationPress = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Unable to retrieve your location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      }
    );
  };

  return (
    <Box style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation
        showsMyLocationButton={false}
        onRegionChangeComplete={setRegion}
      >
        {/* Optional: Show a marker at the current location */}
        <Marker coordinate={region} />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.myLocationButton, ShadowStyle]} onPress={handleMyLocationPress}>
          <Icon name="my-location" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: WINDOW_HEIGHT,
    width: screenWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: scaler(60),
    right: scaler(20),
  },
  myLocationButton: {
    backgroundColor: ColorsStatic.blue1,
    borderRadius: scaler(50),
    width: scaler(50),
    height: scaler(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
