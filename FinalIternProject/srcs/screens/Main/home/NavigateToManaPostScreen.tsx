import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from "../../../constants/WindowWidth";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AntIcon from 'react-native-vector-icons/AntDesign';
import { ShadowStyle1 } from "../../../constants/ShadowStyle";
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ShadowStyle } from "../../../constants/ShadowStyle";
const NavigateToManaPostScreen = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={{
            flex:1,
            backgroundColor:'#EEEEEE'
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
                        }}>Manage Post</Text>
                </View>
                <View style={{height:240,marginTop:60,backgroundColor:'yellow'}}>
                    <TouchableOpacity style={{backgroundColor:'#EEEEEE',flex:1,width:screenWidth}} >
                        <View style={styles.container}>
                            <CommunityIcon name="home-search-outline" size={50} color={'#000'} style={{marginLeft:15}}/>
                            <Text style={{fontSize:20,fontWeight:'bold',marginLeft:15}}>Find Accommodation</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#EEEEEE',flex:1,width:screenWidth}} >
                        <View style={styles.container}>
                            <CommunityIcon name="account-multiple-plus-outline" size={50} color={'#000'} style={{marginLeft:15}}/>
                            <Text style={{fontSize:20,fontWeight:'bold',marginLeft:15}}>Find Rommate</Text>
                        </View>
                    </TouchableOpacity>
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
    container:{
        backgroundColor:'#ffffff',
        width:screenWidth-30,
        flexDirection:'row',
        alignItems:'center',
        height: 80,
        marginHorizontal:15,
        marginVertical:20,
        borderRadius:10
    },

})

export default NavigateToManaPostScreen;