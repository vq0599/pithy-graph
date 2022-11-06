import { unique } from './tool';

export interface DLElement {
  /**
   * 索引
   */
  i: number;
  /**
   * 横坐标
   */
  x: number;
  /**
   * 纵坐标
   */
  y: number;
  /**
   * 宽度
   */
  w: number;
  /**
   * 高度
   */
  h: number;
  /**
   * left坐标
   */
  l: number;
  /**
   * right坐标
   */
  r: number;
  /**
   * top坐标
   */
  t: number;
  /**
   * bottom坐标
   */
  b: number;
  /**
   * 左右坐标中值
   */
  lr: number;
  /**
   * 上下坐标中值
   */
  tb: number;
}

type DLLineDirections = 'x' | 'y';

export type DLLineTypes =
  | 'll'
  | 'rr'
  | 'lr'
  | 'rl'
  | 'mh'
  | 'tt'
  | 'bb'
  | 'tb'
  | 'bt'
  | 'mv';

export interface DLPoint {
  x: number;
  y: number;
}

/**
 * 对齐线模型
 */
export interface DLLine {
  /**
   * 索引
   */
  i: number;
  /**
   * 对齐线坐标
   */
  value: number;
  /**
   * 对齐线原点
   */
  origin: number;
  /**
   * 对齐线长度
   */
  length: number;
}

const getMaxDistance = (arr: number[]) => {
  const num = arr.sort((a, b) => a - b);
  return num[num.length - 1] - num[0];
};

class AlignLineCalculator {
  children: DLElement[] = [];
  directions: DLLineTypes[] = [
    'tt',
    'bb',
    'll',
    'rr',
    'tb',
    'lr',
    'rl',
    'mv',
    'mh',
  ];
  threshold = 10;

  /**
   * 拖拽初始将元素信息注入
   */
  setElements(children: { x: number; y: number; w: number; h: number }[]) {
    this.children = children.map(({ x, y, w, h }, i) => ({
      i,
      x,
      y,
      w,
      h,
      l: x,
      r: x + w,
      t: y,
      b: y + h,
      lr: x + w / 2,
      tb: y + h / 2,
    }));
    console.log(this.children);
  }

  calc = (index: number, x: number, y: number) => {
    const target = this.children[index];
    const compares = this.children.filter((_, i) => i !== index);

    if (compares.length === 0) {
      return {
        x,
        y,
        vLines: [],
        hLines: [],
        indices: [],
      };
    }

    return this.calcAndDrawLines({ x, y }, target, compares);
  };

  /**
   * @param values xy坐标
   * @param target 拖拽目标
   * @param compares 对照组
   */
  calcAndDrawLines(values: DLPoint, target: DLElement, compares: DLElement[]) {
    const {
      v: x,
      indices: indicesX,
      lines: vLines,
    } = this.calcPosValues(values, target, compares, 'x');
    const {
      v: y,
      indices: indicesY,
      lines: hLines,
    } = this.calcPosValues(values, target, compares, 'y');

    const indices = unique(indicesX.concat(indicesY));

    // https://github.com/zcued/react-dragline/issues/9
    if (vLines.length && hLines.length) {
      vLines.forEach((line) => {
        const compare = compares.find(({ i }) => i === line.i)!;
        const { length, origin } = this.calcLineValues(
          { x, y },
          target,
          compare,
          'x'
        );

        line.length = length;
        line.origin = origin;
      });

      hLines.forEach((line) => {
        const compare = compares.find(({ i }) => i === line.i)!;
        const { length, origin } = this.calcLineValues(
          { x, y },
          target,
          compare,
          'y'
        );

        line.length = length;
        line.origin = origin;
      });
    }

    return { x, y, vLines, hLines, indices };
  }

  calcLineValues(
    values: DLPoint,
    target: DLElement,
    compare: DLElement,
    key: DLLineDirections
  ) {
    const { x, y } = values;
    const { h: H, w: W } = target;
    const { l, r, t, b } = compare;
    const T = y,
      B = y + H,
      L = x,
      R = x + W;

    const direValues = {
      x: [t, b, T, B],
      y: [l, r, L, R],
    };

    const length = getMaxDistance(direValues[key]);
    const origin = Math.min(...direValues[key]);
    return { length, origin };
  }

  calcPosValues(
    values: DLPoint,
    target: DLElement,
    compares: DLElement[],
    key: DLLineDirections
  ) {
    const results: Record<number, DLLine[]> = {};

    const directions: {
      x: DLLineTypes[];
      y: DLLineTypes[];
    } = {
      x: ['ll', 'rr', 'lr', 'rl', 'mh'],
      y: ['tt', 'bb', 'tb', 'bt', 'mv'],
    };

    // filter unnecessary directions
    const validDirections = directions[key].filter((dire) =>
      this.directions.includes(dire)
    );

    compares.forEach((compare) => {
      validDirections.forEach((dire) => {
        const { near, dist, value, origin, length } = this.calcPosValuesSingle(
          values,
          dire,
          target,
          compare,
          key
        );
        if (near) {
          const line = {
            i: compare.i,
            value,
            origin,
            length,
          };
          if (Array.isArray(results[dist])) {
            results[dist].push(line);
          } else {
            results[dist] = [line];
          }
        }
      });
    });

    const resultArray = Object.entries(results).map(
      ([dist, lines]) => [parseInt(dist), lines] as const
    );
    if (resultArray.length) {
      const [minDist, lines] = resultArray.sort(
        ([dist1], [dist2]) => Math.abs(dist1) - Math.abs(dist2)
      )[0];
      return {
        v: values[key] - minDist,
        dist: minDist,
        lines: lines,
        indices: lines.map(({ i }) => i),
      };
    }

    return {
      v: values[key],
      dist: 0,
      lines: [],
      indices: [],
    };
  }

  calcPosValuesSingle(
    values: DLPoint,
    dire: DLLineTypes,
    target: DLElement,
    compare: DLElement,
    key: DLLineDirections
  ) {
    const { x, y } = values;
    const W = target.w;
    const H = target.h;
    const { l, r, t, b, lr, tb, x: xCompare } = compare;
    const { origin, length } = this.calcLineValues(
      { x, y },
      target,
      compare,
      key
    );

    const result = {
      // 距离是否达到吸附阈值
      // Whether the distance reaches the adsorption threshold
      near: false,
      // 距离差
      // Distance difference
      dist: Number.MAX_SAFE_INTEGER,
      // 辅助线坐标
      // Auxiliary line coordinates
      value: 0,
      // 辅助线长度
      length,
      // 辅助线起始坐标（对应绝对定位的top/left）
      // Starting coordinates of auxiliary line (corresponding to top/left of absolute positioning)
      origin,
    };

    switch (dire) {
      case 'lr':
      case 'rl': {
        const sides = [];
        sides.push({ dist: x - r, value: r }); // right side
        sides.push({ dist: x + W - xCompare, value: l }); // left side
        sides.forEach((side) => {
          if (Math.abs(side.dist) < Math.abs(result.dist)) {
            result.dist = side.dist;
            result.value = side.value;
          }
        });
        break;
      }
      case 'll':
        result.dist = x - l;
        result.value = l;
        break;
      case 'rr':
        result.dist = x + W - r;
        result.value = r;
        break;
      case 'tt':
        result.dist = y - t;
        result.value = t;
        break;
      case 'bb':
        result.dist = y + H - b;
        result.value = b;
        break;
      case 'tb':
      case 'bt': {
        const sides = [];
        sides.push({ dist: y + H - t, value: t }); // top side
        sides.push({ dist: y - b, value: b }); // bottom side
        sides.forEach((side) => {
          if (Math.abs(side.dist) < Math.abs(result.dist)) {
            result.dist = side.dist;
            result.value = side.value;
          }
        });
        break;
      }
      case 'mv': // middle vertical
        result.dist = y + H / 2 - tb;
        result.value = tb;
        break;
      case 'mh': // middle horizontal
        result.dist = x + W / 2 - lr;
        result.value = lr;
        break;
    }

    if (Math.abs(result.dist) < this.threshold + 1) {
      result.near = true;
    }

    return result;
  }
}

export const alignLineCalculator = new AlignLineCalculator();
