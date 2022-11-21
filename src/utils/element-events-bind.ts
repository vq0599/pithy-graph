import { canvasStore } from '@/stores/canvas';
import { preziStore } from '@/stores/prezi';
import { IElement } from '@/structs';

let copyFromElement = 0;
let copyFromSlide = 0;

export const bindKeyboardEvents = ({ code, metaKey }: KeyboardEvent) => {
  // 处于输入状态
  if (canvasStore.editing) return;
  // 不需要选中也可以触发的事件
  if (code === 'KeyV' && metaKey) {
    if (copyFromElement && copyFromSlide) {
      preziStore.copyElement(copyFromElement, copyFromSlide);
    }
  }

  if (!preziStore.currentElement) {
    return;
  }

  // 以下为必须要先选中才能触发的事件
  if (['Delete', 'Backspace'].includes(code)) {
    preziStore.deleteElement();
  } else if (code === 'KeyC' && metaKey) {
    copyFromElement = preziStore.currentElementId;
    copyFromSlide = preziStore.currentSlideId;
  } else if (
    ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(code)
  ) {
    const { x, y } = preziStore.currentElement;
    const options: Partial<Pick<IElement, 'x' | 'y'>> = {};
    const unit = 1 / canvasStore.scale;
    switch (code) {
      case 'ArrowUp':
        options.y = y - unit;
        break;
      case 'ArrowDown':
        options.y = y + unit;
        break;
      case 'ArrowLeft':
        options.x = x - unit;
        break;
      case 'ArrowRight':
        options.x = x + unit;
        break;
      default:
        break;
    }
    preziStore.updateElement(options);
    preziStore.save();
  }
};
