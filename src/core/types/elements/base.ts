export type IElementTypes = 'TEXT' | 'IMAGE' | 'SHAPE' | 'AVATAR';

/**
 * 元素动画
 */
export interface IElementAnimation {
  /**
   * 动画类型
   */
  type: string;
  /**
   * 持续时间（秒）
   */
  duration: number;
  /**
   * 延迟执行（秒）
   */
  delay: number;
}

export interface IElementShadow {
  /**
   * 投影类型
   */
  type: string;
  /**
   * 投影数值（0-100）
   */
  value: number;
}

export interface IElement<
  T extends IElementTypes = any,
  U extends Record<string, any> = any
> {
  /**
   * 唯一标识符
   */
  id: number;
  /**
   * 组件类型
   */
  type: T;
  /**
   * 组件宽度
   */
  width: number;
  /**
   * 组件高度
   */
  height: number;
  /**
   * 横轴坐标
   */
  x: number;
  /**
   * 纵轴坐标
   */
  y: number;
  /**
   * 投影
   */
  shadow: IElementShadow;
  /**
   * 入场动画
   */
  enterAnimation: IElementAnimation | null;
  /**
   * 出场动画
   */
  leaveAnimation: IElementAnimation | null;
  /**
   * 透明度（0-100）
   */
  alpha: number;
  /**
   * 旋转角度
   */
  rotate: number;
  /**
   * 层级，默认为添加顺序
   */
  zIndex: number;
  /**
   * 各个元素独有的数据
   */
  payload: U;
  /**
   * 特殊标记
   */
  mark: number;
}
