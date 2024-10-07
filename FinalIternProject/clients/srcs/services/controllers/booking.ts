import api from "@services/axiosClient";
import { routes } from "@services/routes";
import { BookingInfoType } from "@types";

export const getBookingsByStatus = async (status: number): Promise<BookingInfoType[]> => {
    try {
        // Append status to the API endpoint if it is provided
        const res = await api.get<BookingInfoType[]>(`${routes.api.bookings}`, {
            params: { status }, // Add status as a query parameter
        });
        console.log('API Response:', res); // Log the entire response object
        console.log('Data:', res.data); // Log the data property
        return res.data;
    } catch (error) {
        console.error(`Error fetching bookings for status ${status}:`, error);
        throw error;
    }
};