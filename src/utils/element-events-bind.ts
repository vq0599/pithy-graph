import { canvasStore } from '@/stores/canvas';
import { preziStore } from '@/stores/prezi';

export const bindKeyboardEvents = ({ code, metaKey }: KeyboardEvent) => {
  // 处于输入状态 或 没有选中元素
  if (canvasStore.editing || !preziStore.currentElement) return;

  if (['Delete', 'Backspace'].includes(code)) {
    preziStore.deleteElement();
  } else if (code === 'KeyV' && metaKey) {
    // 优化成ctrl + C/V 可跨页的
    preziStore.copyElement();
  }
};
