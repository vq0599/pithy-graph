import { http } from '../http';
import { ResponseWrapper } from '../base';
import { IUser } from '@/structs';

interface UserRegisterForm {
  nickname: string;
  phone?: string;
  email?: string;
  password: string;
  invitedByCode: string;
  verificationCode: string;
}

export const UserAPI = {
  login(account: string, password: string) {
    return http.post<ResponseWrapper<{ phone: string; token: string }>>(
      '/auth/users/login',
      {
        phone: account,
        password,
      }
    );
  },
  register(form: UserRegisterForm) {
    return http.post('/auth/users/create', form);
  },
  getCurrent() {
    return http.get<ResponseWrapper<IUser>>('/users/userinfo');
  },
};
