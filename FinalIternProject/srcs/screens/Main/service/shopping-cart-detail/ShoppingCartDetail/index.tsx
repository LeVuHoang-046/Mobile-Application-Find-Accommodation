import { Box, HeaderApp } from "@component"
import { BoxShoppingCartDetail } from "./BoxShoppingCartDetail"

export const ShoppingCartDetail = () => {
    return (
        <Box flex={1}>
            <HeaderApp
            title="Shopping cart detail"
            goBack
            />
            <BoxShoppingCartDetail selectedItem={{
                image: undefined,
                title: "",
                price: ""
            }}/>
        </Box>
    )
}