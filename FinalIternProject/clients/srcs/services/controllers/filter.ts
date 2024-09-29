import api from "@services/axiosClient";
import { routes } from "@services/routes";
import { FacilityType, InteriorType } from "@types";

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