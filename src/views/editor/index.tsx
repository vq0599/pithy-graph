import { defineComponent, ref } from 'vue';
import Canvas from '@/core/components/canvas';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import SlideMenu from '@/components/options-panel';
import { canvasStore } from '@/stores/canvas';
import { decode } from '@/utils/encryption';
import { globalStore } from '@/stores/global';
import PithyTemplates from '@/components/template';
import { useRoute } from 'vue-router';
import { IElement } from '@/core';
import { usePreziStore } from '@/stores/pinia';
import './index.scss';

export default defineComponent({
  setup() {
    const hashToId = (hash: string) => {
      return hash ? decode(hash.replace(/^#/, '')) : 0;
    };
    const { params, hash } = useRoute();
    const preziStore = usePreziStore();
    return {
      current: ref(-1),
      slideId: hashToId(hash),
      workspaceId: +params.id,
      preziStore,
    };
  },
  mounted() {
    this.initialize();
    window.addEventListener('resize', this.setRect);
  },
  unmounted() {
    window.removeEventListener('resize', this.setRect);
  },
  methods: {
    async initialize() {
      const { workspaceId, slideId } = this;
      // hash记录着默认的打开的slide
      await this.preziStore.initialize(workspaceId, slideId);
      globalStore.fetchImages();
      globalStore.fetchVideos();
    },
    setRect() {
      canvasStore.calcRect();
    },
    handleChange(id: number, changes: Partial<IElement>) {
      this.preziStore.updateElement(id, changes);
    },
    handleDelete(id: number) {
      this.preziStore.deleteElement(id);
    },
    handlePaste(id: number) {
      this.preziStore.copyElement(id);
    },
  },
  render() {
    if (!this.preziStore.currentSlide) return null;
    const { width, height } = canvasStore;
    return (
      <div class="pithy-editor-page">
        <Header />
        <div>
          <Sidebar />
          <main>
            <div class="pithy-editor-main">
              <Canvas
                v-show={!this.preziStore.previewSlide}
                v-model={this.preziStore.currentElementId}
                slide={this.preziStore.currentSlide}
                width={width}
                height={height}
                onChange={this.handleChange}
                onDelete={this.handleDelete}
                onPaste={this.handlePaste}
                readonly={false}
              />
              {this.preziStore.previewSlide && (
                <Canvas
                  key={`preview-${this.preziStore.previewSlide.id}`}
                  slide={this.preziStore.previewSlide}
                  width={width}
                  height={height}
                  readonly
                />
              )}
            </div>
            <hr />
            <PithyTemplates />
          </main>
          <SlideMenu />
        </div>
      </div>
    );
  },
});
