import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { screenWidth } from "@constants";



interface Props {
    navigation: StackNavigationProp<any>;
  }

export const TransportService = ({navigation}: Props) => {
    const NavigateShoppingCart = ()=>{
        navigation.navigate('NavigateShoppingCart')
       }

    const NavigatetoManaServiceOr = ()=>{
        navigation.navigate("NavigatetoManaServiceOr")
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor="#ffffff" barStyle='dark-content' translucent={true}/>
            <View style={{flex:1}}>
                <View style={styles.headersection}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} 
                        style={{
                        left:0,
                        marginLeft:15,
                        position:'absolute'}}>
                        <MaterialIcon name='arrow-back-ios' size={30} color={'#000'}/>
                    </TouchableOpacity>
                        <Text style={{
                            fontSize:24,
                            fontWeight:'bold',
                            justifyContent:'center',
                            marginLeft:70,
                            color:'#000'
                        }}>Sales service</Text>
                    <TouchableOpacity onPress={NavigateShoppingCart} style={{position:'absolute',right:60}}>
                        <MaterialIcon name="shopping-cart" size={30} color={'#000'}
                            style={{alignItems:'center',
                            padding:15}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={NavigatetoManaServiceOr} style={{position:'absolute',right:0}}>
                        <MaterialIcon name="menu" size={30} color={'#000'}
                            style={{alignItems:'center',
                            padding:15}}/>
                    </TouchableOpacity>
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
        flexDirection:'row',
        alignItems:'center',    

    }
})

