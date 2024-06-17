export type RootStackParamList = {
    Service: undefined,
    HomeViewPager: undefined,
    HomeScreen: undefined,
    

}

export type NavigateParamList = {
    NavigateToManaPostScreen: undefined,
    NavigatetoManaServiceOr: undefined,
    NavigatetoAppointmentSchedule: undefined,
    NavigatetoBills: undefined,
    NavigatetoContracts: undefined,
    NavigatetoLikedPost: undefined,
    NavigatetoTermPolicies: undefined,
    NavigatetoReportProblem: undefined
}

export type NavigateHomeScreenParamList = NavigateServiceScreenParamList& {
    NavigateNotification: undefined,
    NavigateFindPostScreen: undefined
}

export  type NavigateServiceScreenParamList = {
    NavigateDesignRoomService: undefined,
    NavigateRepairService: undefined,
    NavigateLaudryService: undefined,
    NavigateWaterService: undefined,
    NavigateGasService: undefined,
    NavigateTransportService: undefined,
    NavigatetoManaServiceOr: undefined,
    NavigateShoppingCart: undefined,
}