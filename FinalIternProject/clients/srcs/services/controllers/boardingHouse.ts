import api from "@services/axiosClient";
import { routes } from "@services/routes";
import { BoardingHouseInfoType, FacilityType, ImagesRoomType, InteriorType, RoomInfoType } from "@types";
import axios from "axios";

// Function to get boarding house information
export const getBoardingHouseInfo = async (): Promise<BoardingHouseInfoType[]> => {
  try {
  
    const res = await api.get<BoardingHouseInfoType[]>(routes.api.boardingHouse.infor);
    
 
    return res.data; 
  } catch (error) {
    console.error('Error fetching boarding house information:', error);
    throw error; 
  }
};

// Service function to get the details of a specific boarding house by ID
export const getBoardingHouseDetailById = async (id: number): Promise<BoardingHouseInfoType> => {
    try {
    
      const res = await api.get<BoardingHouseInfoType>(`${routes.api.boardingHouse.infor}/${id}`);
      
     
      return res.data;
    } catch (error) {
      console.error(`Error fetching boarding house details for ID ${id}:`, error);
      throw error; 
    }
  };

  export const getRoomsByBoardingHouseId = async (boardingHouseId?: number): Promise<RoomInfoType[]> => {
    try {
      const res = await api.get<RoomInfoType[]>(`${routes.api.boardinghouse}/${boardingHouseId}/rooms`);

      return res.data; 
    } catch (error) {
      console.error(`Error fetching rooms for boarding house ID ${boardingHouseId}:`, error);
      throw error; 
    }
  };
  
  
  export const getRoomDetailById = async (roomId: number): Promise<RoomInfoType> => {
    try {
      const res = await api.get<RoomInfoType>(`${routes.api.boardingHouse.rooms}/${roomId}`);
      console.log('getRoomDetailById', res.data)
      return res.data;
    } catch (error) {
      console.error(`Error fetching room details for room ID ${roomId}:`, error);
      throw error; 
    }
  };

  export const updateRoomStatusById = async (roomId: number, status: number): Promise<void> => {
    try {
      await api.put(`/api/rooms/${roomId}/status`, { status });
    } catch (error) {
      console.error(`Error updating room status for room ID ${roomId}:`, error);
      throw error;
    }
  };

  export const deleteRoomById = async (roomId: number): Promise<void> => {
    try {
      await api.delete(`/api/boarding-house/rooms/${roomId}`);
      console.log(`Room with ID ${roomId} has been deleted`);
    } catch (error) {
      console.error(`Error deleting room with ID ${roomId}:`, error);
      throw error;
    }
  };
  

  export const getFacilitiesByRoomId = async (room?: number): Promise<FacilityType[]> => {
    try {
      const res = await api.get<FacilityType[]>(`${routes.api.boardingHouse.facilities(room)}`);
      return res.data; 
    } catch (error) {
      console.error(`Error fetching facilities for room ID ${room}:`, error);
      throw error; 
    }
  };

  export const getInteriorsByRoomId = async (room?: number): Promise<InteriorType[]> => {
    try {
      const res = await api.get<InteriorType[]>(`${routes.api.boardingHouse.interiors(room)}`);
      return res.data; 
    } catch (error) {
      console.error(`Error fetching interiors for room ID ${room}:`, error);
      throw error; 
    }
  };
  
  export const getImagesByRoomId = async (room?: number): Promise<ImagesRoomType[]> => {
    try {
      const res = await api.get<ImagesRoomType[]>(`${routes.api.boardingHouse.images(room)}`);
      return res.data; 
    } catch (error) {
      console.error(`Error fetching images for room ID ${room}:`, error);
      throw error; 
    }
  };

  export const createRoom = async (formData: FormData) => {
    try {
      const response = await axios.post('/api/rooms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in creating room:', error);
      throw error;
    }
  };
