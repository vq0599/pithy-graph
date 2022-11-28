import { IElement } from '@/structs';
import { onMounted, onUnmounted } from 'vue';
import { useInject } from '../store';

export const useEvent = () => {
  const { current, scale, emitChange, emitDelete, emitPaste } = useInject();
  let copyFromElement = 0;
  const callback = ({ code, metaKey, target }: KeyboardEvent) => {
    if ((target as HTMLElement).tagName !== 'BODY') return;
    // 黏贴
    if (code === 'KeyV' && metaKey) {
      console.log('黏贴', { copyFromElement });

      if (copyFromElement) {
        emitPaste(copyFromElement);
      }
    }
    if (!current.value) return;
    if (['Delete', 'Backspace'].includes(code)) {
      // 删除
      emitDelete(current.value.id);
    } else if (code === 'KeyC' && metaKey) {
      // 复制
      copyFromElement = current.value.id;
    } else if (
      ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(code)
    ) {
      // 移动
      const { x, y, id } = current.value;
      const options: Partial<Pick<IElement, 'x' | 'y'>> = {};
      const unit = 1 / scale.value;
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

      emitChange(id, options);
    }
  };
  onMounted(() => {
    document.addEventListener('keydown', callback);
  });
  onUnmounted(() => {
    document.removeEventListener('keydown', callback);
  });
};
