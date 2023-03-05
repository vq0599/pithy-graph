import { computed, defineComponent, PropType, ref } from 'vue';
import { JXButton, JXFlex, JXFlexItem, JXInput } from '@/components/base';
import { ElPopover, ElSlider } from 'element-plus';
import IconFade from '@/assets/svg/animation/fade.svg?component';
import { IElementAnimation } from '@/core';
import { get } from 'lodash-es';
import './index.scss';

const enterLibrary = [
  {
    type: 'backInDown',
    label: '上滑入',
  },
  {
    type: 'backInLeft',
    label: '右滑入',
  },
  {
    type: 'backInRight',
    label: '左滑入',
  },
  {
    type: 'backInUp',
    label: '下滑入',
  },
];

const leaveLibrary = [
  {
    type: 'backOutDown',
    label: '上滑出',
  },
  {
    type: 'backOutLeft',
    label: '右滑出',
  },
  {
    type: 'backOutRight',
    label: '左滑出',
  },
  {
    type: 'backOutUp',
    label: '下滑出',
  },
];

const animationLibrary = {
  enter: enterLibrary,
  leave: leaveLibrary,
};

export default defineComponent({
  name: 'jx-animation-panel-box',
  props: {
    animation: {
      type: Object as PropType<IElementAnimation | null>,
    },
    stage: {
      type: String as PropType<'enter' | 'leave'>,
      required: true,
    },
  },
  emits: {
    select: (_animation: IElementAnimation | null) => true,
  },
  setup(props) {
    const library = computed(() => {
      return [{ type: 'none', label: '无' }].concat(
        animationLibrary[props.stage]
      );
    });

    const label = computed(() => {
      const target = library.value.find(
        (lib) => lib.type === props.animation?.type
      );
      return target?.label;
    });

    const visible = ref(false);
    return {
      library,
      label,
      visible,
    };
  },
  methods: {
    emitSelect(options: Partial<IElementAnimation> | null) {
      console.log({ options });
      const params = options
        ? Object.assign({ delay: 0, duration: 1 }, this.animation, options)
        : null;
      this.$emit('select', params);
    },
    setType(type: string) {
      const params = type ? { type } : null;
      this.emitSelect(params);
    },
    handleBlur(ev: any, key: string) {
      const value = Number((ev.target as HTMLInputElement).value);
      this.emitSelect({ [key]: value });
    },
    renderAnimationGrid() {
      return (
        <ul class="box-grid">
          {this.library.map(({ type, label }) => (
            <li
              key={type}
              class={{ active: type === get(this.animation, 'type', 'none') }}
              onClick={() => this.setType(type)}
            >
              <IconFade />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      );
    },
    renderOptions() {
      if (!this.animation?.type) return null;
      return [
        <JXFlex class="box-options" alignItems="center">
          <JXFlexItem tag="span" shrink={0} class="mr-1">
            延迟
          </JXFlexItem>
          <ElSlider
            step={0.1}
            modelValue={this.animation.delay}
            max={5}
            min={0}
            class="mx-2"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onInput={(delay: number) => this.emitSelect({ delay })}
          ></ElSlider>
          <JXFlexItem basis="65px" shrink={0}>
            <JXInput
              modelValue={this.animation.delay}
              suffix="s"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onBlur={(ev) => this.handleBlur(ev, 'delay')}
            ></JXInput>
          </JXFlexItem>
        </JXFlex>,
        <JXFlex class="box-options" alignItems="center">
          <JXFlexItem tag="span" shrink={0} class="mr-1">
            持续
          </JXFlexItem>
          <ElSlider
            step={0.1}
            modelValue={this.animation.duration}
            max={5}
            min={0}
            class="mx-2"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onInput={(duration: number) => this.emitSelect({ duration })}
          ></ElSlider>
          <JXFlexItem basis="65px" shrink={0}>
            <JXInput
              modelValue={this.animation.duration}
              suffix="s"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onBlur={(ev) => this.handleBlur(ev, 'duration')}
            ></JXInput>
          </JXFlexItem>
        </JXFlex>,
      ];
    },
  },
  render() {
    return (
      <ElPopover
        v-model:visible={this.visible}
        // trigger="focus"
        trigger="click"
        showArrow={false}
        placement="left"
        hideAfter={0}
        width={300}
      >
        {{
          reference: () => (
            <JXButton active={this.visible} type="action">
              {this.label}
            </JXButton>
          ),
          default: () => (
            <div class="jx-animation-panel-box">
              {this.renderAnimationGrid()}
              {this.renderOptions()}
            </div>
          ),
        }}
      </ElPopover>
    );
  },
});
