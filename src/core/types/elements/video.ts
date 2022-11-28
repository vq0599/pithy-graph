import { IElement } from './base';

export interface IEVideoPayload {
  /**
   * 视频地址
   */
  url: string;
  /**
   * 素材本身的宽度
   */
  naturalWidth: number;
  /**
   * 素材本身的高度
   */
  naturalHeight: number;
}

export type IEVideo = IElement<'VIDEO', IEVideoPayload>;
