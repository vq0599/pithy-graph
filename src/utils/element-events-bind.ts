import { canvasStore } from '@/stores/canvas';
import { preziStore } from '@/stores/prezi';

let copyFromElement = 0;
let copyFromSlide = 0;

export const bindKeyboardEvents = ({ code, metaKey }: KeyboardEvent) => {
  // 处于输入状态
  if (canvasStore.editing) return;

  if (preziStore.currentElement) {
    if (['Delete', 'Backspace'].includes(code)) {
      preziStore.deleteElement();
    } else if (code === 'KeyC' && metaKey) {
      copyFromElement = preziStore.currentElementId;
      copyFromSlide = preziStore.currentSlideId;
    }
  }

  // 不需要选中也可以触发的事件
  if (code === 'KeyV' && metaKey) {
    if (copyFromElement && copyFromSlide) {
      preziStore.copyElement(copyFromElement, copyFromSlide);
    }
  }
};
