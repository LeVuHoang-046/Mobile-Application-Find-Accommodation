// useAuth.ts
import { useQuery } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import { TokenUserTypeStore } from '@types';
import { createJSONStorage, persist } from 'zustand/middleware';
import {create} from 'zustand';
import { StorageKeys } from '@constants';
import { zustandStorage } from '@storages';

// const fetchToken = async () => {
//   const user = auth().currentUser;
//   if (user) {
//     const idToken = await user.getIdToken();
//     console.log('Fetched ID Token:', idToken);
//     return idToken;
//   }
//   return null;
// };

export const useTokenUserStore = create<TokenUserTypeStore>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token: string) => {
        set({ token });
      },
      clearToken: () => set({ token: undefined }),
    }),
    {
      name: StorageKeys.TokenUserStore,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
