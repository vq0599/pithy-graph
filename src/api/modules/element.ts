import { IElement, IElementTypes } from '@/core';
import { http } from '../http';

export const ElementAPI = {
  get(id: number) {
    return http.get<IElement>(`/elements/${id}`);
  },
  create(slideId: number, type: IElementTypes, options: Partial<IElement>) {
    return http.post<IElement>(`/elements/create`, {
      ...options,
      type,
      slideId,
    });
  },
  delete(id: number) {
    return http.delete(`/elements/${id}`);
  },
  update(id: number, options: Partial<IElement>) {
    return http.patch(`/elements/${id}`, options);
  },
  bulkUpdate(body: Record<number, Partial<IElement>>) {
    return http.patch(`/elements/bulk`, body);
  },
  copy(id: number, slideId: number) {
    return http.post<IElement>(`/elements/${id}/copy`, { slideId });
  },
};
