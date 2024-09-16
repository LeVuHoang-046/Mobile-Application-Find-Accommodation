import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShadowStyle1 } from "../../../../constants/ShadowStyle";
import AntIcon from 'react-native-vector-icons/AntDesign';
import { screenWidth } from "../../../../constants/WindowWidth";

export const ShoppingCart = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor='red' barStyle={'dark-content'}/>
            <View style={{flex:1}}>
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
                        }}>Shopping cart</Text>
                </View>
                <View style={{backgroundColor:'#EEEEEE',height:1000,marginTop:60}}>                    
                </View>
                <TouchableOpacity style={{
                    position:'absolute',
                    bottom:0,
                    right:0, alignItems:'center',
                    left:0, justifyContent:'center',
                    width:screenWidth-30,
                    margin:15,backgroundColor:'red',
                    padding:15, borderRadius:15}}>
                    <Text style={{fontSize:20, fontWeight:'bold',color:'#ffffff'}}>Order</Text>
                </TouchableOpacity>
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

