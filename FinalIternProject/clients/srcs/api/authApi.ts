import {api} from '@services';

interface ApiResponse {
  message: string;
}

class AuthAPI {
  handleAuthentication = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ): Promise<ApiResponse> => {
    return await api(`/auth${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}
const authenticationAPI = new AuthAPI();
export default authenticationAPI;
