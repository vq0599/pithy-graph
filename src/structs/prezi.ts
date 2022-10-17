import { IElement } from "."

export interface IPrezi {
  id: number
  slides: ISlide[]
  title: string
  createdAt: number
  updatedAt: number
}

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