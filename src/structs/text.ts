import type { IElementBase } from './base'

export type ITextLevel = 'H1' | 'H2' | 'H3' | 'P' | 'SP' | 'OL' | 'UL'

export interface IText extends IElementBase<"TEXT"> {
  /**
   * 文字内容（HTML）
   */
  content: string
  /**
   * 文字级别
   */
  level: ITextLevel
  /**
   * 颜色
   */
  color?: string,
  /**
   * 字号
   */
  fontSize: number,
  /**
   * 字体
   */
  fontFamily?: string,
  /**
   * 对齐方式
   */
  alignment: 'left' | 'center' | 'right',
  /**
   * 斜体
   */
  italic: boolean,
  /**
   * 加粗
   */
  bold: boolean
}
