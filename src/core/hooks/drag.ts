import { Ref, onMounted } from 'vue';
import { draggable, DraggableData } from '@/core/utils/draggable';
import { useEditLayerInject, useInject } from '../store';
import { alignLineCalculator } from '@/core/utils/align-line';

const threshold = 5;

/**
 * 元素拖拽Hooks
 */
export const useDrag = (el: Ref<HTMLElement | undefined>) => {
  const { emitChange, scale, moving, current, currentIndex, container } =
    useInject();
  const { setDragData, clearDragData } = useEditLayerInject();

  const onStart = () => {
    // 判断当前是否处于输入状态
    if (document.activeElement !== document.body) {
      return false;
    }
    const { x, y } = current.value!;

    const children = Array.from(container.value?.children || []).map((item) => {
      const { x, y, width, height } = (item as HTMLElement).dataset;
      return {
        x: Math.round(Number(x)),
        y: Math.round(Number(y)),
        w: Math.round(Number(width)),
        h: Math.round(Number(height)),
      };
    });
    alignLineCalculator.setElements(children);

    return {
      originX: x,
      originY: y,
    };
  };
  const onDrag = (
    event: MouseEvent,
    { tx, ty }: DraggableData,
    {
      originX,
      originY,
    }: {
      originX: number;
      originY: number;
    }
  ) => {
    if (Math.abs(tx) < threshold && Math.abs(ty) < threshold) {
      return;
    }
    if (!moving.value) {
      moving.value = true;
    }

    const { x, y, vLines, hLines, aligned } = alignLineCalculator.calc(
      currentIndex.value,
      originX + tx / scale.value,
      originY + ty / scale.value
    );

    // console.log('输入', { x, y });
    console.log('输出', { x, y });

    setDragData(vLines, hLines, aligned);
    emitChange(current.value!.id, { x, y });
    return true;
  };
  const onStop = (
    event: MouseEvent,
    draggableData: DraggableData,
    changed?: boolean
  ) => {
    if (!changed) return;
    moving.value = false;
    clearDragData();
  };

  onMounted(() => {
    if (!el.value) return;
    draggable(el.value, {
      document: true,
      onStart,
      onDrag,
      onStop,
    });
  });
};
