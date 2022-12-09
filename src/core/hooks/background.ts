import { onMounted, onUnmounted, ref } from 'vue';
import { useInject } from '../store';

export const useBackgroundHandle = () => {
  const { emitSelect, readonly } = useInject();
  if (readonly.value) return;
  const root = ref<HTMLElement>();
  const callback = (ev: MouseEvent) => {
    if (ev.target === root.value) {
      emitSelect(0);
    }
  };
  onMounted(() => {
    root.value?.addEventListener('click', callback);
  });
  onUnmounted(() => {
    root.value?.removeEventListener('click', callback);
  });
  return {
    root,
  };
};
