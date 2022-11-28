import { IElement } from '@/core/types';

export const canvasEmits = {
  'update:modelValue': (_id: number) => true,
  change: (_id: number, _options: Partial<IElement>) => true,
  paste: (_id: number) => true,
  delete: (_id: number) => true,
};

export type CanvasEmits = typeof canvasEmits;
