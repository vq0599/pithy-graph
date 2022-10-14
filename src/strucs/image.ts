import type { IBase } from './base'

export interface IImage extends IBase {
  type: 'IMAGE'
  /**
   * 图片地址
   */
  url: string,
  /**
   * 图片宽度，区别于组件本身的宽度（裁剪预留）
   */
  naturalWidth: number,
  /**
   * 图片高度，区别于组件本身的高度（裁剪预留）
   */
  naturalHeight: number,
}