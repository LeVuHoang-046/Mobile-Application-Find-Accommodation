import { EQueryKey } from "@constants";
import { getFacilitiesFilter, getInteriorsFilter } from "@services/controllers/filter";
import { useQuery } from "@tanstack/react-query";
import { FacilityType } from "@types";

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