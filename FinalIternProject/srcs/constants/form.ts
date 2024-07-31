import { FormsAppointmentSchedule, FormsBills, FormsContract, FormsSearchForNews } from "@types";
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
    roomType: initItemPicker,
    postType: initItemPicker,
    amentitiesType: initItemPicker,
    interior: initItemPicker,
    sort: ESort.DESC,
}