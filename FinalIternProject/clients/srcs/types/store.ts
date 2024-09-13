export type TokenUserTypeStore = {
    token?: string;
    setToken: (token: string) => void;
    clearToken: () => void;
  };