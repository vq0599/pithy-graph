import { defineComponent } from "vue";
import { preziStore } from "@/stores/prezi";
import { ElTabPane, ElTabs } from "element-plus";
import SlidePanel from "./slide"
import TextPanel from "./text";
import ShapePanel from "./shape";
import CommonPanel from './common'
import "./index.scss"

export default defineComponent({
  name: 'pithy-options-panel',
  computed: {
    currentName() {
      const { currentElement } = preziStore
      return currentElement ? currentElement.type : 'SLIDE'
    }
  },
  methods: {
    renderChildPanel() {
      switch (this.currentName) {
        case 'SLIDE':
          return <SlidePanel />
        case 'TEXT':
          return <TextPanel />
        case 'SHAPE':
            return <ShapePanel />
        default:
          return null
      }
    }
  },
  
  render() {
    return (
      <div class="pithy-options-panels">
        <ElTabs stretch={true}>
          <ElTabPane label={this.currentName}>
            {this.renderChildPanel()}
          </ElTabPane>
          {
            preziStore.currentElement && (
              <ElTabPane label="通用">
                <CommonPanel />
              </ElTabPane>
            )
          }
        </ElTabs>
      </div>
    )
  }
})