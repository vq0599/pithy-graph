import { IElement } from './base';

export enum IEAvatarDisplay {
  /**
   * 全身像
   */
  Full = 'full',
  /**
   * 圆头像
   */
  Circle = 'circle',
  /**
   * 仅声音
   */
  Voice = 'voice',
}

export interface IEAvatarPayload {
  /**
   * 展示类型
   */
  display: IEAvatarDisplay;
  /**
   * 实例图片地址
   */
  cover: string;
  /**
   * 圆头像时的背景色
   */
  background?: string;
  /**
   * 素材本身的高度
   */
  naturalHeight: number;

  naturalWidth: number;
}

export type IEAvatar = IElement<'AVATAR', IEAvatarPayload>;
