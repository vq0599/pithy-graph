import { VoiceAPI } from '@/api/modules/voice';
import { usePreziStore } from '@/stores';
import { IVoice } from '@/structs';
import { ElDialog } from 'element-plus';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { JXButton } from '../base';
import VoiceItem from './voice-item';
import './index.scss';

export default defineComponent({
  name: 'jx-voice-picker',
  setup() {
    const preziStore = usePreziStore();
    const current = ref<IVoice>();
    const options = ref<IVoice[]>([]);
    const visible = ref(false);

    const fetchCurrentVoice = async () => {
      if (preziStore.workspace.voice) {
        const { data } = await VoiceAPI.get(preziStore.workspace.voice);
        current.value = data;
      }
    };
    const fetchVoiceList = async () => {
      const { data } = await VoiceAPI.getList();
      options.value = data;
    };
    onMounted(async () => {
      fetchCurrentVoice();
      fetchVoiceList();
    });
    const text = computed(() => {
      if (!current.value) return '选择播音员';
      const { country, language } = current.value;
      return `${country} - ${language}`;
    });
    return {
      current,
      text,
      visible,
      options,
      preziStore,
    };
  },
  methods: {
    handleSelect(voice: IVoice) {
      this.current = voice;
      this.preziStore.updateWorkspace({ voice: String(voice.id) });
      this.visible = false;
    },
  },
  render() {
    return (
      <div>
        <JXButton
          width="150px"
          type="action"
          active={this.visible}
          // @ts-ignore
          onClick={() => (this.visible = true)}
        >
          {this.text}
        </JXButton>
        <ElDialog
          closeOnPressEscape={false}
          closeOnClickModal={false}
          v-model={this.visible}
          title="选择播音员"
          class="jx-voice-picker-modal"
        >
          <ul>
            {this.options.map((voice) => (
              <VoiceItem
                voice={voice}
                active={voice.id === this.current?.id}
                // @ts-ignore
                onClick={() => this.handleSelect(voice)}
              ></VoiceItem>
            ))}
          </ul>
        </ElDialog>
      </div>
    );
  },
});
