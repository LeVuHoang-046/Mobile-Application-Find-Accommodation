import { Box, HeaderApp, LoadingComponent, performanceNavigation, PerformanceNavigationHOC } from "@component"
import { BoxUpdateInformation } from "./BoxUpdateInformation"

const UpdateInformationScreen: React.FC<PerformanceNavigationHOC> = ({navigateFinish}) => {
    return (
        <Box flex={1}>
            <HeaderApp
            title="Update information"
            goBack
            />
            {navigateFinish ? (
                <BoxUpdateInformation/>
            ): (
                <LoadingComponent/>
            )}
        </Box>

    )
};

export const UpdateInformation = performanceNavigation(UpdateInformationScreen);