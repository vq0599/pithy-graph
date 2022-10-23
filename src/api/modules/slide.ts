import { ISlide } from '@/structs'
import { http } from '../http'

export const SlideAPI = {
  get(id: number) {
    return http.get<ISlide>(`/slides/${id}`)
  }
}