import { ROUTE_TAB } from "@navigate/routes";
import { createStackNavigator } from "@react-navigation/stack";
import { memo } from "react"

const MainStack = createStackNavigator();
const MainStackComponent = memo(() => {
    return (
        <>
        <MainStack.Navigator
            screenOptions={{
            headerShown: false,
            }}>
            <MainStack.Screen name={ROUTE_TAB.TAB} component={TabNavigator} />

            {StackComponent()}
        </MainStack.Navigator>
        <StatusBar barStyle="dark-content" />
        </>
    )
})