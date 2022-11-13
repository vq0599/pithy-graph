import { reactive } from 'vue';
import { IElementTypes } from '@/structs';
import { ImageAPI } from '@/api';

class GlobalStore {
  menuVisible: Record<IElementTypes, boolean> = {
    TEXT: false,
    IMAGE: false,
    SHAPE: false,
  };

  images: string[] = [];

  closeMenu(key: IElementTypes) {
    this.menuVisible[key] = false;
  }

  async fetchImages() {
    const { data: images } = await ImageAPI.getAll();
    this.images = images;
  }
}

/**
 * 全局数据仓库
 */
export const globalStore = reactive(new GlobalStore());
