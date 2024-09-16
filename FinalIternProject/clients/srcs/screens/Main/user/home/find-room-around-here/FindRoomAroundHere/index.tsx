import { Box, HeaderApp, LoadingComponent, performanceNavigation, PerformanceNavigationHOC } from "@component";
import { BoxFindRoomAroundHere } from "./BoxFindRoomAroundHere";

 const FindRoomAroundHereScreen: React.FC<PerformanceNavigationHOC> = ({navigateFinish}) => {
    return (
        <Box>
            <HeaderApp
            title="Find room around here"
            goBack
            />
            {navigateFinish ? (
               <BoxFindRoomAroundHere/>
            ): (
                <LoadingComponent/>
            )}
        </Box>
    )
 };
 export const FindRoomAroundHere = performanceNavigation(FindRoomAroundHereScreen);