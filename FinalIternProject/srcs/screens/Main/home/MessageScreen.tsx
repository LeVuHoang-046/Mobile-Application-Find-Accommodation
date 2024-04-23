import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from '../../../constants/WindowWidth';
import FeatherIcon from "react-native-vector-icons/Feather"
import React from "react";
const MessageScreen = () => {
    return(
        <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor="transparent" barStyle='light-content' translucent={true}/>
        <View style={{flex:1}}>
            <View style={styles.headersection}>
                <Text style={{fontSize:24,
                    fontWeight:'bold',color:'black',
                    alignSelf:'center',
                    paddingLeft:15}}>Message</Text>
                <TouchableOpacity>
                    <FeatherIcon name="search" size={30} color={'#000'}
                    style={{alignItems:'center',
                        padding:15,

                    }}/>

                </TouchableOpacity>
            </View>
            <View>
                <ScrollView contentContainerStyle={{height:2000,backgroundColor:'pink'}}>

                </ScrollView>

            </View>

        </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headersection:{
        width: screenWidth,
        backgroundColor:'#ffffff',
        height:60,
        position:'absolute',
        zIndex:1,
        flexDirection:'row',
        justifyContent:'space-between'
        
       

    }
})

export default MessageScreen;