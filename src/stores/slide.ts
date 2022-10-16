import { reactive } from 'vue'
import { preziStore } from './prezi'
import { IElement, IText } from '@/structs'
import { genUUID } from '@/utils/uuid'

class SlideStore {
  private get target() {
    return preziStore.currentSlide
  }
  public get elements() {
    return this.target.elements
  }
  private _current = -1
  get currentElement(): IElement {
    return this.elements[this._current]
  }
  genOrder() {
    return this.elements.reduce((order, el) => {
      return el.order >= order ? el.order + 1 : order
    }, 1)
  }
  appendElement(property: Partial<IElement>) {
    const element = Object.assign({}, property)
    element.order = this.genOrder()
    element.id = genUUID()
    element.x = 20
    element.y = 20
    switch (property.type) {
      case 'TEXT':
       this.elements.push(element as IText)
        break;
    
      default:
        break;
    }
  }
  focusElement(index: number) {
    this._current = index
  }
  setPos(x: number, y: number) {
    this.currentElement.x = x
    this.currentElement.y = y
  }
  setContent(html?: string) {
    (this.currentElement as IText).content = html || '<p>添加文本</p>'
  }
}

export const slideStore = reactive(new SlideStore())