import { EQueryKey } from "@constants";
import { getBookingsByStatus } from "@services";
import { useQuery } from "@tanstack/react-query";
import { BookingInfoType } from "@types";

export const useQueryBookingsByStatus = (status: number) => {
    return useQuery<BookingInfoType[]>({
      queryKey: [EQueryKey.BookingByStatus, status], // Unique key for caching and tracking
      queryFn: () => getBookingsByStatus(status),
      enabled: status !== undefined, // Only run the query if status is provided
    });
  };