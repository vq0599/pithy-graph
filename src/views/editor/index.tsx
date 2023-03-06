import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import Canvas from '@/core/components/canvas';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import SlideMenu from '@/components/options-panel';
import { decode } from '@/utils/encryption';
import { useRoute } from 'vue-router';
import { IElement } from '@/core';
import { useEditorStore, usePreziStore } from '@/stores';
import { calcCanvasRect } from '@/utils/tool';
import JXSlideCaption from '@/components/caption-box';
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
      const containerWidth = window.innerWidth - 195 - 16 * 2 - 251;
      const containerHeight = window.innerHeight - 60 - 16 * 2;
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
        <div onContextmenu={(ev) => ev.preventDefault()}>
          <Sidebar />
          <main>
            <div class="pithy-editor-main">
              <Canvas
                v-model={this.preziStore.currentElementId}
                slide={this.preziStore.currentSlide}
                width={width}
                height={height}
                onChange={this.handleChange}
                onDelete={this.handleDelete}
                onPaste={this.handlePaste}
                readonly={false}
              />
            </div>
            <JXSlideCaption />
          </main>
          <SlideMenu />
        </div>
      </div>
    );
  },
});
