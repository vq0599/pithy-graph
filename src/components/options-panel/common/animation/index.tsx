import { usePreziStore } from '@/stores';
import { defineComponent, ref } from 'vue';
import { JXFlex } from '@/components/base';
import AnimationBox from './box';
import { IElementAnimation } from '@/core';
import './index.scss';

export default defineComponent({
  name: 'jx-animation-panel',
  setup() {
    const preziStore = usePreziStore();
    const visible = ref(false);
    return {
      visible,
      preziStore,
    };
  },
  methods: {
    handleSelect(
      key: 'leaveAnimation' | 'enterAnimation',
      animation: IElementAnimation | null
    ) {
      const { updateElement, currentElementId } = this.preziStore;
      updateElement(currentElementId, { [key]: animation });
    },
  },
  render() {
    const element = this.preziStore.currentElement!;
    return (
      <div class="jx-animation-panel">
        <div class="mb-2">动画</div>
        <JXFlex alignItems="center" class="mb-1">
          <span class="panel-subtitle">进入</span>
          <AnimationBox
            animation={element.enterAnimation}
            stage="enter"
            onSelect={(animation) =>
              this.handleSelect('enterAnimation', animation)
            }
          />
        </JXFlex>
        <JXFlex alignItems="center">
          <span class="panel-subtitle">退出</span>
          <AnimationBox
            animation={element.leaveAnimation}
            stage="leave"
            onSelect={(animation) =>
              this.handleSelect('leaveAnimation', animation)
            }
          />
        </JXFlex>
      </div>
    );
  },
});
