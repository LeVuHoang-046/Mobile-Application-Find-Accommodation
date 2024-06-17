import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShadowStyle1 } from "../../../constants/ShadowStyle";
import AntIcon from 'react-native-vector-icons/AntDesign';
import { screenWidth } from "../../../constants/WindowWidth";

export const Notification = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor='#ffffff' barStyle={'dark-content'} translucent={true}/>
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
                        }}>Notification</Text>
                </View>
                <View style={{backgroundColor:'#EEEEEE',height:1000,marginTop:60}}>                    
                    
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
})

