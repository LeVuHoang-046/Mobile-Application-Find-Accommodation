import {
  FormsAddBuildingDetail,
  FormsAddListRoom,
  FormsAddMoreService,
  FormsAppointmentSchedule,
  FormsBills,
  FormsContract,
  FormsListCustomers,
  FormsListStaffs,
  FormsSearchForNews,
  FormsUpdateInformation,
} from '@types';
import {ESort} from './app.enum';
import {initDatePicker, initItemPicker} from './common';

export const defaultAppointmentScheduleValue: FormsAppointmentSchedule = {
  search: '',
  time: initDatePicker,
};

export const defaultBillsValue: FormsBills = {
  time: initDatePicker,
};

export const defaultContractValue: FormsContract = {
  time: initDatePicker,
};

export const defaultSearchForNewsValue: FormsSearchForNews = {
  search:'',
  price: initItemPicker,
  sortBy: initItemPicker,
  area: initItemPicker,
  roomType: [],
  postType: [],
  amentitiesType: [],
  interior: [],
  sort: ESort.DESC,
};

export const defaultUpdateInformationValue: FormsUpdateInformation = {
  fullName: '',
  phoneNumber: '',
  email: '',
  dOB: null,
  gender: initItemPicker,
};

export const defaultListCustomersValue: FormsListCustomers = {
  search: '',
};
export const defaultListStaffsValue: FormsListStaffs = {
  search: '',
};

export const defaultAddBuildingDetail: FormsAddBuildingDetail = {
  title: '',
  address: '',
  roomType: initItemPicker,
  parkingSpaces: '',
  describe: '',
  listAddRoom: [],
  listAddMoreService: [],
}

export const defaultAddListRoomValue: FormsAddListRoom = {
  id:'',
  roomNumber: '',
  roomPrice: null,
  deposit: null,
  imageRoom: [],
  videoRoom:[],
  area: null,
  floor: null,
  capacity: null,
  gender: initItemPicker,
  facilities: [],
  interior: [],
};

export const defaultAddMoreServiceValue: FormsAddMoreService = {
  id:'',
  nameService: '',
  serviceFee:  null,
  feeBase: initItemPicker,
  iconService: '',
  unit: '',
  note: '',
}