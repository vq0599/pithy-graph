import { defineStore } from 'pinia';
// import { ResourceAPI } from '@/api';

interface State {
  menuVisible: Record<string, boolean>;
  images: string[];
  videos: string[];
}

export const useEditorStore = defineStore('editor', {
  state: (): State => ({
    menuVisible: {},
    images: [],
    videos: [],
  }),
  actions: {
    closeMenu(key: string) {
      this.menuVisible[key] = false;
    },
    // async fetchImages() {
    //   const { data: images } = await ResourceAPI.getImages();
    //   this.images = images;
    // },
    // async fetchVideos() {
    //   const { data: videos } = await ResourceAPI.getVideos();
    //   this.videos = videos;
    // },
  },
});
