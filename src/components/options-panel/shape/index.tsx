import { JXFlex, JXColorPicker, JXInput, JXFlexItem } from '@/components/base';
import { defineComponent, computed } from 'vue';
import { usePreziStore } from '@/stores';
import {
  RectAndSizePanel,
  AnimationPanel,
  ZIndexPanel,
  ShadowPanel,
} from '../common';
import { IEShapePayload } from '@/core';

export default defineComponent({
  name: 'jx-shape-panel',
  setup() {
    const preziStore = usePreziStore();
    const payload = computed(() => {
      return preziStore.currentElement?.payload as IEShapePayload;
    });
    return {
      preziStore,
      payload,
    };
  },
  methods: {
    setShape(payload: Partial<IEShapePayload>) {
      const { currentElementId, updateElement } = this.preziStore;
      updateElement(currentElementId, { payload });
    },
    handleBlur(ev: InputEvent) {
      const strokeWidth = Number((ev.target as HTMLInputElement).value);
      this.setShape({ strokeWidth });
    },
    renderPayloadSetting() {
      return [
        <JXFlex justifyContent="space-between" alignItems="center">
          <span>填充色</span>
          <JXColorPicker
            color={this.payload.fill}
            onSelect={(fill) => {
              this.setShape({ fill });
            }}
          />
        </JXFlex>,
        <JXFlex class="mt-1" justifyContent="space-between" alignItems="center">
          <span>边框色</span>
          <JXColorPicker
            color={this.payload.stroke}
            onSelect={(stroke) => {
              this.setShape({ stroke });
            }}
          />
        </JXFlex>,
        <JXFlex class="mt-1" justifyContent="space-between" alignItems="center">
          <span>边框粗细</span>
          <JXFlexItem basis="60px">
            <JXInput
              modelValue={this.payload.strokeWidth}
              // @ts-ignore
              onBlur={this.handleBlur}
            />
          </JXFlexItem>
        </JXFlex>,
      ];
    },
  },
  render() {
    return (
      <div class="jx-shape-panel">
        <RectAndSizePanel />
        <hr />
        {this.renderPayloadSetting()}
        <hr />
        <AnimationPanel />
        <hr />
        <ShadowPanel />
        <hr />
        <ZIndexPanel />
      </div>
    );
  },
});

// import { defineComponent } from 'vue';
// import { ElInputNumber } from 'element-plus';
// import { IEShape, IEShapePayload } from '@/core';
// import PithyColorPicker from '@/components/color-picker';
// import { mapStores } from 'pinia';
// import { usePreziStore } from '@/stores/prezi';

// export default defineComponent({
//   name: 'jx-shape-panel',
//   computed: {
//     ...mapStores(usePreziStore),
//     payload(): IEShapePayload {
//       return (this.preziStore.currentElement as IEShape).payload;
//     },
//   },
//   methods: {
//     handleUpdatePayload(payload: Partial<IEShapePayload>) {
//       const { currentElementId, updateElement } = this.preziStore;
//       updateElement(currentElementId, { payload });
//     },
//   },
//   render() {
//     return (
//       <div class="-common-panel">
//         <div class="panel-form">
//           <span>边框色</span>
//           <PithyColorPicker
//             color={this.payload.stroke}
//             onSelect={(stroke) => this.handleUpdatePayload({ stroke })}
//           />
//         </div>
//         <div class="panel-form">
//           <span>填充色</span>
//           <PithyColorPicker
//             color={this.payload.fill}
//             onSelect={(fill) => this.handleUpdatePayload({ fill })}
//           />
//         </div>
//         <div class="panel-form">
//           <span>边框长度</span>
//           <ElInputNumber
//             min={0}
//             max={100}
//             size="small"
//             modelValue={this.payload.strokeWidth}
//             onChange={(val) =>
//               this.handleUpdatePayload({ strokeWidth: val as number })
//             }
//           />
//         </div>
//         {this.payload.appearance === 'rectangle' && (
//           <div class="panel-form">
//             <span>圆角</span>
//             <ElInputNumber
//               modelValue={this.payload.radius || 0}
//               onChange={(radius) => this.handleUpdatePayload({ radius })}
//               size="small"
//               min={0}
//               max={50}
//               step={1}
//             />
//           </div>
//         )}
//       </div>
//     );
//   },
// });
