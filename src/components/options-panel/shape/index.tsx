import { defineComponent } from 'vue';
import { ElSlider, ElInputNumber } from 'element-plus';
import { Edit, Share, Delete } from '@element-plus/icons-vue';
import { IEShape, IEShapePayload } from '@/core';
import PithyColorPicker from '@/components/color-picker';
import { mapStores } from 'pinia';
import { usePreziStore } from '@/stores/pinia';

export default defineComponent({
  name: 'pithy-text-panel',
  components: {
    Delete,
    Share,
    Edit,
  },
  computed: {
    ...mapStores(usePreziStore),
    payload(): IEShapePayload {
      return (this.preziStore.currentElement as IEShape).payload;
    },
  },
  methods: {
    handleUpdatePayload(payload: Partial<IEShapePayload>) {
      const { currentElementId, updateElement } = this.preziStore;
      updateElement(currentElementId, { payload });
    },
  },
  render() {
    return (
      <div class="pithy-common-panel">
        <div class="panel-form">
          <span>边框色</span>
          <PithyColorPicker
            color={this.payload.stroke}
            onSelect={(stroke) => this.handleUpdatePayload({ stroke })}
          />
        </div>
        <div class="panel-form">
          <span>填充色</span>
          <PithyColorPicker
            color={this.payload.fill}
            onSelect={(fill) => this.handleUpdatePayload({ fill })}
          />
        </div>
        <div class="panel-form">
          <span>边框长度</span>
          <ElSlider
            min={0}
            max={30}
            modelValue={this.payload.strokeWidth}
            onInput={(val) =>
              this.handleUpdatePayload({ strokeWidth: val as number })
            }
          />
        </div>
        {this.payload.appearance === 'rectangle' && (
          <div class="panel-form">
            <span>圆角</span>
            <ElInputNumber
              modelValue={this.payload.radius || 0}
              onChange={(radius) => this.handleUpdatePayload({ radius })}
              size="small"
              min={0}
              max={50}
              step={1}
            />
          </div>
        )}
      </div>
    );
  },
});
