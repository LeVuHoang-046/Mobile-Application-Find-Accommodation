import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntIcon from 'react-native-vector-icons/AntDesign';
import { screenWidth, ShadowStyle1 } from "@constants";
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopbarBills from "../../../../viewpager/TopbarBills";
 export const Bills = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'}/>
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
                    }}>Order List</Text>
                    <TouchableOpacity style={{
                        position:'absolute',
                        right:0,
                        marginRight:15
                    }}>
                        <CommunityIcon name="calendar-blank" size={30} color={'#000'}/>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#EEEEEE',height:1000,marginTop:60}}>                    
                    <TopbarBills/>
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
