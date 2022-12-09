import { watch, getCurrentInstance } from 'vue';
import { useInject } from '../store';

export const useRecordRect = (
  id: number,
  target: Parameters<typeof watch>[0]
) => {
  const { emitChange, readonly } = useInject();
  if (readonly.value) return;
  const ins = getCurrentInstance();

  watch(
    target,
    () => {
      const root = ins?.refs.root as HTMLElement | undefined;
      if (!root) {
        console.error(`[record-rect]请在组件根节点设置ref="root"`);
        return;
      }
      const { clientWidth: width, clientHeight: height } = root;
      const changes = { width, height };
      emitChange(id, changes);
    },
    {
      flush: 'post',
    }
  );
};
