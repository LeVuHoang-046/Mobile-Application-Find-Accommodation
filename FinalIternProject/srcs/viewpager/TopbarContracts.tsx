import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import ValidatedContracts from '../navigate/TabContracts/ValidatedContracts';
import ConfirmingContracts from '../navigate/TabContracts/ConfirmingContracts';
import InvalidateContracts from '../navigate/TabContracts/InvalidateContracts';


const Tab = createMaterialTopTabNavigator();

function TopbarContracts(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{height:50},
            tabBarIndicatorStyle:{backgroundColor:'red'},
            tabBarPressColor:'transparent'}}>

            <Tab.Screen name='Confirming' 
            component={ConfirmingContracts} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'blue',fontSize:14}}>Confirming</Text>}} />

            <Tab.Screen name='Validated' 
            component={ValidatedContracts} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'green',fontSize:14}}>Validated</Text>}} />

            <Tab.Screen name='Invalidate contracts' 
            component={InvalidateContracts} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'red',fontSize:14}}>Invalidate</Text>}} />

        </Tab.Navigator>
    );
}

export default TopbarContracts;