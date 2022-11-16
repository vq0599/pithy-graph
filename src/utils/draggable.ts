export interface DraggableData {
  /**
   * 单次拖动事件移动的距离[X]
   */
  dx: number;
  /**
   * 单次拖动事件移动的距离[Y]
   */
  dy: number;
  /**
   * 累计移动的距离[X]
   */
  tx: number;
  /**
   * 累计移动的距离[Y]
   */
  ty: number;
  /**
   * 相对el的坐标[X]
   */
  offsetX: number;
  /**
   * 相对el的坐标[Y]
   */
  offsetY: number;
}

export interface DraggableOptions<T = any, U = any> {
  onStart(event: MouseEvent, data: DraggableData): T;
  onDrag(event: MouseEvent, data: DraggableData, truck: T): U;
  onStop(event: MouseEvent, data: DraggableData, payload?: U): void;
  /**
   * 是否将move事件添加至document上
   */
  document: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const defaultOptions: DraggableOptions = {
  onStart: noop,
  onDrag: noop,
  onStop: noop,
  document: false,
};

const getDraggableData = (changes: Partial<DraggableData>): DraggableData => {
  const initialValue = {
    dx: 0,
    dy: 0,
    tx: 0,
    ty: 0,
    offsetX: 0,
    offsetY: 0,
  };
  return Object.assign(initialValue, changes);
};

/**
 * 获取相对目标元素的offsetX/Y；
 * ev.offsetX/Y是相对ev.target的，这会随着鼠标hover到的元素的变化而变化，有时我们不希望这样。
 * @param el 目标元素
 * @param ev 鼠标事件
 * @returns
 */
const getRealOffsetRect = (el: HTMLElement, ev: MouseEvent) => {
  const { left, top } = el.getBoundingClientRect();
  const x = ev.pageX - left;
  const y = ev.pageY - top;
  return [x, y];
};

/**
 * 使得元素可拖拽；考虑一下是否需要destroy
 * @param el
 * @param dragCallback
 * @param options
 */
export function draggable<T, U>(
  el: HTMLElement,
  draggableOptions: Partial<DraggableOptions<T, U>>
) {
  const options = Object.assign({}, defaultOptions, draggableOptions);
  const moveTarget = options.document ? document.body : el;
  let lastX = 0;
  let lastY = 0;
  let initialX = 0;
  let initialY = 0;
  let truck: any;
  let payload: any;
  let draggableData: DraggableData;

  function onmousedown(ev: MouseEvent) {
    const [offsetX, offsetY] = getRealOffsetRect(el, ev);
    const ret = options.onStart(ev, getDraggableData({ offsetX, offsetY }));
    if (ret === false) {
      return;
    }
    truck = ret;
    lastX = ev.screenX;
    lastY = ev.screenY;
    initialX = ev.screenX;
    initialY = ev.screenY;
    moveTarget.addEventListener('mousemove', onmousemove);
    document.addEventListener('mouseup', onmouseup);
  }

  function onmousemove(ev: MouseEvent) {
    const { screenX, screenY } = ev;

    // 计算step使用screenX/Y，防止由于DOM的原因导致数值异常
    const dx = screenX - lastX;
    const dy = screenY - lastY;

    lastX = screenX;
    lastY = screenY;

    const tx = screenX - initialX;
    const ty = screenY - initialY;

    const { left, top } = el.getBoundingClientRect();
    const offsetX = ev.pageX - left;
    const offsetY = ev.pageY - top;

    draggableData = { dx, dy, tx, ty, offsetX, offsetY };
    payload = options.onDrag(ev, draggableData, truck);
  }

  function onmouseup(ev: MouseEvent) {
    options.onStop(ev, draggableData, payload);
    moveTarget.removeEventListener('mousemove', onmousemove);
    document.removeEventListener('mouseup', onmouseup);
  }

  el.addEventListener('mousedown', onmousedown);
}
