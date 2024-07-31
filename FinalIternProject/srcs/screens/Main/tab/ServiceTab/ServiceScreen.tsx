import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from '../../../../constants/WindowWidth';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ShadowStyle } from "../../../../constants/ShadowStyle";
import { Box, HeaderApp } from "@component";

interface ServiceItem {
    icon: string;
    text: string;
    action: () => void;
}
interface Props {
    navigation: StackNavigationProp<any>;
}

export const ServiceScreen = () => {
   

    const RenderServiceItems: React.FC<ServiceItem> = ({ icon, text, action }) => {
        return (
            <TouchableOpacity onPress={action} style={[styles.serviceItem, ShadowStyle]}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <CommunityIcon name={icon} size={60} color={'#000'} />
                    <Text style={styles.serviceText}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <Box flex={1}>
            <HeaderApp
                title="Sales service"
                isImageBg
            />
         
            <View style={{ top: 60, marginHorizontal: 15 }}>
                <ScrollView
            
                    contentContainerStyle={{ height: 800, backgroundColor: '#EEEEEE' }}>
                   
                </ScrollView>

            </View>

        </Box>
        // </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    // headersection: {
    //     width: screenWidth,
    //     backgroundColor: '#ffffff',
    //     height: 60,
    //     position: 'absolute',
    //     zIndex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    // },
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
