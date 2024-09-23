import { Box, HeaderApp, LoadingComponent, performanceNavigation, PerformanceNavigationHOC } from "@component";

 const ManageBuildingScreen: React.FC<PerformanceNavigationHOC> = ({navigateFinish}) => {
    
    return (
        <Box flex={1}>
            <HeaderApp
            title="Manage boarding house"
            goBack
            />
            {navigateFinish ? (
                <Box>
                    
                </Box>
            ) : (
                <LoadingComponent/>
            )}
        </Box>
    )
};

export const ManageBuilding = performanceNavigation(ManageBuildingScreen);
