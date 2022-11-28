import PithyCanvas from '@/core/components/canvas';
import { ElMessage, ElIcon } from 'element-plus';
import { defineComponent } from 'vue';
import { Delete, CopyDocument } from '@element-plus/icons-vue';
import { usePreziStore } from '@/stores/pinia';
import './index.scss';

export default defineComponent({
  name: 'pithy-sidebar',
  setup() {
    const preziStore = usePreziStore();
    return {
      preziStore,
    };
  },
  methods: {
    async handleCreate() {
      const { createSlide, selectSlide } = this.preziStore;
      const { id } = await createSlide();
      selectSlide(id);
    },
    handleDelete(ev: MouseEvent, id: number) {
      ev.stopPropagation();
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
    async handleCopy(ev: MouseEvent, id: number) {
      ev.stopPropagation();
      const { copySlide, selectSlide } = this.preziStore;
      const slide = await copySlide(id);
      selectSlide(slide.id);
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
                <i class="item-indicator"></i>
                <span>{index + 1}</span>
                <div class="item-thumbnail">
                  <PithyCanvas width={160} height={90} slide={slide} readonly />
                  <div class="item-actions">
                    <ElIcon
                      size={22}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore Element的错误
                      onClick={(ev) => this.handleDelete(ev, id)}
                    >
                      <Delete />
                    </ElIcon>
                    <ElIcon
                      size={22}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore Element的错误
                      onClick={(ev) => this.handleCopy(ev, id)}
                    >
                      <CopyDocument />
                    </ElIcon>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button class="aside-btn" onClick={this.handleCreate}>
          +新建幻灯片
        </button>
      </aside>
    );
  },
});
