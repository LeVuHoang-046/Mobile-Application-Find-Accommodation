import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from '../../../constants/WindowWidth';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigateServiceScreenParamList } from "../../../navigate/types";
import { ShadowStyle } from "../../../constants/ShadowStyle";

interface ServiceItem {
    icon: string;
    text: string;
    action: ()=>void;
}
interface Props {
    navigation: StackNavigationProp<NavigateServiceScreenParamList>;
  }

const ServiceScreen = ({navigation}: Props) => {
    const NavigateDesignRoomService = ()=>{
        navigation.navigate("NavigateDesignRoomService")
    }

    const NavigateRepairService = ()=>{
        navigation.navigate("NavigateRepairService")
    }

    const NavigateLaudryService = ()=>{
        navigation.navigate("NavigateLaudryService")
    }

    const NavigateWaterService = ()=>{
        navigation.navigate("NavigateWaterService")
    }

    const NavigateGasService = ()=>{
        navigation.navigate("NavigateGasService")
    }

    const NavigateTransportService = ()=>{
        navigation.navigate("NavigateTransportService")
    }



    const ServiceItems: ServiceItem[] =[
        {icon:'message-bookmark-outline', text:'room design consultation', action:NavigateDesignRoomService},
        {icon:'message-bookmark-outline', text:'"Electrical and plumbing repair', action:NavigateRepairService},
        {icon:'message-bookmark-outline', text:'Laundry', action:NavigateLaudryService},
        {icon:'message-bookmark-outline', text:'Water container', action:NavigateWaterService},
        {icon:'message-bookmark-outline', text:'Gas', action:NavigateGasService},
        {icon:'message-bookmark-outline', text:'Transport', action:NavigateTransportService},

    ]

    const RenderServiceItems: React.FC<ServiceItem> = ({icon, text, action})=>{
        return(
            <TouchableOpacity onPress={action} style={[styles.serviceItem,ShadowStyle]}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <CommunityIcon name={icon} size={60} color={'#000'} />
                    <Text style={styles.serviceText}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor="transparent" barStyle='light-content' translucent={true}/>
        <View style={{flex:1}}>
            <View style={styles.headersection}>
                <Text style={{fontSize:24,
                    fontWeight:'bold',color:'black',
                    alignSelf:'center',
                    paddingLeft:15}}>Sales service</Text>
                <TouchableOpacity style={{position:'absolute',right:60}}>
                    <MaterialIcon name="shopping-cart" size={30} color={'#000'}
                    style={{alignItems:'center',
                        padding:15}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcon name="menu" size={30} color={'#000'}
                    style={{alignItems:'center',
                        padding:15}}/>
                </TouchableOpacity>
            </View>
            <View style={{top:60, marginHorizontal:15}}>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{height:800,backgroundColor:'#EEEEEE'}}>
                <View style={[styles.serviceItemsContainer]}>
                    {ServiceItems.map((item,index)=>(
                        <React.Fragment key={index}>
                        {RenderServiceItems(item)}
                        </React.Fragment>
                    ))}
                </View>
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
    },
    serviceItemsContainer: {
        width: screenWidth - 30,
        backgroundColor: '#EEEEEE',
        marginTop: 15,
        borderRadius: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        
    },
    serviceItem: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        width: (screenWidth - 50) / 2, // Adjust item width here
        borderRadius: 15,
        marginVertical: 10
    },
    serviceText: {
        fontSize: 16,
        marginLeft: 20,
        color: '#000'
    },
})

export default ServiceScreen;