import {scaler} from '@themes/scaler';
import {dimensions} from './app';
import {ColorsStatic} from './Colors';
import {FontSize} from '@themes/size';
import {Icons} from '@assets';

export const initItemPicker = {
  label: '',
  value: '',
};

export const initDatePicker = {
  startDate: null,
  endDate: null,
};
export const SnapPointsFilter = [dimensions.height - scaler(60)];
export const ItemPickerAll = 'item_picker_all';

export const HeightPicker = scaler(32);

export const MONTHS = [
  {label: 'Tháng 1', value: '01'},
  {label: 'Tháng 2', value: '02'},
  {label: 'Tháng 3', value: '03'},
  {label: 'Tháng 4', value: '04'},
  {label: 'Tháng 5', value: '05'},
  {label: 'Tháng 6', value: '06'},
  {label: 'Tháng 7', value: '07'},
  {label: 'Tháng 8', value: '08'},
  {label: 'Tháng 9', value: '09'},
  {label: 'Tháng 10', value: '10'},
  {label: 'Tháng 11', value: '11'},
  {label: 'Tháng 12', value: '12'},
];

export const PADDING_BOTTOM_LIST = scaler(60);
export const HEIGHT_ITEM_PICKER = scaler(36);
export const MAX_HEIGHT_MODAL = (2 * dimensions.height) / 3;

export const ThemeCalendar: any = {
  textSectionTitleColor: ColorsStatic.blue4,
  textDayFontFamily: 'Mulish-SemiBold',
  textDayHeaderFontFamily: 'Mulish-Medium',
  textDayFontSize: FontSize.Font13,
  textDayHeaderFontSize: FontSize.Font13,
  textMonthFontFamily: 'Mulish-SemiBold',
  textDayFontWeight: '500',
  textDayHeaderFontWeight: '700',
  textMonthFontWeight: '600',
};

export const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

export enum ELoadingApp {
  Default,
  Printer,
  None,
}

export enum ETypeRoles {
  Admin = 0,
  Staff = 1,
  User = 2,
}
export enum ETypeHouses {
  Motel = 'Motel',
  Apartment = 'Apartment',
  MiniApartment = 'MiniApartment',
  Homestay = 'Homestay',
}

export enum EStatusBooking {
  Pending = 0,
  Comfirmed = 1,
  Diposited = 2,
  Overdue = 3, 
  Approved = 4,
  Cancelled = 5,
}

export enum EStatusRoom {
  Available = 0,
  Unavailable = 1
}

export const DefaultErrorForm = {
  type: 'required',
  message: 'required',
};

export const serviceIconsArray = [
  {id: 'toilet', icon: Icons.Toilet},
  {id: 'stair', icon: Icons.Stair},
  {id: 'balcony', icon: Icons.Balcony},
  {id: 'finger_print', icon: Icons.FingerPrint},
  {id: 'person', icon: Icons.Person},
  {id: 'pet', icon: Icons.Pet},
  {id: 'clock', icon: Icons.Clock},
  {id: 'air_condition', icon: Icons.AirConditioning},
  {id: 'heater', icon: Icons.Heater},
  {id: 'kitchen_shelf', icon: Icons.KitchenShelf},
  {id: 'fridge', icon: Icons.Fridge},
  {id: 'bed', icon: Icons.Bed},
  {id: 'washing_machine', icon: Icons.WashingMachine},
  {id: 'kitchen_stuff', icon: Icons.KitchenStuff},
  {id: 'table', icon: Icons.Table},
  {id: 'lamp', icon: Icons.Lamp},
  {id: 'picture_decor', icon: Icons.PictureDecord},
  {id: 'tree', icon: Icons.Tree},
  {id: 'pillow', icon: Icons.Pillow},
  {id: 'wardrobe', icon: Icons.Wardrobe},
  {id: 'mattress', icon: Icons.Pillow},
  {id: 'shoes', icon: Icons.Shoes},
  {id: 'curtain', icon: Icons.Curtains},
  {id: 'fan', icon: Icons.Fan},
  {id: 'sofa', icon: Icons.Sofa},
  {id: 'wifi', icon: Icons.Wifi},
  {id: 'electric', icon: Icons.Electric},
  {id: 'water', icon: Icons.Water},
  {id: 'clean_service', icon: Icons.CleanService},
];
