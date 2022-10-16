import type { IElementBase } from './base'

export interface ISHAPE extends IElementBase<"SHAPE"> {
  /**
   * 图形名称
   */
  label: string
}