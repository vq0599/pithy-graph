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
   * 对应模型的数据库ID
   */
  relationId: number;
  /**
   * 展示类型
   */
  display: IEAvatarDisplay;
  /**
   * 头像图片地址
   */
  headImageUrl: string;
  /**
   * 全身图片地址
   */
  fullImageUrl: string;
  /**
   * 圆头像时的背景色
   */
  background: string;
}

export type IEAvatar = IElement<'AVATAR', IEAvatarPayload>;
