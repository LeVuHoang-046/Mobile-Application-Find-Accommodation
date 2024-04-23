import { SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View , Text } from "react-native";

const LoginScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'rgba(68, 80, 251, 0.8)'} barStyle="dark-content"></StatusBar>
            <View style={styles.header}>
            {/* START LOGIN/SIGN UP FORM */}
            </View>
            <View style={styles.form}>
                <TextInput placeholder="Phone number" keyboardType="phone-pad" style={styles.input} ></TextInput>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.text_login}>Login</Text>
                </TouchableOpacity>
                <View style={styles.sign_up}>
                <Text style={{ fontSize:14, color:'#000'}}>Don't have an account yet?</Text>
                <TouchableOpacity>
                    <Text style={styles.sign_up_text}>Sign Up</Text>
                </TouchableOpacity>

                </View>
            </View>
            {/* END LOGIN/SIGN UP FORM */}
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container:{
       backgroundColor:'#EEEEEE',
        flex: 1
    },
    header:{
        backgroundColor:'#7AA2E3',
        height:'40%',
        borderBottomRightRadius:40,
        borderBottomLeftRadius: 40,
        position:'absolute',
        top:0,
        left:0,
        right:0,
       
    },
    form:{
        backgroundColor: '#fff',
        width:'90%',
        paddingVertical: 15,
        alignSelf:'center',
        top: '30%',
        borderRadius: 25, 


       
    },
    input:{
        margin:15,
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 30, 
        textAlign:'center',
        fontSize: 18,
        

    },
    btn:{
        backgroundColor:'#2AA8D6',
        paddingVertical: 15,
        marginLeft: 15,
        marginRight:15,
        marginTop:5,
        borderRadius: 30, 
        alignItems:'center',

    },
    text_login:{
        fontSize: 18,
        color:'#ffffff'
    },
    sign_up:{
        flexDirection:'row',
        paddingVertical: 20,
        justifyContent:'center',
       
    },
    sign_up_text:{
        marginLeft:15,
        color:'#2AA8D6',
        fontSize:14
    }




})

export default LoginScreen;