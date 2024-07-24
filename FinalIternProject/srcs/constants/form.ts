import { FormsAppointmentSchedule, FormsBills, FormsContract } from "@types";
import { initDatePicker } from "./common";

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