import { SlideAPI, WorkspaceAPI } from '@/api'
import { ElementAPI } from '@/api/modules/element'
import { IElement, IElementTypes, IWorkspace } from '@/structs'
import { reactive } from 'vue'

class PreziStore {
  private _data: IWorkspace = {} as IWorkspace

  public currentSlideId = 0

  public currentElementId = 0

  private dirty: DeepPartial<IElement> = {}

  public get currentSlide() {
    return this._data.slides.find(slide => slide.id === this.currentSlideId)!
  }

  public get currentElement() {
    return this.currentSlide.elements.find(el => el.id === this.currentElementId)
  }

  public get slides() {
    return this._data.slides
  }

  public get elements() {
    return this.currentSlide?.elements
  }

  /**
   * 初始化workspace数据
   */
  async initialize(id: number) {
    const { data } = await WorkspaceAPI.getOne(id)
    this._data = data
    this.currentSlideId = this._data.slides[0].id
  }

  /**
   * 设置当前展示的Slide
   */
  selectSlide(id: number) {
    if (id !== this.currentSlideId) {
      this.currentElementId = 0
      this.currentSlideId = id
    }
  }

  /**
   * 设置当前选中的Element
   */
  selectElement(id: number) {
    this.currentElementId = id
  }

  async createSlide() {
    const { data: newSlide } = await SlideAPI.create({ workspaceId: this._data.id })
    this._data.slides.push(newSlide)
    return newSlide
  }

  async deleteSlide(id: number) {
    const index = this.slides.findIndex(slide => slide.id === id)
    this.slides.splice(index, 1)
    await SlideAPI.delete(id)
  }

  async createElement(type: IElementTypes, options: Partial<IElement>) {
    const { data: newElement } = await ElementAPI.create(
      this.currentSlideId,
      type,
      options
    )
    // Object.assign(newElement, options)
    this.currentSlide?.elements.push(newElement)
    this.currentElementId = newElement.id
  }

  async deleteElement(id = this.currentElementId) {
    const index = this.elements.findIndex(el => el.id === id)
    if (index > -1) {
      this.elements?.splice(index, 1)
      await ElementAPI.delete(id)
    }
  }

  updateElement(options: any, id?: number) {
    const target = id ? this.elements?.find(el => el.id === id) : this.currentElement
    if (target) {
      Object.assign(target, options)
      Object.assign(this.dirty, options)
    }
  }

  updateElementPayload(payload: any, id?: number) {
    const target = id ? this.elements?.find(el => el.id === id) : this.currentElement
    if (target) {
      this.updateElement({
        payload: Object.assign(target.payload, payload)
      }, id)
    }
  }

  async save(id = this.currentElementId) {
    if (Object.keys(this.dirty).length) {
      await ElementAPI.update(id, this.dirty)
      this.dirty = {}
    }
  }
}

export const preziStore = reactive(new PreziStore())