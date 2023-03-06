import { defineStore } from 'pinia';
import {
  WorkspaceAPI,
  ElementAPI,
  SlideAPI,
  AIWorkspaceForm,
  AISlideForm,
} from '@/api';
import { IElement, IElementTypes, ISlide } from '@/core';
import { IWorkspace } from '@/structs';
import { router } from '@/router';
import { encode } from '@/utils/encryption';
import { debounce } from 'lodash-es';

export enum ZIndexOptions {
  highest,
  higher,
  lower,
  lowest,
}

export const usePreziStore = defineStore('prezi', {
  state: () => ({
    data: {} as IWorkspace,
    currentSlideId: 0,
    currentElementId: -1,
    dirty: {} as DeepPartial<IElement>,
    // previewSlide: undefined as ISlide | undefined,
  }),
  getters: {
    workspace(): IWorkspace {
      return this.data;
    },
    title(): string {
      return this.data.title;
    },
    slides(state) {
      return state.data.slides || [];
    },
    elements(): IElement[] {
      return this.currentSlide?.elements || [];
    },
    currentSlide(state): ISlide | undefined {
      return this.slides.find((slide) => slide.id === state.currentSlideId);
    },
    currentElement(): IElement | undefined {
      return this.elements.find((el) => el.id === this.currentElementId);
    },
  },
  actions: {
    async initialize(id: number, defaultSlideId: number) {
      const { data } = await WorkspaceAPI.getOne(id);
      this.data = data;
      const exists = this.slides.find((slide) => slide.id === defaultSlideId);
      if (exists) {
        this.currentSlideId = defaultSlideId;
      } else {
        this.currentSlideId = this.slides[0].id;
      }
    },
    save: debounce(
      // 这里的this有点难理解
      async function (id: number) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 没招了
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this;
        if (Object.keys(_this.dirty).length) {
          await ElementAPI.update(id, _this.dirty);
          _this.dirty = {};
        }
      },
      800,
      {
        leading: false,
        trailing: true,
      }
    ),
    selectSlide(id: number) {
      if (id !== this.currentSlideId) {
        this.currentElementId = 0;
        this.currentSlideId = id;
        router.push({ hash: `#${encode(id)}` });
      }
    },
    async createSlide() {
      const { data: newSlide } = await SlideAPI.create({
        workspaceId: this.data.id,
        background: {
          color: 'rgba(255,255,255,1)',
        },
      });
      this.slides.push(newSlide);
      return newSlide;
    },
    async deleteSlide(id: number) {
      const index = this.slides.findIndex((slide) => slide.id === id);
      this.slides.splice(index, 1);
      await SlideAPI.delete(id);
    },
    async copySlide(id: number) {
      const index = this.slides.findIndex((slide) => slide.id === id);
      const { data: newSlide } = await SlideAPI.copy(id);
      this.slides.splice(index + 1, 0, newSlide);
      return newSlide;
    },
    updateSlide(options: AISlideForm) {
      return SlideAPI.update(this.currentSlideId, options);
    },
    setSlideBackground(options: Partial<ISlide['background']>) {
      const background = Object.assign(this.currentSlide!.background, options);
      this.updateSlide({ background });
    },
    async createElement(type: IElementTypes, options: Partial<IElement>) {
      const { data: newElement } = await ElementAPI.create(
        this.currentSlideId,
        type,
        options
      );
      this.currentSlide?.elements.push(newElement);
      this.currentElementId = newElement.id;
    },
    async updateElement(id: number, options: Partial<IElement>) {
      const target = this.elements.find((el) => el.id === id);
      if (!target) return;
      for (const _key in options) {
        const key = _key as keyof typeof options;
        if ((key as keyof IElement) === 'payload') {
          Object.assign(target.payload, options[key]);
        } else {
          target[key] = options[key];
        }
        this.dirty[key] = target[key];
      }
      this.save(id);
    },
    async deleteElement(id: number) {
      const index = this.elements.findIndex((el) => el.id === id);
      if (index > -1) {
        this.elements?.splice(index, 1);
        await ElementAPI.delete(id);
      }
    },
    async copyElement(id: number) {
      const { data: newEl } = await ElementAPI.copy(id, this.currentSlideId);
      // 如果当前页复制/黏贴，挪动一下位置避免重合
      if (this.elements.find((el) => el.id === id)) {
        newEl.x += 80;
        newEl.y += 80;
      }
      this.elements.push(newEl);
      this.currentElementId = newEl.id;
    },
    updateZIndex(step: ZIndexOptions) {
      const { elements } = this;
      const from = this.elements.findIndex(
        (el) => el.id === this.currentElementId
      );
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
    },
    updateWorkspace(options: Partial<AIWorkspaceForm>) {
      Object.assign(this.data, options);
      WorkspaceAPI.update(this.data.id, options);
    },
  },
});
