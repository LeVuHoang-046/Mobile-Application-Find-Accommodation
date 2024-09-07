import { Animated, Button, Keyboard, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShadowStyle1 } from "../../../constants/ShadowStyle";
import AntIcon from 'react-native-vector-icons/AntDesign';
import { screenWidth } from "../../../constants/WindowWidth";
import { useNavigation } from "@react-navigation/native";
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useRef, useState } from "react";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ScrollView } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";


export const SearchPosting = () => {
    const navigation = useNavigation();
    const textInputRef = useRef<TextInput>(null);
    
    const handleSearchIconPress = () => {
        textInputRef.current?.focus();
    };
    


 

    
    return(
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#ffffff'} barStyle={"dark-content"}/>
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
                            }}>Search postings</Text>
                        <TouchableOpacity style={{
                            position:'absolute',
                            right:0,
                            marginRight:15
                        }}>
                            <CommunityIcon name="filter" size={30} color={'#000'}/>
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
                        
                        <TouchableOpacity activeOpacity={0} style={{position:'absolute',left:25}} onPress={handleSearchIconPress}>
                            <FeatherIcon name="search" 
                                size={30} color={'#ccc'} 
                                style={styles.searchIconContainer} />
                        </TouchableOpacity>
                    </View>
                    {/* ===================END SEARCH BAR================ */}

                    <View style={{backgroundColor:'#EEEEEE',marginTop:130}}>                    
                        <ScrollView contentContainerStyle={{height:2500, backgroundColor:'pink'}}>
                            <View style={styles.AreaOption}>
                                <TouchableOpacity style={{
                                    flexDirection:'row',
                                    width:screenWidth,
                                    }}>
                                    <MaterialIcon name="location-pin" size={30} color={'red'} style={{
                                        marginLeft:15}}/>
                                    <Text style={{
                                        fontSize:18,
                                        fontWeight:'bold',
                                        marginLeft:10,
                                        marginTop:4
                                    }}>Area: Hanoi city</Text>
                                    <MaterialIcon name="arrow-drop-down" size={30} color={'#000'} style={{
                                        right:0,
                                        marginRight:15,
                                        position:'absolute'
                                    }}/>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
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
        flexDirection:'row',
        paddingBottom:10
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
       marginBottom:10
    },

    AreaOption:{
        backgroundColor:'#ffffff',
        justifyContent:'center',
        height:60,
      
    }
})
