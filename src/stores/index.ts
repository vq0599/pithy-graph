import { reactive } from 'vue'
import type { IElement } from '@/strucs'

export interface SliderItem {
  id: number,
  elements: IElement[],
}

class Store {
  private _slider: SliderItem[] = [
    { id: 0, elements: [] },
    { id: 1, elements: [] },
  ]

  private _current = -1

  private id = 2


  get slider() {
    return this._slider
  }

  get current() {
    return this._slider[this._current]
  }

  add() {
    this._slider.push({ id: this.id++, elements: [] })
    this._current = this._slider.length - 1
  }
  focus(current: number) {
    this._current = current
  }
  appendElement(element: IElement) {
    this.current.elements.push(element)
  }
}

export const store = reactive(new Store())

