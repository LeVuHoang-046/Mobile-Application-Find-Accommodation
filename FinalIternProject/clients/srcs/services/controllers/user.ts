import api from "@services/axiosClient";
import { routes } from "@services/routes";
import { UserMeType } from "@types";

export const getUserInformation = async (phoneNumber: string): Promise<UserMeType> => {
    try {
      // Make the API call with the phone number as a query parameter
      const res = await api.get<UserMeType>(routes.user.me, {
        params: {
          phoneNumber: phoneNumber,
        },
      });
  
      // Return the user information from the response
      console.log('dataaa: ',res.data)
      return res.data;
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };