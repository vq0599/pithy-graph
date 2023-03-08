import { IAvatar } from '@/structs';
import { http } from '../http';

export const AvatarAPI = {
  getList() {
    return http.get<IAvatar[]>(`/avatars`);
  },
};
