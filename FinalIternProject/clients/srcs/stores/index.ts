// useAuth.ts
import { useQuery } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';

const fetchToken = async () => {
  const user = auth().currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    console.log('Fetched ID Token:', idToken);
    return idToken;
  }
  return null;
};

export const useTokenUserStore = () => {
  return useQuery({
    queryKey: ['authToken'],
    queryFn: fetchToken,
    staleTime: 5*60*1000, // Cache token for 5m
    refetchInterval: 5000,
  });
};
