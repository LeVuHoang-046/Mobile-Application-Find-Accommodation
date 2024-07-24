import { ItemPickerDateType } from "./common";

export type FormsAppointmentSchedule = {
    search: string;
    time: ItemPickerDateType;
};

export type FormsBills = {
    time: ItemPickerDateType;
}

export type FormsContract = {
    time: ItemPickerDateType;
}