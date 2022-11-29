import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import Canvas from '@/core/components/canvas';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import SlideMenu from '@/components/options-panel';
import { decode } from '@/utils/encryption';
import PithyTemplates from '@/components/template';
import { useRoute } from 'vue-router';
import { IElement } from '@/core';
import { useEditorStore, usePreziStore } from '@/stores';
import { calcCanvasRect } from '@/utils/tool';

import './index.scss';

export default defineComponent({
  setup() {
    const hashToId = (hash: string) => {
      return hash ? decode(hash.replace(/^#/, '')) : 0;
    };
    const { params, hash } = useRoute();
    const preziStore = usePreziStore();
    const editorStore = useEditorStore();
    const width = ref(0);
    const height = ref(0);
    const setRect = () => {
      const containerWidth = window.innerWidth - 220 - 12 * 2 - 240;
      const containerHeight = window.innerHeight - 60 - 12 * 2;
      const rect = calcCanvasRect(containerWidth, containerHeight);
      width.value = rect.width;
      height.value = rect.height;
    };
    setRect();
    onMounted(() => {
      window.addEventListener('resize', setRect);
    });
    onUnmounted(() => {
      window.removeEventListener('resize', setRect);
    });
    return {
      current: ref(-1),
      slideId: hashToId(hash),
      workspaceId: +params.id,
      preziStore,
      editorStore,
      width,
      height,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const { workspaceId, slideId } = this;
      // hash记录着默认的打开的slide
      await this.preziStore.initialize(workspaceId, slideId);
      this.editorStore.fetchImages();
      this.editorStore.fetchVideos();
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
    const { width, height } = this;
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
