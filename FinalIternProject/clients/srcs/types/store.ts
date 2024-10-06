export type TokenUserTypeStore = {
    token?: string;
    setToken: (token: string) => void;
    clearToken: () => void;
};

export type  PhoneUserTypeStore = {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string) => void;
  clearPhoneNumber: () => void;
}