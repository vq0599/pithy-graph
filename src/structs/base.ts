export type IElementTypes = 'TEXT' | 'IMAGE' | 'SHAPE'

export interface IElementBase<Type extends IElementTypes> {
  /**
   * 唯一标识符
   */
  id: string,
  /**
   * 组件类型
   */
  type: Type
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
  order: number
}