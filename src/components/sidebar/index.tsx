import PithyCanvas from '@/core/components/canvas';
import { ElMessage, ElIcon } from 'element-plus';
import { defineComponent, ref } from 'vue';
import { Delete, CopyDocument } from '@element-plus/icons-vue';
import { usePreziStore } from '@/stores/prezi';
import './index.scss';

export default defineComponent({
  name: 'pithy-sidebar',
  setup() {
    const preziStore = usePreziStore();
    const menuVisible = ref(false);
    const menuOptions = ref({
      zIndex: 3,
      minWidth: 200,
      x: 500,
      y: 200,
    });

    return {
      preziStore,
      menuVisible,
      menuOptions,
      menuTargetId: -1,
    };
  },
  methods: {
    async handleCreate() {
      const { createSlide, selectSlide } = this.preziStore;
      const { id } = await createSlide();
      selectSlide(id);
    },
    handleDelete() {
      const id = this.menuTargetId;
      const { slides, currentSlideId, selectSlide, deleteSlide } =
        this.preziStore;
      if (slides.length > 1) {
        if (currentSlideId === id) {
          selectSlide(slides[0].id);
        }
        deleteSlide(id);
      } else {
        ElMessage.warning('不能删除最后一页');
      }
    },
    async handleCopy() {
      const id = this.menuTargetId;
      const { copySlide, selectSlide } = this.preziStore;
      const slide = await copySlide(id);
      selectSlide(slide.id);
    },
    handleClick(ev: MouseEvent, id: number) {
      ev.preventDefault();
      this.menuOptions.x = ev.x;
      this.menuOptions.y = ev.y;
      this.menuVisible = true;
      this.menuTargetId = id;
    },
  },
  render() {
    const { slides, currentSlideId, selectSlide } = this.preziStore;
    return (
      <aside class="pithy-editor-aside">
        <div class="aside-slider">
          {slides.map((slide, index) => {
            const { id } = slide;
            return (
              <div
                onClick={() => selectSlide(id)}
                class={['aside-slider-item', { active: id === currentSlideId }]}
              >
                <span class="item-order">{index + 1}</span>
                <div
                  class="item-thumbnail"
                  onContextmenu={(ev) => this.handleClick(ev, id)}
                >
                  <PithyCanvas width={128} height={72} slide={slide} withMask />
                </div>
              </div>
            );
          })}
        </div>
        <button class="aside-btn" onClick={this.handleCreate}>
          + 新场景
        </button>
        <context-menu
          v-model:show={this.menuVisible}
          options={this.menuOptions}
        >
          <context-menu-item label="删除" onClick={this.handleDelete}>
            {{
              icon: () => (
                <ElIcon size={14}>
                  <Delete />
                </ElIcon>
              ),
            }}
          </context-menu-item>
          <context-menu-item label="复制" onClick={this.handleCopy}>
            {{
              icon: () => (
                <ElIcon size={14}>
                  <CopyDocument />
                </ElIcon>
              ),
            }}
          </context-menu-item>
        </context-menu>
      </aside>
    );
  },
});
