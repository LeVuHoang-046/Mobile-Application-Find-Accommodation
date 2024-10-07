import { EQueryKey } from "@constants";
import { getCities, getDistricts, getFacilitiesFilter, getInteriorsFilter, getWards } from "@services/controllers/filter";
import { useQuery } from "@tanstack/react-query";
import { CityType, DistrictType, FacilityType, WardType } from "@types";

export const useQueryFacilitiesFilter = () => {
    return useQuery<FacilityType[]>({
      queryKey: [EQueryKey.FilterFacilities], 
      queryFn: () => getFacilitiesFilter(), 
      staleTime: Infinity
    });
  };

  export const useQuerInteriorsFilter = () => {
    return useQuery<FacilityType[]>({
      queryKey: [EQueryKey.FilterInteriors], 
      queryFn: () => getInteriorsFilter(), 
      staleTime: Infinity
    });
  };
  export const useQueryCities = () => {
    return useQuery<CityType[]>({
      queryKey: [EQueryKey.FilterCities], 
      queryFn: ()=> getCities(),
      staleTime: Infinity // Keeps the cache alive indefinitely
    });
  };
  export const useQueryDistricts = (cityId?: number) => {
    return useQuery<DistrictType[]>({
      queryKey: [EQueryKey.FilterDistricts, cityId], 
      queryFn: () => getDistricts(cityId),
      staleTime: Infinity,
      enabled: !!cityId // Ensures this query only runs if cityId is available
    });
  };
  export const useQueryWards = (districtId?: number) => {
    return useQuery<WardType[]>({
      queryKey: [EQueryKey.FilterWards, districtId], 
      queryFn: () => getWards(districtId),
      staleTime: Infinity,
      enabled: !!districtId // Ensures this query only runs if districtId is available
    });
  };