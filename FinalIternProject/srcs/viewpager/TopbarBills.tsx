import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import PayedBills from '@navigate/TabBills/PayedBills';
import PayingBills from '@navigate/TabBills/PayingBills';





const Tab = createMaterialTopTabNavigator();

function TopbarBills(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{height:50},
            tabBarIndicatorStyle:{backgroundColor:'red'},
            tabBarPressColor:'transparent'}}>

            <Tab.Screen name='Wait for pay' 
            component={PayingBills} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'blue',fontSize:14}}>Wait for pay</Text>}} />

            <Tab.Screen name='Complete payment' 
            component={PayedBills} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'green',fontSize:14}}>Complete payment</Text>}} />

        </Tab.Navigator>
    );
}

export {TopbarBills};