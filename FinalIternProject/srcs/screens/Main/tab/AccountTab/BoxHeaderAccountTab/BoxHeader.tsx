import { Icons, Images } from "@assets";
import { Absolute, AvatarUser, Box, ImageApp, TextApp } from "@component";
import { ColorsStatic, screenWidth, ShadowStyle } from "@constants";
import { scaler } from "@themes";
import { memo } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

export const BoxHeader: React.NamedExoticComponent = memo(() => {
    return (
        <>
            {/* ============= HEADER ================== */}
            <Box style={styles.header}>
                <Absolute right={15} top={15}>
                    <TouchableHighlight>
                        <Icons.Setting />
                    </TouchableHighlight>
                </Absolute>
            </Box>
            {/* ===================== START ACCOUNT BOARD ==================== */}
            <Absolute top={scaler(145)}>
                <TouchableOpacity activeOpacity={1} style={styles.accountButton}>
                    <Box style={styles.avatar}>
                        <AvatarUser size={50} />
                    </Box>
                    <Box ml={scaler(10)} style={{ flex: 0.85 }}>
                        <TextApp>Le Vu Hoang</TextApp>
                        <TextApp pt={scaler(10)}>0123456789</TextApp>
                    </Box>
                        <Icons.ArrowRight size={22} color="#000"/>
                </TouchableOpacity>
            </Absolute>
        </>
    )
})
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ccc',
        height: scaler(180),
        justifyContent: 'center', // align subHeader vertically
    },
    subHeader: {
        height: 50,
        width: screenWidth - 30,
        flexDirection: 'row',
        marginHorizontal: 15,
        flex: 0.4,
        justifyContent: 'center',
    },
    subHeaderItem2: {
        flex: 0.6,
        justifyContent: 'center',
        marginLeft: '15%',
        flexDirection: 'row',
    },
    buttonHead1: {
        width: 130,
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'black',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderWidth: 3,
        borderColor: '#ffffff',

    },
    buttonHead2: {
        width: '100%',
        height: '70%',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
        paddingTop: 4,
        flexDirection: 'row'
    },
    buttonHText1: {
        color: '#ffffff',
        marginLeft: 10,
        fontWeight: '700',

    },
    buttonHText2: {
        fontSize: 16,
        color: 'red',
        marginLeft: 5,
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    accountButton: {
        backgroundColor: ColorsStatic.white,
        zIndex: 100,
        borderRadius: scaler(15),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaler(70),
        marginHorizontal: scaler(15),
        width: screenWidth - 30,
        padding: scaler(10)


    },
    settingBoard: {
        width: screenWidth - 30,
        height: 570,
        backgroundColor: '#ffffff',
        marginTop: 15,
        borderRadius: 20,

    },
    avatar: {
        width: '100%',
        height: '100%',
        flex: 0.15,

    }
})