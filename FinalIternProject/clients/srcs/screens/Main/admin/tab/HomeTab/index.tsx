import { Box, TextApp } from "@component"
import { scaler } from "@themes"
import { BoxHeader } from "./BoxHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoxFeature } from "./BoxFeature";


export const HomeTab = () => {
    return (
        <Box flex={1}>
            <SafeAreaView edges={['top']}/>
            <BoxHeader/>
            <BoxFeature/>
            
        </Box>
    )
};