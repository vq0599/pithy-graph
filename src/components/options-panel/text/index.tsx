import { defineComponent } from 'vue';
import { preziStore } from '@/stores/prezi';
import {
  ElSelect,
  ElOption,
  ElSwitch,
  ElButton,
  ElButtonGroup,
  ElSlider,
} from 'element-plus';
import { IEText, IETextPayload } from '@/structs';
import { Edit, Share, Delete } from '@element-plus/icons-vue';
import PithyColorPicker from '@/components/color-picker';
import './index.scss';

const options = [
  { label: '20', value: 0.5 },
  { label: '40', value: 1 },
  { label: '60', value: 1.5 },
  { label: '80', value: 2 },
  { label: '100', value: 2.5 },
  { label: '120', value: 3 },
  { label: '140', value: 3.5 },
  { label: '160', value: 4 },
];

export default defineComponent({
  name: 'pithy-text-panel',
  components: {
    Delete,
    Share,
    Edit,
  },
  computed: {
    payload() {
      return (preziStore.currentElement as IEText).payload;
    },
  },
  methods: {
    handleUpdatePayload(payload: Partial<IETextPayload>) {
      preziStore.updateElementPayload<IETextPayload>(payload);
      preziStore.save();
    },
  },
  render() {
    return (
      <div class="pithy-text-panel">
        <div class="panel-form">
          <span>文字颜色</span>
          <PithyColorPicker
            color={this.payload.color}
            onSelect={(color) => this.handleUpdatePayload({ color })}
          />
        </div>
        <div class="panel-form">
          <span>字号</span>
          <ElSelect
            teleported={false}
            modelValue={this.payload.fontSize}
            onChange={(fontSize) => this.handleUpdatePayload({ fontSize })}
          >
            {options.map(({ label, value }) => (
              <ElOption label={label} value={value} />
            ))}
          </ElSelect>
        </div>
        <div class="panel-form">
          <span>加粗</span>
          <ElSwitch
            modelValue={this.payload.bold}
            onChange={(val) =>
              this.handleUpdatePayload({ bold: val as boolean })
            }
          />
        </div>
        <div class="panel-form">
          <span>斜体</span>
          <ElSwitch
            modelValue={this.payload.italic}
            onChange={(val) =>
              this.handleUpdatePayload({ italic: val as boolean })
            }
          />
        </div>
        <div class="panel-form">
          <span>对齐</span>
          <ElButtonGroup size="small">
            <ElButton
              onClick={() => this.handleUpdatePayload({ alignment: 'left' })}
            >
              左
            </ElButton>
            <ElButton
              onClick={() => this.handleUpdatePayload({ alignment: 'center' })}
            >
              中
            </ElButton>
            <ElButton
              onClick={() => this.handleUpdatePayload({ alignment: 'right' })}
            >
              右
            </ElButton>
          </ElButtonGroup>
        </div>
        <div class="panel-form">
          <span>字间距</span>
          <ElSlider
            showStops
            modelValue={this.payload.letterSpacing}
            min={0}
            max={1}
            step={0.1}
            onInput={(val) =>
              this.handleUpdatePayload({ letterSpacing: val as number })
            }
          />
        </div>
        <div class="panel-form">
          <span>行高</span>
          <ElSlider
            showStops
            modelValue={this.payload.lineSpacing}
            min={1}
            max={2}
            step={0.25}
            onInput={(val) =>
              this.handleUpdatePayload({ lineSpacing: val as number })
            }
          />
        </div>
        <div class="panel-form">
          <span>段落间距</span>
          <ElSlider
            showStops
            modelValue={this.payload.paragraphSpacing}
            min={0}
            max={2}
            step={0.25}
            onInput={(val) =>
              this.handleUpdatePayload({ paragraphSpacing: val as number })
            }
          />
        </div>
      </div>
    );
  },
});
