import { ref, provide, inject } from 'vue';
import { DLLine, DLAlignedElement } from '@/core/utils/align-line';

const STORE_KEY = Symbol();
const isTrue = (v: any) => v || v === 0;

export const useEditLayerProvide = () => {
  // 编辑层和数据彻底解耦
  const width = ref(0);
  const height = ref(0);
  const rotate = ref(0);
  const vLines = ref<DLLine[]>([]);
  const hLines = ref<DLLine[]>([]);
  const aligned = ref<DLAlignedElement[]>([]);

  const setRect = (rect: Partial<{ width: number; height: number }>) => {
    if (isTrue(rect.width)) {
      width.value = rect.width!;
    }
    if (isTrue(rect.height)) {
      height.value = rect.height!;
    }
  };

  const setDragData = (
    _vLines: DLLine[],
    _hLines: DLLine[],
    _aligned: DLAlignedElement[]
  ) => {
    vLines.value = _vLines;
    hLines.value = _hLines;
    aligned.value = _aligned;
  };

  const clearDragData = () => {
    vLines.value = [];
    hLines.value = [];
    aligned.value = [];
  };

  const ret = {
    width,
    height,
    rotate,
    vLines,
    hLines,
    aligned,
    setRect,
    setDragData,
    clearDragData,
  };
  provide(STORE_KEY, ret);
  return ret;
};

export const useEditLayerInject = () => {
  return inject(STORE_KEY) as ReturnType<typeof useEditLayerProvide>;
};
