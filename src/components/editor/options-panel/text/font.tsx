import { usePreziStore } from '@/stores';
import { CSSProperties, defineComponent, ref } from 'vue';
import {
  JXFlex,
  JXFlexItem,
  JXSelect,
  JXColorPicker,
  JXIconRadio,
} from '@/components/base';
import { IETextPayload } from '@/core';
import IconLineHeight from '@/assets/svg/line-height.svg?component';

const fontfamilyLibrary = [
  { label: '宋体', value: 'SimSun' },
  { label: '黑体', value: 'SimHei' },
  { label: '微软雅黑', value: 'Microsoft Yahei' },
  { label: '楷体', value: 'KaiTi' },
  { label: '仿宋', value: 'FangSong' },
  { label: '华文黑体', value: 'STHeiti' },
  { label: '华文楷体', value: 'STKaiti' },
  { label: '华文宋体', value: 'STSong' },
  { label: '华文仿宋', value: 'STFangsong ' },
  { label: '冬青黑体简', value: 'Hiragino Sans GB' },
  { label: '兰亭黑-简', value: 'Lantinghei SC' },
  { label: '翩翩体-简', value: 'Hanzipen SC' },
  { label: '手札体-简', value: 'Hannotate SC' },
  { label: '宋体-简', value: 'Songti SC' },
  { label: '娃娃体-简', value: 'Wawati SC' },
  { label: '魏碑-简', value: 'Weibei SC' },
  { label: '行楷-简', value: 'Xingkai SC' },
];

const fontSizeLibrary = [
  { label: 1.0 * 40, value: 1.0 },
  { label: 1.5 * 40, value: 1.5 },
  { label: 2.0 * 40, value: 2.0 },
  { label: 2.5 * 40, value: 2.5 },
  { label: 3.0 * 40, value: 3.0 },
  { label: 3.5 * 40, value: 3.5 },
  { label: 4.0 * 40, value: 4.0 },
  { label: 4.5 * 40, value: 4.5 },
  { label: 5.0 * 40, value: 5.0 },
];

const lineSpacingLibrary = [1.0, 1.2, 1.4, 1.5, 1.6, 1.8, 2.0];

// const letterSpacingLibrary = [
//   { label: '0', value: 0 },
//   { label: '0.1', value: 0.1 },
//   { label: '0.2', value: 0.2 },
//   { label: '0.3', value: 0.3 },
//   { label: '0.4', value: 0.4 },
//   { label: '0.5', value: 0.5 },
//   { label: '0.6', value: 0.6 },
//   { label: '0.7', value: 0.7 },
//   { label: '0.8', value: 0.8 },
//   { label: '0.9', value: 0.9 },
//   { label: '1.0', value: 1.0 },
// ];

const fontStyleLibrary = [
  { label: '常规', value: 'regular' },
  { label: '加粗', value: 'bold' },
  { label: '斜体', value: 'italic' },
  { label: '加粗-斜体', value: 'bold-italic' },
];

const fontStyleFields = ['bold', 'italic'] as const;

export default defineComponent({
  name: 'jx-text-font-panel',
  setup(this) {
    const preziStore = usePreziStore();
    const visible = ref(true);
    return {
      preziStore,
      visible,
    };
  },
  methods: {
    parseFontStyle(value: string): CSSProperties {
      const styles: CSSProperties = {};
      value.split('-').forEach((v) => {
        switch (v) {
          case 'bold':
            styles.fontWeight = 'bold';
            break;
          case 'italic':
            styles.fontStyle = 'italic';
            break;
        }
      });
      return styles;
    },
    serializeStyle(value: string) {
      const payload: Partial<IETextPayload> = {};
      fontStyleFields.forEach((key) => {
        payload[key] = value.includes(key);
      });
      return payload;
    },
    deserializeStyle(payload: Partial<IETextPayload>) {
      return (
        fontStyleFields.reduce((ret, key) => {
          const waitToAppend: string = payload[key] ? key : '';
          if (!waitToAppend) return ret;
          return ret ? `${ret}-${waitToAppend}` : waitToAppend;
        }, '') || 'regular'
      );
    },
    setFont(payload: Partial<IETextPayload>) {
      const { currentElementId, updateElement } = this.preziStore;
      updateElement(currentElementId, { payload });
    },
  },
  render() {
    const payload = this.preziStore.currentElement?.payload as IETextPayload;
    const fontStyle = this.deserializeStyle(payload);
    return (
      <div class="jx-text-font-panel">
        <JXFlex class="mb-2" justifyContent="space-between" alignItems="center">
          <span>字体样式</span>
        </JXFlex>
        <JXFlex gap="8px">
          <JXSelect
            modelValue={payload.fontFamily}
            options={fontfamilyLibrary}
            placeholder="字体"
            onUpdate:modelValue={(fontFamily) => this.setFont({ fontFamily })}
          >
            {{
              // @ts-ignore
              option: ({ label, value }) => (
                <span style={{ fontFamily: value }}>{label}</span>
              ),
            }}
          </JXSelect>
          <JXFlexItem shrink={0}>
            <JXColorPicker
              color={payload.color}
              onSelect={(color) => this.setFont({ color })}
            ></JXColorPicker>
          </JXFlexItem>
        </JXFlex>
        <JXFlex class="mt-1" gap="8px">
          <JXFlexItem basis="92px" shrink={0}>
            <JXSelect
              modelValue={payload.fontSize}
              placeholder="字号"
              options={fontSizeLibrary}
              onUpdate:modelValue={(fontSize) => this.setFont({ fontSize })}
            ></JXSelect>
          </JXFlexItem>
          <JXSelect
            modelValue={fontStyle}
            placeholder="样式"
            options={fontStyleLibrary}
            onUpdate:modelValue={(val) =>
              this.setFont(this.serializeStyle(val))
            }
          >
            {{
              // @ts-ignore
              option: ({ label, value }) => (
                <span style={this.parseFontStyle(value)}>{label}</span>
              ),
            }}
          </JXSelect>
        </JXFlex>
        <JXFlex class="mt-1" gap="8px">
          <JXIconRadio
            modelValue={payload.alignment}
            onUpdate:modelValue={(alignment) => this.setFont({ alignment })}
          />
          <JXSelect
            modelValue={payload.lineSpacing}
            placeholder="行高"
            options={lineSpacingLibrary}
            onUpdate:modelValue={(lineSpacing) => this.setFont({ lineSpacing })}
          >
            {{
              prefix: () => <IconLineHeight />,
            }}
          </JXSelect>
          {/* <JXSelect
            modelValue={payload.letterSpacing}
            placeholder="字间距"
            options={letterSpacingLibrary}
            onUpdate:modelValue={(letterSpacing) =>
              this.setFont({ letterSpacing })
            }
          ></JXSelect> */}
        </JXFlex>
      </div>
    );
  },
});
