import { defineComponent } from "vue";
import { preziStore } from "@/stores/prezi";
import { ElSlider } from 'element-plus'
import { Edit, Share, Delete } from '@element-plus/icons-vue'
import { IEShape, IEShapePayload } from "@/structs";
import PithyColorPicker from "@/components/color-picker";

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
          <PithyColorPicker
            color={this.payload.stroke}
            onSelect={stroke => this.handleUpdatePayload({ stroke })}
          />
        </div>
        <div class="panel-form">
          <span>填充色</span>
          <PithyColorPicker
            color={this.payload.fill}
            onSelect={fill => this.handleUpdatePayload({ fill })}
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