import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import WaitConfirm from '../navigate/TabManaServiceOr/WaitConfirm';
import Delivered from '../navigate/TabManaServiceOr/Delivered';
import Delivering from '../navigate/TabManaServiceOr/Delivering';
import Cancelled from '../navigate/TabManaServiceOr/Cancelled';


const Tab = createMaterialTopTabNavigator();

function TopbarManaServiceOr(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{height:50},
            tabBarIndicatorStyle:{backgroundColor:'red'},
            tabBarPressColor:'transparent'}}>
            <Tab.Screen name='WaitConfirm' 
            component={WaitConfirm} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'blue',fontSize:14}}>Confirming</Text>}} />
            
            <Tab.Screen name='Deliverin' 
            component={Delivering} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'blue',fontSize:14}}>Delivering</Text>}} />

            <Tab.Screen name='Delivered' 
            component={Delivered} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'green',fontSize:14}}>Delivered</Text>}} />

            <Tab.Screen name='Cancelled' 
            component={Cancelled} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'red',fontSize:14}}>Cancelled</Text>}} />

        </Tab.Navigator>
    );
}

export default TopbarManaServiceOr;