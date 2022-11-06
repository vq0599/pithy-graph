import { defineComponent, ref, watch } from 'vue';
import Canvas from '@/components/canvas';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import SlideMenu from '@/components/options-panel';
import PithyEditLayer from '@/components/edit-layer';
import { preziStore } from '@/stores/prezi';
import { canvasStore } from '@/stores/canvas';
import { decode } from '@/utils/encryption';
import { useRoute } from 'vue-router';
import { CANVAS_ID } from '@/utils/constants';
import './index.scss';

export default defineComponent({
  setup() {
    // 这个要记牢
    const canvas = ref<InstanceType<typeof Canvas>>();
    const route = useRoute();
    const hashToId = (hash: string) => {
      return hash ? decode(hash.replace(/^#/, '')) : 0;
    };
    watch(
      () => route.hash,
      (hash) => {
        preziStore.selectSlide(hashToId(hash));
      }
    );
    return {
      ready: ref(false),
      canvas,
      hashToId,
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
    document.addEventListener('keydown', this.deleteCurrentElement);
  },
  unmounted() {
    window.removeEventListener('resize', this.setRect);
    document.removeEventListener('mousedown', this.clearElementFocus);
    document.removeEventListener('keydown', this.deleteCurrentElement);
  },
  methods: {
    async initialize() {
      const { params, hash } = this.$route;
      // hash记录着默认的打开的slide
      await preziStore.initialize(+params.id, this.hashToId(hash));
      this.ready = true;
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
    deleteCurrentElement(ev: KeyboardEvent) {
      // 非编辑状态 & 当前有选中的元素 & 按键为删除
      const continued =
        !canvasStore.editing &&
        preziStore.currentElement &&
        (ev.code === 'Backspace' || ev.code === 'Delete');
      if (continued) {
        preziStore.deleteElement();
      }
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
                id={CANVAS_ID}
                ref="canvas"
                slide={preziStore.currentSlide}
                width={width}
                height={height}
              />
              <PithyEditLayer canvas={this.canvasEl} />
            </div>
          </main>
          <SlideMenu />
        </div>
      </div>
    );
  },
});
