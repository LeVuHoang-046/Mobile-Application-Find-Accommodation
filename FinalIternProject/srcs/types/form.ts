import { ESort } from "@constants";
import { ItemPickerDateType, ItemPickerType } from "./common";

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

export type FormsSearchForNews = {
    price: ItemPickerType;
    sortBy: ItemPickerType;
    area: ItemPickerType;
    roomType: ItemPickerType;
    postType: ItemPickerType;
    amentitiesType: ItemPickerType;
    interior: ItemPickerType;
    sort: ESort;
}