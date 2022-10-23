import { IElement } from './elements'

export interface ISlide {
  id: number
  /**
   * 背景图
   */
  background: {
    /**
     * 颜色
     */
    color?: string
    /**
     * 颜色
     */
    image?: string
  }
  /**
   * 元素集合
   */
  elements: IElement[]
  /**
   * 演讲稿
   */
  notes?: string
}