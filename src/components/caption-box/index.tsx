// import { VoiceAPI } from '@/api/modules/voice';
import { usePreziStore } from '@/stores';
import { IVoice } from '@/structs';
import { ElSwitch } from 'element-plus';
import { computed, defineComponent, ref } from 'vue';
import { JXFlex } from '../base';
import JXVoicePicker from '@/components/voice-picker';
import './index.scss';

export default defineComponent({
  name: 'jx-slide-caption',
  setup() {
    const preziStore = usePreziStore();
    const slide = computed(() => {
      return preziStore.currentSlide;
    });
    const voice = ref<IVoice>();
    const workspace = computed(() => {
      return preziStore.data;
    });
    return {
      preziStore,
      slide,
      workspace,
      voice,
    };
  },
  methods: {
    setCaptionEnable(captionEnable: boolean) {
      const { updateWorkspace } = this.preziStore;
      // @ts-ignore 0/1和boolean
      updateWorkspace({ captionEnable });
    },
    setNote(ev: FocusEvent) {
      const { updateSlide } = this.preziStore;
      updateSlide({ notes: (ev.target as HTMLTextAreaElement).value });
    },
  },
  render() {
    return (
      <div class="jx-slide-caption">
        <JXFlex justifyContent="space-between" alignItems="center">
          {/* <button>语音选择 - {this.voice?.nickname}</button> */}
          <JXVoicePicker />
          <JXFlex alignItems="center">
            <span class="mr-1">字幕</span>
            <ElSwitch
              modelValue={this.workspace.captionEnable}
              // @ts-ignore
              onChange={this.setCaptionEnable}
            />
          </JXFlex>
        </JXFlex>
        <textarea
          value={this.slide?.notes}
          placeholder="输入语音文字"
          rows={6}
          onBlur={this.setNote}
        ></textarea>
      </div>
    );
  },
});
