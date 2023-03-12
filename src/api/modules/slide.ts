import { ISlide } from '@/core';
import { http } from '../http';

export type AISlideForm = Partial<Pick<ISlide, 'background' | 'notes'>>;

export const SlideAPI = {
  get(id: number) {
    return http.get<ISlide>(`/slides/${id}`);
  },
  create(form: { workspaceId: number; background?: ISlide['background'] }) {
    return http.post<ISlide>(`/slides/create`, form);
  },
  delete(id: number) {
    return http.delete(`/slides/${id}`);
  },
  update(id: number, options: AISlideForm) {
    return http.patch(`/slides/${id}`, options);
  },
  copy(id: number) {
    return http.post<ISlide>(`/slides/${id}/copy`);
  },
};
