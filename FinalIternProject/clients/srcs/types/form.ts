import { ESort } from "@constants";
import { ItemPickerDateType, ItemPickerType } from "./common";
import { Image, Video } from "react-native-image-crop-picker";

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
    search: string;
    price: ItemPickerType;
    sortBy: ItemPickerType;
    area: ItemPickerType;
    roomType: ItemPickerType[];
    postType: ItemPickerType[];
    amentitiesType: ItemPickerType[];
    interior: ItemPickerType[];
    sort: ESort;
}

export type FormsUpdateInformation = {
    fullName: string;
    phoneNumber: string;
    email: string;
    dOB: number | null;
    gender: ItemPickerType;
}

export type FormsListCustomers = {
    search: string;
}
export type FormsListStaffs = {
    search: string;
}

export type FormsAddBuildingDetail = {
    title: string;
    address: string;
    roomType: ItemPickerType;
    parkingSpaces: string;
    describe: string;
    listAddRoom: Array<FormsAddListRoom>;
    listAddMoreService: Array<FormsAddMoreService>;
}

export type FormsAddListRoom = {
    id?: string;
    roomNumber: string;
    roomPrice: number | null;
    deposit: number | null;
    imageRoom: Image[];
    videoRoom: Video[];
    area: number | null;
    floor: number | null;
    capacity: number | null;
    gender: ItemPickerType;
    facilities: ItemPickerType[];
    interior: ItemPickerType[];
};

export type FormsAddMoreService = {
    id?: string;
    nameService: string;
    serviceFee: number | null;
    feeBase: ItemPickerType;
    iconService: string;
    unit: string;
    note: string;
}
