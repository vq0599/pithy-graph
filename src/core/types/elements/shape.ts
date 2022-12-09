import { IElement } from './base';

export type IEShapeAppearance =
  | 'diamond'
  | 'ellipse'
  | 'rectangle'
  | 'triangle'
  | 'line'
  | 'arrow';

export interface IEShapePayload {
  /**
   * 形状
   */
  appearance: IEShapeAppearance;
  /**
   * 填充色
   */
  fill: string;
  /**
   * 边框颜色
   */
  stroke: string;
  /**
   * 边框宽度
   */
  strokeWidth: number;
  /**
   * 圆角，有效范围0-50（单位：%）
   */
  radius: number;
  /**
   * 是否是双箭头
   */
  double: boolean;
}

export type IEShape = IElement<'SHAPE', IEShapePayload>;
