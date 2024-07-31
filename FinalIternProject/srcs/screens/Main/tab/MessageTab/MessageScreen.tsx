import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Keyboard, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { screenWidth } from '../../../../constants/WindowWidth';
import FeatherIcon from "react-native-vector-icons/Feather";
import { useIsFocused } from "@react-navigation/native";
import { ShadowStyle, ShadowStyle1 } from "../../../../constants/ShadowStyle";
import { Box, HeaderApp } from "@component";



 export const MessageScreen = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textInputRef = useRef<TextInput>(null);
    
    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };
    const handleSearchIconPress = () => {
        textInputRef.current?.focus();
    };
    const handleCancelPress = () => {
        setIsFocused(false); 
        setShowSearchBar(false);
    };



    return (

        // <SafeAreaView style={{flex: 1}}>
            // <StatusBar backgroundColor="#ffffff" barStyle='dark-content' translucent={true}/>    
            <Box flex={1}>
                <View style={[styles.headersection,ShadowStyle]}>
                    {showSearchBar ? (
                        <><TextInput
                            ref={textInputRef}
                            style={[styles.searchInput, isFocused && styles.BorderActive]}
                            placeholder="Search..."
                            autoFocus={true}
                            onFocus={()=> setIsFocused(true)}
                            onBlur={()=> setIsFocused(false)}/>
                            <TouchableOpacity activeOpacity={1} style={{ position: 'absolute', left: 25,paddingTop:10 }} 
                            onPress={handleSearchIconPress}>
                                <FeatherIcon name="search"
                                    size={30} color={'#ccc'}
                                    style={{marginBottom:0}} />
                            </TouchableOpacity></>
                    ) : (
                        // <Text style={{fontSize:24, fontWeight:'bold', color:'black', alignSelf:'center', paddingLeft:15}}>Message</Text>
                        <HeaderApp
                        title="Message"
                        
                        />
                    )}
                    <TouchableOpacity onPress={showSearchBar? handleCancelPress: toggleSearchBar}>
                        {showSearchBar ? (
                            <Text style={styles.cancelText}>Cancel</Text>
                        ) : (
                            <FeatherIcon name="search" size={30} color={'#000'} style={{alignItems:'center', padding:15}}/>
                        )}
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{height:2000, backgroundColor:'#EEEEEE'}}>
                   
                </ScrollView>
            </Box>
           
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headersection: {
        width: screenWidth,
        backgroundColor:'#ffffff',
        height: 60,
        position:'absolute',
        zIndex: 1,
        flexDirection:'row',
        justifyContent:'space-between',

    },
    searchInput: {
        backgroundColor:'#EEEEEE',
        height:50,
        flex:1,
        borderRadius:13,
        paddingLeft:55,
        fontSize:16,
        marginLeft:15,
    },
    BorderActive:{
        borderColor:'red',
        borderWidth:1
    },
    cancelText: {
        padding: 15,
        fontSize: 18,
        color: '#ccc',
        fontWeight:'bold'
    }
});

