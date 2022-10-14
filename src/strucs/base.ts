export interface IBase {
  /**
   * 唯一标识符
   */
  id: number,
  /**
   * 组件宽度
   */
  width: number,
  /**
   * 组件高度
   */
  height: number,
  /**
   * 横轴坐标
   */
  x: number
  /**
   * 纵轴坐标
   */
  y: number
  /**
   * 层级，默认为添加顺序
   */
  order: number
}