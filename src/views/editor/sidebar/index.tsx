import { slideStore } from "@/stores/slide";
import { workspaceStore } from "@/stores/workspace";
import { defineComponent } from "vue";
import './index.scss'

export default defineComponent({
  name: 'pithy-sidebar',
  mounted() {},
  methods: {
    handleAddSlider() {
      // preziStore.appendSlide()
    },
    handleSelect(id: number) {
      // preziStore.focusSlide(index)
      slideStore.setTarget(id)
    }
  },
  render() {
    return (
      <aside class="pithy-editor-aside">
        <div class="aside-slider">
          {
            workspaceStore.data.slides.map((slide, index) => (
              <div
                class={["aside-slider-item", { active: slide.id === slideStore.id }]}
                onClick={() => this.handleSelect(slide.id)}
              >
                <i></i>
                <span>{index}</span>
                <div class="item-thumbnail">{slide.id}</div>
              </div>
            ))
          }
        </div>
        <button class="aside-btn" onClick={this.handleAddSlider}>
          +新建幻灯片
        </button>
      </aside>
    )
  }
})