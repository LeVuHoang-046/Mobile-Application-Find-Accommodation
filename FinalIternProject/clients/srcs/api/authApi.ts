import {CONFIG_SSO} from '@constants';
import { api } from '@services';


class AuthAPI {
  handleAuthentication = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete'
  ) => {
    return await api(`${CONFIG_SSO.BASE.URL}/auth${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}
const authenticationAPI = new AuthAPI();
export default authenticationAPI;
