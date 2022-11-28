import { computed, watch, ref, onMounted } from 'vue';
import { IElement } from '../types';
import { useEditLayerInject, useInject } from '../store';
import { useDrag } from './drag';

export const useElement = (data: IElement) => {
  const { current, readonly, emitSelect } = useInject();
  if (readonly.value) return {};
  const { setRect } = useEditLayerInject();
  const active = computed(() => current.value?.id === data.id);
  const element = ref<HTMLDivElement>();
  const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
    const { width, height } = contentRect;
    setRect({ width, height });
  });

  const toggleSetRect = (_active: boolean) => {
    if (_active) {
      // 默认会执行一次
      resizeObserver.observe(element.value!);
    } else {
      resizeObserver.unobserve(element.value!);
    }
  };

  watch(active, toggleSetRect);

  onMounted(() => {
    if (!element.value) return;
    element.value.addEventListener('mousedown', () => emitSelect(data.id));
    // 新添加元素默认选中
    if (active.value) {
      toggleSetRect(true);
    }
  });

  useDrag(element);

  return {
    element,
    current,
  };
};
