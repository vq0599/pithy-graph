import { alignLineCalculator, DLLine } from '@/utils/align-line';
import { CANVAS_ID } from '@/utils/constants';
import { reactive } from 'vue';
import { preziStore } from './prezi';

interface State {
  width: number;
  height: number;
  vLines: DLLine[];
  hLines: DLLine[];
  indices: number[];
}

class EditLayerStore {
  private _data: State = reactive({
    width: 0,
    height: 0,
    vLines: [],
    hLines: [],
    indices: [],
  });

  public get width() {
    return this._data.width;
  }

  public get height() {
    return this._data.height;
  }

  public get vLines() {
    return this._data.vLines;
  }

  public get hLines() {
    return this._data.hLines;
  }

  public get indices() {
    return this._data.indices;
  }

  setRect(width?: number, height?: number) {
    if (width) {
      this._data.width = width;
    }
    if (height) {
      this._data.height = height;
    }
  }

  /**
   * 初始化元素信息
   */
  initiateElements() {
    const { elements } = preziStore;
    const doms = document
      .getElementById(CANVAS_ID)!
      .getElementsByClassName('pithy-element');

    const schemes = elements.map(({ id, x, y }) => {
      const { clientWidth, clientHeight } = Array.from(doms).find(
        (el) => (el as HTMLElement).dataset.id === String(id)
      )!;
      return {
        x,
        y,
        w: clientWidth,
        h: clientHeight,
      };
    });

    alignLineCalculator.setElements(schemes);
  }

  /**
   * 计算对齐线及因为吸附而产生的新坐标
   */
  calcAlignCoord(originalX: number, originalY: number) {
    const { x, y, vLines, hLines, indices } = alignLineCalculator.calc(
      preziStore.currentElementIndex,
      originalX,
      originalY
    );
    this._data.vLines = vLines;
    this._data.hLines = hLines;
    this._data.indices = indices;
    return { x, y };
  }

  clearAlignLine() {
    this._data.vLines = [];
    this._data.hLines = [];
    this._data.indices = [];
  }
}

export const editLayerStore = new EditLayerStore();
