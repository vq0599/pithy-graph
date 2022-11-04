import { IElement } from './base';

export type IETextLevel = 'H1' | 'H2' | 'H3' | 'P' | 'SP' | 'OL' | 'UL';

export interface IETextPayload {
  /**
   * 文字内容（HTML）
   */
  content: string;
  /**
   * 文字级别
   */
  level: IETextLevel;
  /**
   * 颜色
   */
  color: string;
  /**
   * 字号
   */
  fontSize: number;
  /**
   * 字体
   */
  fontFamily: string;
  /**
   * 对齐方式
   */
  alignment: 'left' | 'center' | 'right';
  /**
   * 斜体
   */
  italic: boolean;
  /**
   * 加粗
   */
  bold: boolean;
  /**
   * 文字间距
   */
  letterSpacing: number;
  /**
   * 行间距
   */
  lineSpacing: number;
  /**
   * 段落间距
   */
  paragraphSpacing: number;
}

export type IEText = IElement<'TEXT', IETextPayload>;
