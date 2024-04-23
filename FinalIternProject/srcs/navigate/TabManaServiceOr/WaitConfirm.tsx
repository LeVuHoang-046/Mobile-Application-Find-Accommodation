import { Text, View } from "react-native";

const WaitConfirm = () => {
    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#EEEEEE'
        }}>
            <Text style={{color:'#000', fontSize:20}}>Comfirming</Text>
        </View>
    );
};

export default WaitConfirm;