import PithyCanvas from '@/components/canvas';
import { preziStore } from '@/stores/prezi';
import { ElMessage, ElIcon } from 'element-plus';
import { defineComponent } from 'vue';
import { Delete, CopyDocument } from '@element-plus/icons-vue';
import './index.scss';

export default defineComponent({
  name: 'pithy-sidebar',
  methods: {
    async handleCreate() {
      const { id } = await preziStore.createSlide();
      preziStore.selectSlide(id);
    },
    handleSelect(id: number) {
      preziStore.selectSlide(id);
    },
    handleDelete(ev: MouseEvent, id: number) {
      ev.stopPropagation();
      if (preziStore.slides.length > 1) {
        if (preziStore.currentSlideId === id) {
          preziStore.selectSlide(preziStore.slides[0].id);
        }
        preziStore.deleteSlide(id);
      } else {
        ElMessage.warning('不能删除最后一页');
      }
    },
    async handleCopy(ev: MouseEvent, id: number) {
      ev.stopPropagation();
      const slide = await preziStore.copySlide(id);
      preziStore.selectSlide(slide.id);
    },
  },
  render() {
    return (
      <aside class="pithy-editor-aside">
        <div class="aside-slider">
          {preziStore.slides.map((slide, index) => {
            const { id } = slide;
            return (
              <div
                onClick={() => this.handleSelect(id)}
                class={[
                  'aside-slider-item',
                  { active: id === preziStore.currentSlideId },
                ]}
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
