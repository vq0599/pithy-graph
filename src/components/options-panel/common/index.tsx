import { defineComponent } from 'vue';
import { preziStore, ZIndexOptions } from '@/stores/prezi';
import { ElButton, ElButtonGroup } from 'element-plus';
import { Edit, Share, Delete } from '@element-plus/icons-vue';
import { ElInputNumber } from 'element-plus';
import { IElement } from '@/structs';

const list = [
  { label: '最上', value: ZIndexOptions.highest },
  { label: '上', value: ZIndexOptions.higher },
  { label: '下', value: ZIndexOptions.lower },
  { label: '最下', value: ZIndexOptions.lowest },
];

export default defineComponent({
  name: 'pithy-text-panel',
  components: {
    Delete,
    Share,
    Edit,
  },
  computed: {
    element() {
      return preziStore.currentElement;
    },
  },
  methods: {
    handleSetZIndex(step: ZIndexOptions) {
      preziStore.updateZIndex(step);
    },
    handleUpdate(options: Pick<IElement, 'mark'>) {
      console.log(options);
      preziStore.updateElement(options);
      preziStore.save();
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
            v-editable
            modelValue={this.element?.mark}
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
