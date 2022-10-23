import { SlideAPI } from '@/api'
import { IElement, ISlide } from '@/structs'
import { reactive } from 'vue'
import { ImageStore } from './elements/image'
import { TextStore } from './elements/text'

class SlideStore {
  private _data: ISlide = {} as ISlide
  private caches: Map<number, ISlide> = new Map()
  private currentIndex = -1
  public handler?: TextStore | ImageStore

  public get currentElement() {
    return this.elements[this.currentIndex]
  }

  // public get data() {
  //   return this._data
  // }

  public get elements() {
    return this._data.elements
  }

  public get id() {
    return this._data.id
  }

  public get background() {
    return this._data.background
  }

  public async setTarget(id: number) {
    if (this.caches.has(id)) {
      this._data = this.caches.get(id)!
      return
    }
    const { data } = await SlideAPI.get(id)
    this._data = data
    this.caches.set(id, data)
  }

  appendElement(property: Partial<IElement>) {
    //
  }
  focusElement(id: number) {
    if (id <= 0) {
      return this.currentIndex = -1
    }
    const index = this.elements.findIndex(el => el.id === id)
    this.currentIndex = index
    switch (this.currentElement.type) {
      case 'TEXT':
        this.handler = new TextStore(this.currentElement)
        break;
      case 'IMAGE':
        this.handler = new ImageStore(this.currentElement)
    }
  }
}

export const slideStore = reactive(new SlideStore())
