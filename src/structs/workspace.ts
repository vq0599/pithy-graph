import { ISlide } from '@/core';

export interface IWorkspace {
  /**
   * 工作区ID
   */
  id: number;
  /**
   * 名称
   */
  title: string;
  /**
   * 帧数据
   */
  slides: ISlide[];
  /**
   * 背景音乐
   */
  music: string;
  /**
   * 启用字幕
   */
  captionEnable: boolean;
  /**
   * 语音的唯一标识符
   */
  voice: string;
  /**
   * 转场动画
   */
  transition: string;
  /**
   * 创建时间
   */
  createdAt: number;
  updatedAt: number;
}
