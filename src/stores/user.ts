import { UserAPI } from '@/api/modules/user';
import { IUser } from '@/structs';
import { defineStore } from 'pinia';

interface State {
  current?: IUser;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    current: undefined,
  }),
  actions: {
    async initialize() {
      const {
        data: { data: user },
      } = await UserAPI.getCurrent();
      this.current = user;
    },
  },
});
