import { IElement } from './elements';

export interface ISlide {
  /**
   * 帧ID
   */
  id: number;
  /**
   * 背景相关
   */
  background: {
    /**
     * 颜色
     */
    color: string;
    /**
     * 图片
     */
    image?: string;
    /**
     * 视频
     */
    video?: string;
  };
  /**
   * 元素集合
   */
  elements: IElement[];
  /**
   * 演讲稿
   */
  notes?: string;
}
