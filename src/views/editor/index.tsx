import { defineComponent, ref } from 'vue';
import Canvas from '@/components/canvas';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import SlideMenu from '@/components/options-panel';
import PithyEditLayer from '@/components/edit-layer';
import { preziStore } from '@/stores/prezi';
import { canvasStore } from '@/stores/canvas';
import { decode } from '@/utils/encryption';
import { CANVAS_ID } from '@/utils/constants';
import { globalStore } from '@/stores/global';
import { bindKeyboardEvents } from '@/utils/element-events-bind';
import PithyTemplates from '@/components/template';
import { useRoute } from 'vue-router';
import './index.scss';

export default defineComponent({
  setup() {
    // 这个要记牢
    const canvas = ref<InstanceType<typeof Canvas>>();
    const hashToId = (hash: string) => {
      return hash ? decode(hash.replace(/^#/, '')) : 0;
    };
    const { params, hash } = useRoute();
    return {
      ready: ref(false),
      canvas,
      slideId: hashToId(hash),
      workspaceId: +params.id,
    };
  },
  computed: {
    canvasEl(): HTMLDivElement {
      return this.canvas?.$el;
    },
  },
  mounted() {
    this.initialize();
    window.addEventListener('resize', this.setRect);
    document.addEventListener('mousedown', this.clearElementFocus);
    document.addEventListener('keydown', bindKeyboardEvents);
  },
  unmounted() {
    window.removeEventListener('resize', this.setRect);
    document.removeEventListener('mousedown', this.clearElementFocus);
  },
  methods: {
    async initialize() {
      const { workspaceId, slideId } = this;
      // hash记录着默认的打开的slide
      await preziStore.initialize(workspaceId, slideId);
      this.ready = true;
      globalStore.fetchImages();
    },
    setRect() {
      canvasStore.calcRect();
    },
    clearElementFocus(ev: MouseEvent) {
      const target = ev.target as HTMLElement;
      const [$optionsPanel] = document.getElementsByClassName(
        'pithy-options-panels'
      );
      const [$colorDropdown] =
        document.getElementsByClassName('el-color-dropdown');
      const [container] = (
        this.canvas?.$el as HTMLElement
      ).getElementsByClassName('pithy-canvas-inner');
      // 点击侧边栏，不取消选中
      if ($optionsPanel.contains(target)) return;
      // 点击画布，但是不背景（说明点击到了元素上）
      if (container?.contains(target) && target !== container) return;
      // 选择文字颜色，dropdown是portal渲染
      if ($colorDropdown && $colorDropdown.contains(target)) return;

      preziStore.selectElement(-1);
    },
  },
  render() {
    if (!this.ready) return null;
    const { width, height } = canvasStore;
    return (
      <div class="pithy-editor-page">
        <Header />
        <div>
          <Sidebar />
          <main>
            <div class="pithy-editor-main">
              <Canvas
                v-show={!preziStore.previewSlide}
                id={CANVAS_ID}
                ref="canvas"
                key={preziStore.currentSlide.id}
                slide={preziStore.currentSlide}
                width={width}
                height={height}
              />
              <PithyEditLayer />
              {preziStore.previewSlide && (
                <Canvas
                  key={`preview-${preziStore.previewSlide.id}`}
                  slide={preziStore.previewSlide}
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
