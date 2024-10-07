export type UserMeType = {
    user_id: number;
    fullName: string;
    phone: string;
    email: string;
    role: number;
};
export type BoardingHouseInfoType = {
    id: number;
    staff_id: number;
    staff_name: string;
    staff_phone: string;
    title: string;
    email: string;
    name_building: string;
    type_house: number;
    parking_space: string;
    description: string;
    detail_address: string;
    city_name: string;
    district_name: string;
    ward_name: string;
    facilities: string[];
}

export type BoardingHouseDetailType = {
    manaBoardingHouse: BoardingHouseInfoType;
    manaRoom: RoomInfoType;
}


export type RoomInfoType = {
    id: number,
    name: string;
    price: string;
    area: number;
    deposit: string;
    floor: number;
    capacity: number;
    gender: number;
    status: number;
};

export type FacilityType = {
    id: number;
    name: string;
    icon: string;
  };

  export type InteriorType = {
    id: number;
    name: string;
    icon: string;
  };

  export type ImagesRoomType = {
    id: string;
    image_url: string;
  }

  export interface CityType {
    id: number;
    name: string;
}

export interface DistrictType {
    id: number;
    name: string;
    cityId?: number;
}

export interface WardType {
    id: number;
    name: string;
    districtId?: number;
}
export type BookingInfoType = {
    id: number;
    boarding_house_id: number;
    user_id: number;
    customer_name: string;
    phone_number: string;
    booking_date: number | null;
    boarding_house_title: string;
    room_id: number;
    status: number;
};
