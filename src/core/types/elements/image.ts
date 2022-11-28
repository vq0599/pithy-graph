import { IElement } from './base';

export interface IEImagePayload {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 图片宽度，区别于组件本身的宽度（裁剪预留）
   */
  naturalWidth: number;
  /**
   * 图片高度，区别于组件本身的高度（裁剪预留）
   */
  naturalHeight: number;
  /**
   * 圆角，有效范围0-50（单位：%）
   */
  radius: number;
}

export type IEImage = IElement<'IMAGE', IEImagePayload>;
