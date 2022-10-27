import PithyCanvas from "@/components/canvas";
import { preziStore } from "@/stores/prezi";
import { ElMessage, ElIcon } from "element-plus";
import { defineComponent } from "vue";
import { Delete } from '@element-plus/icons-vue'
import './index.scss'

export default defineComponent({
  name: 'pithy-sidebar',
  mounted() {},
  methods: {
    async handleCreate() {
      const { id } = await preziStore.createSlide()
      preziStore.selectSlide(id)
    },
    handleSelect(id: number) {
      preziStore.selectSlide(id)
    },
    handleDelete(ev: MouseEvent, id: number) {
      ev.stopPropagation()
      if (preziStore.slides.length > 1) {
          if (preziStore.currentSlideId === id) {
            preziStore.selectSlide(preziStore.slides[0].id)
        }
        preziStore.deleteSlide(id)
      } else {
        ElMessage.warning('不能删除最后一页')
      }
    }
  },
  render() {
    return (
      <aside class="pithy-editor-aside">
        <div class="aside-slider">
          {
            preziStore.slides.map((slide, index) => {
              const { id } = slide
              return (
                <div
                  class={["aside-slider-item", { active: id === preziStore.currentSlideId }]}
                  onClick={() => this.handleSelect(id)}
                >
                  <i class="item-indicator"></i>
                  <span>{index}</span>
                  <div class="item-thumbnail">
                    <PithyCanvas width={160} height={90} slide={slide} readonly />
                    <ElIcon
                      size={22}
                      // @ts-ignore Element的错误
                      onClick={ev => this.handleDelete(ev, id)}
                    >
                        <Delete />
                      </ElIcon>
                  </div>
                </div>
              )
            })
          }
        </div>
        <button class="aside-btn" onClick={this.handleCreate}>
          +新建幻灯片
        </button>
      </aside>
    )
  }
})