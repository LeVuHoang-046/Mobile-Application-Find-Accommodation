import { FormsAppointmentSchedule, FormsBills, FormsContract, FormsSearchForNews, FormsUpdateInformation } from "@types";
import { initDatePicker, initItemPicker } from "./common";
import { ESort } from "./app.enum";

export const defaultAppointmentScheduleValue: FormsAppointmentSchedule = {
    search: '',
    time: initDatePicker,
}

export const defaultBillsValue: FormsBills = {
    time: initDatePicker,
}

export const defaultContractValue: FormsContract = {
    time: initDatePicker,
}

export const defaultSearchForNewsValue: FormsSearchForNews = {
    price: initItemPicker,
    sortBy: initItemPicker,
    area: initItemPicker,
    roomType: [],
    postType: [],
    amentitiesType: [],
    interior: [],
    sort: ESort.DESC,
}

export const defaultUpdateInformationValue: FormsUpdateInformation = {
    fullName: '',
    phoneNumber: '',
    email: '',
    dOB: null,
    gender: initItemPicker,
}