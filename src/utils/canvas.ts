import type { IElement } from '@/structs'
import type { CSSProperties } from 'vue';

export const parseStyle = (el: IElement) => {
  const styles: CSSProperties = {}
  styles.transform = `translate(${el.x}px, ${el.y}px)`
  styles.zIndex = el.order
  switch (el.type) {
    case 'TEXT':
      styles.fontSize = `${el.fontSize}em`
      break;
  
    default:
      break;
  }
  console.log(styles);
  
  return styles
}