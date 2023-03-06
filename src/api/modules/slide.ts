import { ISlide } from '@/core';
import { http } from '../http';

// const formatParams = <T extends Record<string, any>>(
//   params: T,
//   jsonFields: (keyof T)[]
// ) => {
//   const ret: Record<string, string> = {};
//   for (const key in params) {
//     if (jsonFields.includes(key)) {
//       // ret[key] = JSON.stringify(params[key]);
//       ret[key] = params[key];
//     }
//   }
//   return Object.assign({}, params, ret);
// };

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
