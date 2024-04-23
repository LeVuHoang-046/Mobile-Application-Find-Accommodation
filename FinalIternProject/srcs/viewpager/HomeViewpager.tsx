import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Main/home/HomeScreen';
import ServiceScreen from '../screens/Main/home/ServiceScreen';
import MessageScreen from '../screens/Main/home/MessageScreen';
import { Platform, StyleSheet } from 'react-native'; // Import Platform from react-native
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo'; 
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AccountScreen from '../screens/Main/home/AccountScreen';


const Tab = createBottomTabNavigator();

function HomeViewpager() {
  return (
    <Tab.Navigator 
      screenOptions={{headerShown: false, 
      tabBarStyle:{height: Platform.OS === 'android' ? 80 : 70},
      tabBarLabelStyle:{fontSize:14,color:'#000',paddingBottom:5, justifyContent:'center'}}}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{tabBarIcon: ()=>(
        <Icon name="home" size={30} color="#000" /> )}} />

      <Tab.Screen name="Service" component={ServiceScreen} 
        options={{tabBarIcon: ()=>(
        <IoniconsIcon name="storefront" size={30} color="#000" /> )}} />

      <Tab.Screen name="Message" component={MessageScreen}
        options={{tabBarIcon:()=>(
          <CommunityIcon name='message-badge'size={30} color="#000"/> )}} />

      <Tab.Screen name="Profile" component={AccountScreen}        
          options={{tabBarIcon:()=>(
          <CommunityIcon name='account-circle'size={30} color="#000"/> )}} />

    </Tab.Navigator>
  );
}



export default HomeViewpager;