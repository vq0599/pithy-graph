export type IElementTypes = 'TEXT' | 'IMAGE' | 'SHAPE'

export interface IElement<T extends IElementTypes = any, U extends Record<string, any> = any> {
  /**
   * 唯一标识符
   */
  id: number,
  /**
   * 组件类型
   */
  type: T
  /**
   * 组件宽度
   */
  width: number,
  /**
   * 组件高度
   */
  height?: number,
  /**
   * 横轴坐标
   */
  x: number
  /**
   * 纵轴坐标
   */
  y: number
  /**
   * 旋转角度
   */
  rotate?: number
  /**
   * 层级，默认为添加顺序
   */
  zIndex: number
  /**
   * 各个元素独有的数据
   */
  payload: U
  /**
   * 特殊标记
   */
  mark: number
}
