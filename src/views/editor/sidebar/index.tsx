import { store } from "@/stores";
import { defineComponent } from "vue";


export default defineComponent({
  name: 'ss-sidebar',
  render() {
    return (
      <aside class="ss-editor-aside">
        <div class="aside-slider">
          {
            store.slider.map((item, index) => (
              <div
                class={["aside-slider-item", { active: index === store.current }]}
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
      store.add()
    },
    handleSelect(index: number) {
      store.focus(index)
    }
  }
})