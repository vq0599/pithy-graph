import { IVoice } from '@/structs';
import { http } from '../http';

export const VoiceAPI = {
  get(id: number | string) {
    return http.get<IVoice>(`/voices/${id}`);
  },
  getList() {
    return http.get<IVoice[]>(`/voices`);
  },
};
