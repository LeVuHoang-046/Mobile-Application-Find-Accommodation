import { Box, TextApp } from "@component"
import { scaler } from "@themes"

export const AccountTab = () => {
    return (
        <Box flex={1}>
            <Box width={scaler(400)} height={scaler(400)} justify="center" color={'pink'}>
            <TextApp>Tab</TextApp>
            </Box>
            
        </Box>
    )
}