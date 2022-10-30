import { defineComponent } from "vue";
import { preziStore } from "@/stores/prezi";
import {
  ElColorPicker,
  ElSlider,
} from 'element-plus'
import { Edit, Share, Delete } from '@element-plus/icons-vue'
import { IEShape, IEShapePayload } from "@/structs";

export default defineComponent({
  name: 'pithy-text-panel',
  components: {
    Delete,
    Share,
    Edit,
  },
  computed: {
    payload() {
      return (preziStore.currentElement as IEShape).payload
    },
  },
  methods: {
    handleUpdatePayload(payload: Partial<IEShapePayload>) {
      preziStore.updateElementPayload<IEShapePayload>(payload)
      preziStore.save()
    }
  },
  render() {
    return (
      <div class="pithy-common-panel" >
        <div class="panel-form">
          <span>边框色</span>
          <ElColorPicker
            showAlpha
            modelValue={this.payload.stroke}
            onActiveChange={val => this.handleUpdatePayload({ stroke: (val as string) })}
          />
        </div>
        <div class="panel-form">
          <span>填充色</span>
          <ElColorPicker
            showAlpha
            modelValue={this.payload.fill}
            onActiveChange={val => this.handleUpdatePayload({ fill: (val as string) })}
          />
        </div>
        <div class="panel-form">
          <span>边框长度</span>
          <ElSlider
            min={0}
            max={30}
            modelValue={this.payload.strokeWidth}
            onInput={val => this.handleUpdatePayload({ strokeWidth: (val as number) })}
          />
        </div>
      </div>
    )
  }
})