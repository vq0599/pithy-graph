import { defineComponent, computed } from 'vue';
import { RectAndSizePanel } from '../common';
import { usePreziStore } from '@/stores';

import IconAvatarFull from '@/assets/svg/avatar-full.svg?component';
import IconAvatarCircle from '@/assets/svg/avatar-circle.svg?component';
import IconAvatarVoice from '@/assets/svg/avatar-voice.svg?component';
import { JXColorPicker, JXFlex } from '@/components/base';
import './index.scss';
import { IEAvatarDisplay, IEAvatarPayload } from '@/core';

const list = [
  { value: IEAvatarDisplay.Full, label: '全身', Icon: IconAvatarFull },
  { value: IEAvatarDisplay.Circle, label: '仅头像', Icon: IconAvatarCircle },
  { value: IEAvatarDisplay.Voice, label: '仅声音', Icon: IconAvatarVoice },
];

export default defineComponent({
  name: 'jx-avatar-panel',
  setup() {
    const preziStore = usePreziStore();
    const payload = computed(() => {
      return preziStore.currentElement?.payload as IEAvatarPayload;
    });
    return {
      payload,
      preziStore,
    };
  },
  methods: {
    setPayload(payload: Partial<IEAvatarPayload>) {
      const { currentElementId, updateElement } = this.preziStore;
      updateElement(currentElementId, { payload });
    },
    setDisplay(display: IEAvatarDisplay) {
      const { currentElementId, updateElement } = this.preziStore;
      const { naturalHeight, naturalWidth } = this.payload;
      if (display === IEAvatarDisplay.Circle) {
        const rect = Math.round(naturalHeight / 2);
        updateElement(currentElementId, { width: rect, height: rect });
      } else if (display === IEAvatarDisplay.Full) {
        updateElement(currentElementId, {
          width: naturalWidth,
          height: naturalHeight,
        });
      }
      this.setPayload({ display });
    },
  },
  render() {
    return (
      <div class="jx-avatar-panel">
        <RectAndSizePanel />
        <hr />
        <div>
          <span>数字人</span>
          <JXFlex
            tag="ul"
            justifyContent="space-between"
            class="mt-2 avatar-list"
          >
            {list.map(({ label, value, Icon }) => (
              <JXFlex
                tag="li"
                class={[
                  'event-enable',
                  { active: this.payload.display === value },
                ]}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                // @ts-ignore
                onClick={() => this.setDisplay(value)}
              >
                <Icon />
                <span>{label}</span>
              </JXFlex>
            ))}
          </JXFlex>
        </div>
        <hr />
        <JXFlex alignItems="center" justifyContent="space-between">
          <span>背景色</span>
          <JXColorPicker
            color={this.payload.background}
            onSelect={(color) => this.setPayload({ background: color })}
          />
        </JXFlex>
      </div>
    );
  },
});
