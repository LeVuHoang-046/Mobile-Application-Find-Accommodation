import api from "@services/axiosClient";
import { routes } from "@services/routes";
import { CityType, DistrictType, FacilityType, InteriorType, WardType } from "@types";

export const getFacilitiesFilter = async (): Promise<FacilityType[]> => {
    try {
      const res = await api.get<FacilityType[]>(routes.api.filter.facilities);
      return res.data; 
    } catch (error) {
      console.error(`Error fetching facilities filter:`, error);
      throw error; 
    }
  };

  export const getInteriorsFilter = async (): Promise<InteriorType[]> => {
    try {
      const res = await api.get<InteriorType[]>(routes.api.filter.interiors);
      return res.data; 
    } catch (error) {
      console.error(`Error fetching interiors filter:`, error);
      throw error; 
    }
  };

  export const getCities = async (): Promise<CityType[]> => {
    try {
      const res = await api.get<CityType[]>(routes.api.filter.cities);
      return res.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
};

export const getDistricts = async (cityId?: number): Promise<DistrictType[]> => {
  try {
    const res = await api.get<DistrictType[]>(routes.api.filter.districts(cityId));
    return res.data;
  } catch (error) {
    console.error(`Error fetching districts for city ${cityId}:`, error);
    throw error;
  }
};
export const getWards = async (districtId?: number): Promise<WardType[]> => {
  try {
    const res = await api.get<WardType[]>(routes.api.filter.wards(districtId));
    return res.data;
  } catch (error) {
    console.error(`Error fetching wards for district ${districtId}:`, error);
    throw error;
  }
};


