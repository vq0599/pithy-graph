import { reactive } from 'vue';
import { IElementTypes } from '@/structs';
import { ResourceAPI } from '@/api';

class GlobalStore {
  menuVisible: Record<string, boolean> = {
    TEXT: false,
    IMAGE: false,
    SHAPE: false,
  };

  images: string[] = [];

  videos: string[] = [];

  closeMenu(key: IElementTypes) {
    this.menuVisible[key] = false;
  }

  async fetchImages() {
    const { data: images } = await ResourceAPI.getImages();
    this.images = images;
  }

  async fetchVideos() {
    const { data: videos } = await ResourceAPI.getVideos();
    this.videos = videos;
  }
}

/**
 * 全局数据仓库
 */
export const globalStore = reactive(new GlobalStore());
