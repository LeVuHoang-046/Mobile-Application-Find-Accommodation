import { EQueryKey } from "@constants";
import { getUserInformation, getUsersByRole } from "@services";
import { useQuery } from "@tanstack/react-query";

export const useQueryUserInformation = (phoneNumber: string) => {
    return useQuery({
      queryKey: [EQueryKey.UserInformation, phoneNumber], 
      queryFn: () => getUserInformation(phoneNumber),
      enabled: !!phoneNumber, // Only run the query if phoneNumber is available
      // staleTime: Infinity, 
    });
};

export const useQueryUsersByRole = (roles: number | number[]) => {
    return useQuery({
        queryKey: [EQueryKey.UsersByRole, Array.isArray(roles) ? roles.join(',') : roles],
        queryFn: () => getUsersByRole(roles),
        enabled: !!roles, // Only run the query if roles are available
    });
};
