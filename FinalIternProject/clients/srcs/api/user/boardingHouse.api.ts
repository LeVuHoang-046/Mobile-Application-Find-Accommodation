import { EQueryKey } from '@constants';
import { getBoardingHouseDetailById, getBoardingHouseInfo, getFacilitiesByRoomId, getImagesByRoomId, getInteriorsByRoomId, getRoomsByBoardingHouseId } from '@services';
import { useQuery } from '@tanstack/react-query';

import { BoardingHouseInfoType, FacilityType, ImagesRoomType, InteriorType, RoomInfoType } from '@types'; 

export const useQueryBoardingHouseInfo = () => {
  return useQuery<BoardingHouseInfoType[]>({
    queryKey: [EQueryKey.BoardingHouse], 
    queryFn: getBoardingHouseInfo, 
  });
};

export const useQueryBoardingHouseDetail = (id: number) => {
    return useQuery<BoardingHouseInfoType>({
      queryKey: [EQueryKey.BoardingHouseDetail, id],
      queryFn: () => getBoardingHouseDetailById(id), 
      enabled: !!id, // Query only runs if `id` is truthy
    });
  };

  export const useQueryRoomsByBoardingHouseId = (boardingHouseId?: number ) => {
    return useQuery<RoomInfoType[]>({
      queryKey: [EQueryKey.RoomsByBoardingHouse, boardingHouseId], 
      queryFn: () => getRoomsByBoardingHouseId(boardingHouseId), 
      enabled: !!boardingHouseId, 
   
    });
  };

  export const useQueryFacilitiesByRoomId = (roomId?: number) => {
    return useQuery<FacilityType[]>({
      queryKey: [EQueryKey.FacilitiesByRoom, roomId], 
      queryFn: () => getFacilitiesByRoomId(roomId), 
      enabled: !!roomId, 
    });
  };

  export const useQueryInteriorsByRoomId = (roomId?: number) => {
    return useQuery<InteriorType[]>({
      queryKey: [EQueryKey.InteriorsByRoom, roomId], 
      queryFn: () => getInteriorsByRoomId(roomId), 
      enabled: !!roomId, 
    });
  };

  export const useQueryImagesByRoomId = (roomId?: number) => {
    return useQuery<ImagesRoomType[]>({
      queryKey: [EQueryKey.ImagesRoomType, roomId], 
      queryFn: () => getImagesByRoomId(roomId), 
      enabled: !!roomId, 
    });
  };
