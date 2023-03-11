import { http } from '../http';
import * as axios from 'axios';

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
    return http.post<string, number>('/auth/users/login', {
      phone: account,
      password,
    });
  },
  register(form: UserRegisterForm) {
    return http.post('/auth/users/create', form);
  },
};
