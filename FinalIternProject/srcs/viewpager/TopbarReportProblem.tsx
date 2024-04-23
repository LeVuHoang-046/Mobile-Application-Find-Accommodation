import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import PayingBills from '../navigate/TabBills/PayingBills';
import PayedBills from '../navigate/TabBills/PayedBills';
import RequestCompleted from '../navigate/TabReportProblem/RequestCompleted';
import RequestingProblem from '../navigate/TabReportProblem/RequestingProblem';




const Tab = createMaterialTopTabNavigator();

function TopbarReportProblem(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{height:50},
            tabBarIndicatorStyle:{backgroundColor:'red'},
            tabBarPressColor:'transparent'}}>

            <Tab.Screen name='Requesting' 
            component={RequestingProblem} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'blue',fontSize:14}}>Requesting</Text>}} />

            <Tab.Screen name='Request completed' 
            component={RequestCompleted} 
            options={{tabBarLabel:() => 
            <Text style={{ color:'green',fontSize:14}}>Request completed</Text>}} />

        </Tab.Navigator>
    );
}

export default TopbarReportProblem;