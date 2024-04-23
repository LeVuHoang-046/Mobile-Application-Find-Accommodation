import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import ConfirmingSchedule from '../navigate/TabAppointmentSchedule/ConfirmingSchedule';
import ConfirmedSchedule from '../navigate/TabAppointmentSchedule/ConfirmedSchedule';
import OutOfDateSchedule from '../navigate/TabAppointmentSchedule/OutOfDateSchedule';


const Tab = createMaterialTopTabNavigator();

function TopbarSchedule(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{height:50},
            tabBarIndicatorStyle:{backgroundColor:'red'},
            tabBarPressColor:'transparent'}}>
            <Tab.Screen name='Confirming' 
            component={ConfirmingSchedule} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'blue',fontSize:14}}>Confirming</Text>}} />

            <Tab.Screen name='Confirmed' 
            component={ConfirmedSchedule} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'green',fontSize:14}}>Confirmed</Text>}} />

            <Tab.Screen name='Out of date' 
            component={OutOfDateSchedule} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'red',fontSize:14}}>Out of date</Text>}} />

        </Tab.Navigator>
    );
}

export default TopbarSchedule;