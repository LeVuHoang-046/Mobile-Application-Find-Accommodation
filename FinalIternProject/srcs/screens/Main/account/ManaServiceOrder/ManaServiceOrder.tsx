import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from "../../../constants/WindowWidth";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { ShadowStyle1 } from "../../../constants/ShadowStyle";
import AntIcon from 'react-native-vector-icons/AntDesign';
import TopbarManaServiceOr from "../../../viewpager/TopbarManaServiceOr";

export const ManaServiceOrder = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={{
            flex:1,
            backgroundColor:'#ffffff'
        }}>
            <StatusBar backgroundColor={'red'} barStyle={'dark-content'} translucent={true} />
            <View style={{flex:1}}>
                <View style={[styles.headercontainer, ShadowStyle1]}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} 
                    style={{
                        left:0,
                        marginLeft:15,
                        position:'absolute'}}>
                        <AntIcon name='left' size={30} color={'#ffffff'}/>
                    </TouchableOpacity>
                        <Text style={{
                            fontSize:24,
                            fontWeight:'bold',
                            justifyContent:'center',
                            marginLeft:70,
                            color:'#ffffff'
                        }}>Order List</Text>
                </View>
                <View style={{backgroundColor:'#EEEEEE',height:1000,marginTop:60}}>                    
                    <TopbarManaServiceOr/>
                </View>
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headercontainer:{
        width: screenWidth,
        backgroundColor:'red',
        height:60,
        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        
    },
})
