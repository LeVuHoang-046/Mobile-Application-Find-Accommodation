import { Button, Keyboard, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShadowStyle1 } from "../../../constants/ShadowStyle";
import AntIcon from 'react-native-vector-icons/AntDesign';
import { screenWidth } from "../../../constants/WindowWidth";
import { useNavigation } from "@react-navigation/native";
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useRef, useState } from "react";
import FeatherIcon from 'react-native-vector-icons/Feather';
import TopbarSchedule from "../../../viewpager/TopbarSchedule";


export const AppointmentSchedule = () => {
    const navigation = useNavigation();
    const textInputRef = useRef<TextInput>(null);
    
    const handleSearchIconPress = () => {
        textInputRef.current?.focus();
    };
    const handleUnFocus = ()=>{
        Keyboard.dismiss();
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"}/>
            <TouchableWithoutFeedback onPress={handleUnFocus}>
                <View style={{flex:1}}>
                    {/* ===================HEADER CONTENT================ */}
                    <View style={[styles.headercontainer, ShadowStyle1]}>
                        <TouchableOpacity onPress={()=>navigation.goBack()} 
                        style={{
                            left:0,
                            marginLeft:15,
                            position:'absolute'}}>
                            <AntIcon name='left' size={30} color={'#000'}/>
                        </TouchableOpacity>
                            <Text style={{
                                fontSize:24,
                                fontWeight:'bold',
                                justifyContent:'center',
                                marginLeft:70,
                                color:'#000'
                            }}>Manage schedules</Text>
                        <TouchableOpacity style={{
                            position:'absolute',
                            right:0,
                            marginRight:15
                        }}>
                            <CommunityIcon name="calendar" size={30} color={'#7F8487'}/>
                        </TouchableOpacity>

                    </View>
                    {/* ===================END HEADER CONTENT================ */}


                    {/* ===================START SEARCH BAR================ */}
                    
                    <View style={styles.viewSearchBar}>
                        <TextInput
                        ref={textInputRef}
                        placeholder="Type here..."
                        keyboardType='default'
                        style={styles.searchBar}
                        />
                        
                        <TouchableOpacity style={{position:'absolute',left:25}} onPress={handleSearchIconPress}>
                            <FeatherIcon name="search" 
                                size={30} color={'#ccc'} 
                                style={styles.searchIconContainer} />
                        </TouchableOpacity>
                    </View>
                    {/* ===================END SEARCH BAR================ */}

                    <View style={{backgroundColor:'#EEEEEE',height:1000,marginTop:130}}>                    
                        <TopbarSchedule/>
                    </View>
                </View>
            </TouchableWithoutFeedback> 
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headercontainer:{
        width: screenWidth,
        backgroundColor:'#ffffff',
        height:60,
        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        
    },
    viewSearchBar:{
        height:80,
        marginTop:60,
        width:screenWidth,
        backgroundColor:'#ffffff',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    searchBar:{
        backgroundColor:'#EEEEEE',
        height:50,
        width:screenWidth-30,
        borderRadius:13,
        paddingLeft:55,
        fontSize:16

    
    },
    searchIconContainer:{
       
    }
})

