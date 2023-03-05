import { IElement } from './base';

enum IEAvatarDisplay {
  /**
   * 全身像
   */
  Full,
  /**
   * 圆头像
   */
  Circle,
  /**
   * 仅声音
   */
  Voice,
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
}

export type IEAvatar = IElement<'AVATAR', IEAvatarPayload>;
