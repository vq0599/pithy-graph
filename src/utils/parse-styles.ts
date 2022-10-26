import { CSSProperties } from "vue"

interface StylesParams {
  x: number,
  y: number,
  height: number,
  width: number,
  scale: number,
  rotate: number,
  zIndex: number
}

export const parseStyles = ({
  rotate,
  width,
  height,
  x,
  y,
  zIndex
}: Partial<StylesParams>) => {
  const ret: CSSProperties = {}
  const transform = []
  if (x || y) {
    transform.push(`translate(${x}px, ${y}px)`)
  }
  if (rotate) {
    transform.push(`rotate($rotate}deg)`)
  }
  // 宽高值为0时忽略
  if (width) {
    ret.width = `${width}px`
  }
  if (height) {
    ret.height = `${height}px`
  }
  if (transform.length) {
    ret.transform = transform.join(' ')
  }
  if (zIndex) {
    ret.zIndex = zIndex
  }
  return ret
}