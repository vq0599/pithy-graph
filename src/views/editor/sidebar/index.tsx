import { preziStore } from "@/stores/prezi";
import { defineComponent } from "vue";
import './index.scss'

export default defineComponent({
  name: 'pithy-sidebar',
  render() {
    return (
      <aside class="pithy-editor-aside">
        <div class="aside-slider">
          {
            preziStore.slides.map((slide, index) => (
              <div
                class={["aside-slider-item", { active: slide.id === preziStore.currentSlide.id }]}
                onClick={() => this.handleSelect(index)}
              >
                <i></i>
                <span>{index}</span>
                <div class="item-thumbnail"></div>
              </div>
            ))
          }
        </div>
        <button class="aside-btn" onClick={this.handleAddSlider}>
          +新建幻灯片
        </button>
      </aside>
    )
  },
  methods: {
    handleAddSlider() {
      preziStore.appendSlide()
    },
    handleSelect(index: number) {
      preziStore.focusSlide(index)
    }
  }
})