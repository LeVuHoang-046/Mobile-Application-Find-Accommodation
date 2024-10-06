import { EQueryKey } from "@constants";
import { getUserInformation } from "@services";
import { useQuery } from "@tanstack/react-query";

export const useQueryUserInformation = (phoneNumber: string) => {
    return useQuery({
      queryKey: [EQueryKey.UserInformation, phoneNumber], 
      queryFn: () => getUserInformation(phoneNumber),
      enabled: !!phoneNumber, // Only run the query if phoneNumber is available
      // staleTime: Infinity, 
    });
};