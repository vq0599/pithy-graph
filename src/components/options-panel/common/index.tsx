import { defineComponent } from "vue";
import { preziStore } from "@/stores/prezi";
import {
  ElButton,
  ElButtonGroup,
} from 'element-plus'
// import { IElement } from "@/structs";
import { Edit, Share, Delete } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'pithy-text-panel',
  components: {
    Delete,
    Share,
    Edit,
  },
  computed: {
    element() {
      return preziStore.currentElement
    },
  },
  methods: {
 
  },
  render() {
    return (
      <div class="pithy-common-panel" >
        <div class="panel-form">
          <span>层级</span>
          <div>
            <span>({this.element?.zIndex})</span>
            <ElButtonGroup size="small">
              <ElButton>+</ElButton>
              <ElButton>-</ElButton>
            </ElButtonGroup>
          </div>
        </div>
      </div>
    )
  }
})