import { SlideAPI, WorkspaceAPI } from '@/api';
import { ElementAPI } from '@/api/modules/element';
import { IElement, IElementTypes, ISlide, IWorkspace } from '@/structs';
import { reactive } from 'vue';
import { router } from '@/router';
import { encode } from '@/utils/encryption';
import { debounce } from 'lodash-es';

/**
 * 变更层级选项
 */
export enum ZIndexOptions {
  highest,
  higher,
  lower,
  lowest,
}

function isEqual(a: string | number | boolean, b: string | number | boolean) {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.1;
  }
  return a === b;
}

class PreziStore {
  private _data: IWorkspace = {} as IWorkspace;

  public currentSlideId = 0;

  public currentElementId = 0;

  public previewSlide?: ISlide;

  private dirty: DeepPartial<IElement> = {};

  public get currentSlide() {
    return this._data.slides.find((slide) => slide.id === this.currentSlideId)!;
  }

  public get currentElement() {
    return this.currentSlide.elements.find(
      (el) => el.id === this.currentElementId
    );
  }

  public get currentElementIndex() {
    return this.currentSlide.elements.findIndex(
      (el) => el.id === this.currentElementId
    );
  }

  public get slides() {
    return this._data.slides;
  }

  public get elements() {
    return this.currentSlide?.elements;
  }

  /**
   * 初始化workspace数据
   */
  async initialize(id: number, defaultSlideId: number) {
    const { data } = await WorkspaceAPI.getOne(id);
    this._data = data;
    const exists = this.slides.find((slide) => slide.id === defaultSlideId);
    if (exists) {
      this.currentSlideId = defaultSlideId;
    } else {
      this.currentSlideId = this.slides[0].id;
    }
  }

  /**
   * 设置当前展示的Slide
   */
  selectSlide(id: number) {
    if (id !== this.currentSlideId) {
      this.currentElementId = 0;
      this.currentSlideId = id;
      router.push({ hash: `#${encode(id)}` });
    }
  }

  /**
   * 设置当前选中的Element
   */
  selectElement(id: number) {
    this.currentElementId = id;
  }

  async createSlide() {
    const { data: newSlide } = await SlideAPI.create({
      workspaceId: this._data.id,
    });
    this._data.slides.push(newSlide);
    return newSlide;
  }

  async deleteSlide(id: number) {
    const index = this.slides.findIndex((slide) => slide.id === id);
    this.slides.splice(index, 1);
    await SlideAPI.delete(id);
  }

  async copySlide(id: number) {
    const index = this.slides.findIndex((slide) => slide.id === id);
    const { data: newSlide } = await SlideAPI.copy(id);
    this.slides.splice(index + 1, 0, newSlide);
    return newSlide;
  }

  async createElement(type: IElementTypes, options: Partial<IElement>) {
    const { data: newElement } = await ElementAPI.create(
      this.currentSlideId,
      type,
      options
    );
    this.currentSlide?.elements.push(newElement);
    this.currentElementId = newElement.id;
  }

  async deleteElement(id = this.currentElementId) {
    const index = this.elements.findIndex((el) => el.id === id);
    if (index > -1) {
      this.elements?.splice(index, 1);
      await ElementAPI.delete(id);
    }
  }

  async copyElement(id: number, fromSlideId: number) {
    const { data: el } = await ElementAPI.copy(id, this.currentSlideId);
    // 如果当前页复制/黏贴，挪动一下位置避免重合
    if (fromSlideId === this.currentSlideId) {
      el.x += 80;
      el.y += 80;
    }
    this.elements.push(el);
    this.selectElement(el.id);
  }

  updateElement(options: Partial<IElement>, id?: number) {
    const target = id
      ? this.elements?.find((el) => el.id === id)
      : this.currentElement;
    if (!target) return;
    for (const _key in options) {
      const key = _key as keyof typeof options;
      if (!isEqual(target[key], options[key])) {
        target[key] = options[key];
        this.dirty[key] = options[key];
      }
    }
  }

  updateElementPayload<T = any>(options: Partial<T>, id?: number) {
    const target = id
      ? this.elements?.find((el) => el.id === id)
      : this.currentElement;
    if (!target) return;
    let changed = false;
    for (const key in options) {
      if (target.payload[key] !== options[key]) {
        target.payload[key] = options[key];
        changed = true;
      }
    }
    if (changed) {
      this.dirty.payload = target.payload;
    }
  }

  /**
   * 防抖保存
   */
  save = debounce(
    async (id = this.currentElementId) => {
      if (Object.keys(this.dirty).length) {
        await ElementAPI.update(id, this.dirty);
        this.dirty = {};
      }
    },
    500,
    {
      leading: false,
      trailing: true,
    }
  );

  setSlideBackground(options: Partial<ISlide['background']>) {
    const background = Object.assign(this.currentSlide.background, options);
    SlideAPI.update(this.currentSlideId, {
      background,
    });
  }

  updateZIndex(step: ZIndexOptions) {
    const { elements, currentElementIndex: from } = this;
    const params: Record<number, Record<'zIndex', number>> = {};
    let to;

    switch (step) {
      case ZIndexOptions.highest:
        to = this.elements.length - 1;
        break;
      case ZIndexOptions.higher:
        to = from + 1;
        break;
      case ZIndexOptions.lower:
        to = from - 1;
        break;
      case ZIndexOptions.lowest:
        to = 0;
        break;
    }

    if (to > elements.length - 1 || to < 0 || from === to) {
      return;
    }

    // 裁剪出目标元素
    const [target] = elements.splice(from, 1);
    // 插入到它本该在的位置
    elements.splice(to, 0, target);

    const [prev, next] = [from, to].sort();
    for (let i = prev; i < next + 1; i++) {
      const el = elements[i];
      el.zIndex = i + 1;
      params[el.id] = { zIndex: el.zIndex };
    }

    ElementAPI.bulkUpdate(params);
  }
}

/**
 * workspace数据仓库
 */
export const preziStore = reactive(new PreziStore());
