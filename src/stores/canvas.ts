import { reactive } from 'vue'
import {
  canvasRatio,
  sidebarWidth,
  headerWidth,
  canvasNaturalWidth,
  canvasNaturalHeight,
} from "@/styles/export.module.scss"

class CanvasStore {
  maxWidth = parseInt(canvasNaturalWidth)
  maxHeight = parseInt(canvasNaturalHeight)
  width = 0
  height = 0
  scale = 0

  /**
   * 编辑中，禁止移动和删除
   */
  editing = false

  constructor() {
    this.calcRect()
  }
  calcRect() {
    const { maxHeight, maxWidth } = this
    const containerWidth = window.innerWidth - parseInt(sidebarWidth) - 12 * 2
    const containerHeight = window.innerHeight - parseInt(headerWidth) - 12 * 2
    let width, height
    // 4K屏幕，需要考虑最大值不能对于maxWidth * maxHeight
    if (containerWidth >= maxWidth && containerHeight / maxHeight) {
      width = maxWidth
      height = maxHeight
    } else if (containerWidth / maxWidth < containerHeight / maxHeight) {
      width = containerWidth
      height = containerWidth / canvasRatio
    } else {
      width = containerHeight * canvasRatio
      height = containerHeight
    }
    this.width = width,
    this.height = height,
    this.scale = width / maxWidth
  }
}

export const canvasStore = reactive(new CanvasStore())