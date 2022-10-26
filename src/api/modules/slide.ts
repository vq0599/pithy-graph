import { ISlide } from '@/structs'
import { http } from '../http'

export const SlideAPI = {
  get(id: number) {
    return http.get<ISlide>(`/slides/${id}`)
  },
  create({ workspaceId }: { workspaceId: number }) {
    return http.post<ISlide>(`/slides`, { workspaceId })
  },
  delete(id: number) {
    http.delete(`/slides/${id}`)
  }
}