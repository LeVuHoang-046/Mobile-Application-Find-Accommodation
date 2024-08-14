import { ColorsStatic } from "@constants";
import { scaler } from "@themes";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet({
    accountButton: {
        backgroundColor: ColorsStatic.white,
        borderRadius: scaler(15),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaler(80),
        marginHorizontal: scaler(15),
        marginTop: scaler(15),
        padding: scaler(10),
      },
    
      avatar: {
        width: '100%',
        height: '100%',
        flex: 0.15,
        justifyContent: 'center',
      },
})