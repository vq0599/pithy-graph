import { ref, onMounted } from 'vue';
import { draggable, DraggableData } from '@/core/utils/draggable';
import { IElement } from '@/core/types';
import { useEditLayerInject, useInject } from '../store';
import { calcPointsOfIntersection } from '@/core/utils/tool';

type ResizeOffset = Partial<Pick<IElement, 'height' | 'width' | 'x' | 'y'>>;

export const useResize = () => {
  const { current, scale, emitChange } = useInject();
  const { width, height } = useEditLayerInject();
  const resizing = ref<string>();

  const element = ref<HTMLElement>();
  const onStart = (ev: MouseEvent) => {
    ev.stopPropagation();
    const actions = (ev.target as HTMLElement).dataset.action;
    resizing.value = actions;
    const { x: originalX, y: originalY } = current.value!;
    return {
      actions,
      originalX,
      originalY,
      originalWidth: width.value,
      originalHeight: height.value,
    };
  };

  const onDrag = (
    ev: MouseEvent,
    { tx, ty }: DraggableData,
    {
      actions,
      originalX,
      originalY,
      originalWidth,
      originalHeight,
    }: {
      actions: string;
      originalX: number;
      originalY: number;
      originalWidth: number;
      originalHeight: number;
    }
  ) => {
    const { type, payload, id } = current.value!;
    const scaleThreshold = 20;
    const changes: ResizeOffset = {};
    let fixedRatio = false;
    let realTx = tx / scale.value;
    let realTy = ty / scale.value;

    // 拖拽四个点
    if (actions.includes('-')) {
      fixedRatio = true;
      let p1;
      let p2;

      if (actions === 'top-right' || actions === 'bottom-left') {
        // 右上点
        p1 = { x: originalX + originalWidth, y: originalY };
        // 左下点
        p2 = {
          x: originalX,
          y: originalY + originalHeight,
        };
      } else {
        // 左上点
        p1 = { x: originalX, y: originalX };
        // 右下点
        p2 = {
          x: p1.x + originalWidth,
          y: p1.y + originalHeight,
        };
      }
      /**
       * 鼠标点坐标
       */
      const p = { x: p2.x + realTx, y: p2.y + realTy };
      /**
       * 点p与直线[p1-p2]的垂直交点坐标
       */
      const moveto = calcPointsOfIntersection(p, p1, p2);
      realTx = moveto.x - p2.x;
      realTy = moveto.y - p2.y;
    }
    actions.split('-').forEach((action) => {
      switch (action) {
        case 'left':
          changes.x = originalX + realTx;
          changes.width = originalWidth - realTx;
          break;
        case 'right':
          changes.width = originalWidth + realTx;
          break;
        case 'top':
          changes.y = originalY + realTy;
          changes.height = originalHeight - realTy;
          break;
        case 'bottom':
          changes.height = originalHeight + realTy;
          break;
        default:
          break;
      }
    });

    if (fixedRatio) {
      // 如果是固定比例缩放，则一边小于极值就不再缩放，以保持比例不变
      if (
        (changes.height || Number.MAX_SAFE_INTEGER) < scaleThreshold ||
        (changes.width || Number.MAX_SAFE_INTEGER) < scaleThreshold
      )
        return;
    } else {
      // 如果是任意比例缩放，则分别限制宽高不小于极值即可
      if (changes.width && changes.width < scaleThreshold) {
        changes.width = scaleThreshold;
      }
      if (changes.height && changes.height < scaleThreshold) {
        changes.height = scaleThreshold;
      }
    }

    console.log('resize', id, changes);
    emitChange(id, changes);
    if (type === 'TEXT' && payload.free) {
      emitChange(id, { payload: { free: false } });
    }
    return changes;
  };
  const onStop = () => {
    resizing.value = '';
  };

  onMounted(() => {
    if (!element.value) return;
    draggable(element.value, {
      onStart,
      onDrag,
      onStop,
      document: true,
    });
  });
  return {
    element,
    resizing,
  };
};
