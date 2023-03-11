import { usePreziStore } from '@/stores';
import { defineComponent, ref } from 'vue';
import { JXFlex, JXFlexItem, JXInput } from '@/components/base';
import { ElSlider } from 'element-plus';

export default defineComponent({
  name: 'jx-alpha-panel',
  setup(this) {
    const preziStore = usePreziStore();
    const visible = ref(true);
    return {
      preziStore,
      visible,
    };
  },
  methods: {
    handleChange(val: number) {
      const { updateElement, currentElementId } = this.preziStore;
      updateElement(currentElementId, { alpha: val });
    },
    handleBlur(ev: any) {
      const value = Number((ev.target as HTMLInputElement).value);
      this.handleChange(value);
    },
  },
  render() {
    const alpha = this.preziStore.currentElement!.alpha || 100;
    return (
      <div class="jx-alpha-panel">
        <JXFlex class="mb-2" justifyContent="space-between" alignItems="center">
          <span>透明度</span>
        </JXFlex>
        <JXFlex>
          <ElSlider
            modelValue={alpha}
            step={1}
            max={100}
            min={0}
            // @ts-ignore
            onInput={this.handleChange}
          ></ElSlider>
          <JXFlexItem basis="65px" shrink={0} class="ml-2">
            <JXInput
              modelValue={alpha}
              suffix="%"
              // @ts-ignore
              onBlur={this.handleBlur}
            ></JXInput>
          </JXFlexItem>
        </JXFlex>
      </div>
    );
  },
});
