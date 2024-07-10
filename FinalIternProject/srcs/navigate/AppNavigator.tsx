import { NavigationContainer } from "@react-navigation/native";
import { ForwardRefComponent } from "@types";
import React from "react";
import { Stack } from "./stack";

const NavigationApp: ForwardRefComponent<any, {}> = React.forwardRef(
    (_, ref: any) => {
        const renderStackApp = () => {
            return <Stack.MainStackComponent />
        }
        return (
            <NavigationContainer ref={ref}>
                {renderStackApp()}
            </NavigationContainer>
        )
    },
);

export { NavigationApp };
