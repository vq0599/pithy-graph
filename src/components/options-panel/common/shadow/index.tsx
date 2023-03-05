import { computed, defineComponent } from 'vue';
import { usePreziStore } from '@/stores/prezi';
import { JXFlex, JXFlexItem, JXInput } from '@/components/base';
import './index.scss';
import { ElSlider, ElSwitch } from 'element-plus';
import { IElementShadow } from '@/core';
import { get } from 'lodash-es';

const list = [
  // { type: 'none', label: '无' },
  { type: 'soft', label: '柔和' },
  { type: 'regular', label: '常规' },
  { type: 'retro', label: '复古' },
];

export default defineComponent({
  name: 'jx-shadow-panel',
  setup() {
    const preziStore = usePreziStore();
    const shadow = computed(() => {
      return preziStore.currentElement!.shadow;
    });
    const visible = computed(() => {
      return get(shadow.value, 'type', 'none') !== 'none';
    });
    return {
      visible,
      shadow,
      preziStore,
    };
  },
  methods: {
    setShadow(options: Partial<IElementShadow>) {
      const { updateElement, currentElementId } = this.preziStore;
      const shadow = Object.assign({}, this.shadow, options);
      updateElement(currentElementId, { shadow });
    },
    handleOpen(val: boolean) {
      const shadow = val
        ? { type: 'regular', value: 30 }
        : { type: 'none', value: 30 };
      this.setShadow(shadow);
    },
    handleBlur(ev: MouseEvent) {
      const value = Number((ev.target as HTMLInputElement).value);
      this.setShadow({ value });
    },
    renderOptions() {
      if (!this.visible) return null;
      const shadowType = this.shadow.type;
      return [
        <JXFlex class="mt-2" justifyContent="space-between">
          {list.map(({ type, label }) => (
            <JXFlex
              class={[
                'panel-item',
                'event-enable',
                { active: shadowType === type },
              ]}
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              // @ts-ignore
              onClick={() => this.setShadow({ type })}
            >
              <div class={`panel-item-${type}`} />
              <span>{label}</span>
            </JXFlex>
          ))}
        </JXFlex>,
        <JXFlex class="mt-1">
          <ElSlider
            modelValue={this.shadow.value}
            step={1}
            max={100}
            min={0}
            onInput={(value) => this.setShadow({ value: value as number })}
          />
          <JXFlexItem basis="65px" shrink={0} class="ml-2">
            <JXInput
              modelValue={this.shadow.value}
              suffix="%"
              // @ts-ignore
              onBlur={this.handleBlur}
            ></JXInput>
          </JXFlexItem>
        </JXFlex>,
      ];
    },
  },
  render() {
    return (
      <div class="jx-shadow-panel">
        <JXFlex justifyContent="space-between" alignItems="center">
          <span>投影</span>
          <ElSwitch
            modelValue={this.visible}
            // @ts-ignore
            onChange={this.handleOpen}
          ></ElSwitch>
        </JXFlex>
        {this.renderOptions()}
      </div>
    );
  },
});
