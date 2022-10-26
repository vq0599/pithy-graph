// import { slideStore } from "@/stores/slide";
// import { workspaceStore } from "@/stores/workspace";
import { preziStore } from "@/stores/prezi";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";
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
      // slideStore.setTarget(id)
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
            preziStore.slides.map(({ id }, index) => (
              <div
                class={["aside-slider-item", { active: id === preziStore.currentSlideId }]}
                onClick={() => this.handleSelect(id)}
              >
                <i></i>
                <span onClick={ev => this.handleDelete(ev, id)}>{index}</span>
                <div class="item-thumbnail">{id}</div>
              </div>
            ))
          }
        </div>
        <button class="aside-btn" onClick={this.handleCreate}>
          +新建幻灯片
        </button>
      </aside>
    )
  }
})