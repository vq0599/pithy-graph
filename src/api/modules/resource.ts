import { http } from '../http';

export const ResourceAPI = {
  getImages() {
    return http.get<string[]>(`/resource/images`);
  },
  getVideos() {
    return http.get<string[]>(`/resource/videos`);
  },
};
