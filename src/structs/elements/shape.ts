import { IElement } from './base'

type IEShapeAppearance = 'diamond' | 'ellipse' | 'rectangle' | 'triangle'

export interface IEShapePayload {
  /**
   * 形状
   */
  appearance: IEShapeAppearance,
  /**
   * 填充色
   */
  fill: string
  /**
   * 边框颜色
   */
  stroke: string
  /**
   * 边框宽度
   */
  strokeWidth: number
  /**
   * 圆角，有效范围0-50（单位：%）
   */
  radius: number
}

export type IEShape = Required<IElement<'SHAPE', IEShapePayload>>