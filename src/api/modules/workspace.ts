import { http } from '../http';
import { IWorkspace } from '@/structs';

export type AIWorkspaceForm = Pick<
  IWorkspace,
  'title' | 'music' | 'transition' | 'voice' | 'captionEnable'
>;

export const WorkspaceAPI = {
  getAll() {
    return http.get<Remove<IWorkspace, 'slides'>[]>('/workspaces');
  },

  getOne(id: number) {
    return http.get<IWorkspace>(`/workspaces/${id}`);
  },

  update(id: number, options: Partial<AIWorkspaceForm>) {
    return http.patch<IWorkspace>(`/workspaces/${id}`, options);
  },
  create(options: Partial<AIWorkspaceForm>) {
    return http.post<IWorkspace>(`/workspaces/create`, options);
  },
};
