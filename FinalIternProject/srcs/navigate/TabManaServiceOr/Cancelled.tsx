import { Text, View } from "react-native";

const Cancelled = () => {
    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#EEEEEE'
        }}>
            <Text style={{color:'#000', fontSize:20}}>Cancelled</Text>
        </View>
    );
};

export default Cancelled;