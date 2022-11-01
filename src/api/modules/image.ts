import { http } from '../http'

export const ImageAPI = {
  getAll() {
    return http.get<string[]>(`/images`)
  },

  upload(file: File) {
    http.post(`/images/upload`, { file })
  }
}