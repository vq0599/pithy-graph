import { ISlide } from '@/core';
import { http } from '../http';

const formatParams = <T extends Record<string, any>>(
  params: T,
  jsonFields: (keyof T)[]
) => {
  const ret: Record<string, string> = {};
  for (const key in params) {
    if (jsonFields.includes(key)) {
      ret[key] = JSON.stringify(params[key]);
    }
  }
  return Object.assign({}, params, ret);
};

export const SlideAPI = {
  get(id: number) {
    return http.get<ISlide>(`/slides/${id}`);
  },
  create({ workspaceId }: { workspaceId: number }) {
    return http.post<ISlide>(`/slides`, { workspaceId });
  },
  delete(id: number) {
    return http.delete(`/slides/${id}`);
  },
  update(id: number, options: Pick<ISlide, 'background' | 'notes'>) {
    return http.patch(`/slides/${id}`, formatParams(options, ['background']));
  },
  copy(id: number) {
    return http.post<ISlide>(`/slides/${id}/copy`);
  },
};
