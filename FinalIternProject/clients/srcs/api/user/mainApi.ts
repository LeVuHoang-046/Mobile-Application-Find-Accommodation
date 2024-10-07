import {api} from '@services'; // Ensure this points to your API service file

interface ApiResponse {
  message: string;
}

class BookingAPI {
  // Method for creating a booking
  // Method for creating a booking
  createBooking = async (bookingData: any): Promise<ApiResponse> => {
    try {
      // Convert booking date to YYYY-MM-DD format
      const bookingDate = new Date(bookingData.booking_date);
      const formattedBookingDate = bookingDate.toISOString().split('T')[0];

      // Create data object to send
      const dataToSend = {
        ...bookingData,
        booking_date: formattedBookingDate, // Use the correctly formatted date
      };

      console.log('Booking data to be sent:', dataToSend); // Log the data being sent

      return await api(`/api/bookings`, {
        method: 'post',
        data: dataToSend,
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error; // Propagate error to handle it in the calling function
    }
  };
}
// class Booking {
//     getBooking = async (
//       url: string,
//       data?: any,
//       method?: 'get' | 'post' | 'put' | 'delete',
//     ): Promise<ApiResponse> => {
//       return await api(`/api${url}`, {
//         method: method ?? 'get',
//         data,
//       });
//     };
//   }
//   const booking = new Booking();

const bookingAPI = new BookingAPI();

export default bookingAPI;
