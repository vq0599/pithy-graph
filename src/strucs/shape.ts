import type { IBase } from './base'

export interface ISHAPE extends IBase {
  type: 'SHAPE'
  /**
   * 图形名称
   */
  label: string
}