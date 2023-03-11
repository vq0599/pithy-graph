import { usePreziStore } from '@/stores';
import { defineComponent, ref } from 'vue';
import { JXFlex } from '@/components/base/flex';
import JXIconButton from '@/components/base/icon-button';
import { ArrowDown, ArrowLeft } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { JXInput } from '@/components/base';
import IconAngle from '@/assets/svg/angle.svg?component';

export default defineComponent({
  name: 'jx-rect-and-size-panel',
  setup() {
    const preziStore = usePreziStore();
    const visible = ref(false);
    return {
      preziStore,
      visible,
    };
  },
  methods: {
    handleToggleVisible() {
      this.visible = !this.visible;
    },
    handleBlur(key: string, ev: InputEvent) {
      const { updateElement, currentElementId } = this.preziStore;
      const value = Number((ev.target as HTMLInputElement).value);
      if (value || value === 0) {
        updateElement(currentElementId, { [key]: value });
      }
    },
  },
  render() {
    const target = this.preziStore.currentElement!;
    return (
      <div>
        <JXFlex class="mb-2" justifyContent="space-between" alignItems="center">
          <span>尺寸与位置</span>
          {/* @ts-ignore */}
          <JXIconButton onClick={this.handleToggleVisible}>
            <ElIcon>{this.visible ? <ArrowDown /> : <ArrowLeft />}</ElIcon>
          </JXIconButton>
        </JXFlex>
        {this.visible && (
          <JXFlex wrap="wrap" gap="8px">
            <JXInput
              prefix="X"
              width={100}
              numberOnly
              modelValue={Math.round(target.x)}
              // @ts-ignore
              onBlur={(ev: InputEvent) => this.handleBlur('x', ev)}
            ></JXInput>
            <JXInput
              prefix="Y"
              width={100}
              numberOnly
              modelValue={Math.round(target.y)}
              // @ts-ignore
              onBlur={(ev: InputEvent) => this.handleBlur('y', ev)}
            ></JXInput>
            <JXInput
              prefix="W"
              width={100}
              numberOnly
              modelValue={Math.round(target.width)}
              // @ts-ignore
              onBlur={(ev: InputEvent) => this.handleBlur('width', ev)}
            ></JXInput>
            <JXInput
              prefix="H"
              width={100}
              numberOnly
              disabled={this.preziStore.currentElement?.type === 'TEXT'}
              modelValue={Math.round(target.height)}
              // @ts-ignore
              onBlur={(ev: InputEvent) => this.handleBlur('height', ev)}
            ></JXInput>
            <JXInput
              width={100}
              suffix="°"
              modelValue={Math.round(target.rotate)}
              // @ts-ignore
              onBlur={(ev: InputEvent) => this.handleBlur('rotate', ev)}
            >
              {{ prefix: () => <IconAngle></IconAngle> }}
            </JXInput>
          </JXFlex>
        )}
      </div>
    );
  },
});
