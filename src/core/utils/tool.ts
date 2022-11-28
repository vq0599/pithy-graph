import { DLPoint } from '@/core/utils/align-line';

export function unique<T>(array: T[], compare = (a: any, b: any) => a === b) {
  const result: T[] = [];
  for (let i = 0, len = array.length; i < len; i++) {
    const current = array[i];
    if (result.findIndex((v) => compare(v, current)) === -1) {
      result.push(current);
    }
  }
  return result;
}

/**
 * 计算点到直线的垂直交点
 * @param p 拖动点
 * @param p1 直线上一点
 * @param p2 直线另上一点
 */
export function calcPointsOfIntersection(p: DLPoint, p1: DLPoint, p2: DLPoint) {
  // 对角线斜率 y = k1
  const k1 = (p1.y - p2.y) / (p1.x - p2.x);
  // p1.y = p1.x * k1 + b1
  const b1 = p1.y - p1.x * k1;
  // 垂线斜率（负倒数）
  const k2 = -1 / k1;
  // p.y = p.x * k2 + b2
  const b2 = p.y - p.x * k2;
  const x = (b1 - b2) / (k2 - k1);
  const y = x * k1 + b1;
  return { x, y };
}
