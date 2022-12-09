import { IElement, IEShape } from '@/core/types';

export const getResizeDirections = (el: IElement) => {
  switch (el.type) {
    case 'TEXT':
      return ['left', 'right'];
    case 'VIDEO':
      return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    case 'SHAPE':
      const shapeEl = el as IEShape;
      if (
        shapeEl.payload.appearance === 'arrow' ||
        shapeEl.payload.appearance === 'line'
      ) {
        return ['left', 'right'];
      }
  }
};
