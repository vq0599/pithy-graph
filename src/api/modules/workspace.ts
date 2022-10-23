import { http } from '../http'
import { IWorkspace } from '@/structs'

export const WorkspaceAPI = {
  getAll() {
    return http.get<Remove<IWorkspace, 'slides'>[]>('/workspaces')
  },

  getOne(id: number) {
    return http.get<IWorkspace>(`/workspaces/${id}`)
  }
}