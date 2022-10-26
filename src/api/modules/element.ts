import { IElement, IElementTypes } from '@/structs'
import { http } from '../http'

export const ElementAPI = {
  create(slideId: number, type: IElementTypes, options: Partial<IElement>) {
    if (options.payload) {
      options.payload = JSON.stringify(options.payload)
    }
    return http.post<IElement>(`/elements`, {
      ...options,
      slideId,
      type
    })
  },
  delete(id: number) {
    http.delete(`/elements/${id}`)
  },
  update(id: number, options: Partial<IElement>) {
    if (options.payload) {
      options.payload = JSON.stringify(options.payload)
    }
    http.patch(`/elements/${id}`, options)
  }
}