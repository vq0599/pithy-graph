import { canvasStore } from '@/stores/canvas';

export const vEditable = {
  mounted: (el: HTMLElement) => {
    let target;
    if (el.isContentEditable || ['INPUT', 'TEXTAREA'].includes(el.tagName)) {
      target = el;
    } else {
      const maybeInput = el.getElementsByTagName('input')[0];
      const maybeTextarea = el.getElementsByTagName('textarea')[0];
      target = maybeInput || maybeTextarea;
    }

    if (!target) return;

    target.addEventListener('focus', () => {
      canvasStore.editing = true;
    });
    target.addEventListener('blur', () => {
      canvasStore.editing = false;
    });
  },
};
