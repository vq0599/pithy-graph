import { defineComponent } from 'vue';
import { ElButton, ElButtonGroup } from 'element-plus';
import { Edit, Share, Delete } from '@element-plus/icons-vue';
import { ElInputNumber } from 'element-plus';
import { IElement } from '@/core';
import { mapStores } from 'pinia';
import { usePreziStore, ZIndexOptions } from '@/stores/pinia';

const list = [
  { label: '最上', value: ZIndexOptions.highest },
  { label: '上', value: ZIndexOptions.higher },
  { label: '下', value: ZIndexOptions.lower },
  { label: '最下', value: ZIndexOptions.lowest },
];

export default defineComponent({
  name: 'pithy-common-panel',
  components: {
    Delete,
    Share,
    Edit,
  },
  computed: {
    ...mapStores(usePreziStore),
  },
  methods: {
    handleSetZIndex(step: ZIndexOptions) {
      this.preziStore.updateZIndex(step);
    },
    handleUpdate(options: Pick<IElement, 'mark'>) {
      const { currentElementId, updateElement } = this.preziStore;
      updateElement(currentElementId, options);
    },
  },
  render() {
    return (
      <div class="pithy-common-panel">
        <div class="panel-form">
          <span>层级</span>
          <div>
            <ElButtonGroup size="small">
              {list.map(({ value, label }) => (
                <ElButton onClick={() => this.handleSetZIndex(value)}>
                  {label}
                </ElButton>
              ))}
            </ElButtonGroup>
          </div>
        </div>
        <div class="panel-form">
          <span>标记</span>
          <ElInputNumber
            modelValue={this.preziStore.currentElement?.mark}
            onChange={(mark) => this.handleUpdate({ mark: mark as number })}
            size="small"
            valueOnClear={0}
            controls={false}
            min={0}
            max={10000}
            step={1}
          />
        </div>
      </div>
    );
  },
});
