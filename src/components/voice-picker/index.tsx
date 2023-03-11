import { VoiceAPI } from '@/api/modules/voice';
import { usePreziStore } from '@/stores';
import { IVoice } from '@/structs';
import { ElDialog } from 'element-plus';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { JXButton, JXFlex } from '../base';
import VoiceItem from './voice-item';
import IconMale from '@/assets/svg/male.svg?component';
import IconFemale from '@/assets/svg/female.svg?component';
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
      if (options.value.length) return;
      const { data } = await VoiceAPI.getList();
      options.value = data;
    };
    onMounted(async () => {
      fetchCurrentVoice();
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
      fetchVoiceList,
    };
  },
  methods: {
    handleSelect(voice: IVoice) {
      this.current = voice;
      this.preziStore.updateWorkspace({ voice: String(voice.id) });
      this.visible = false;
    },
    renderTrigger() {
      if (!this.current) return '选择播音员';
      const { gender, country, language, nickname } = this.current;
      return (
        <JXButton
          width="200px"
          type="action"
          active={this.visible}
          // @ts-ignore
          onClick={() => (this.visible = true)}
        >
          <span class="mr-2">
            {country} - {language}
          </span>
          <JXFlex tag="span" inline alignItems="center">
            {gender === 'male' ? <IconMale /> : <IconFemale />}
            <span class="ml-1">{nickname}</span>
          </JXFlex>
        </JXButton>
      );
    },
  },
  render() {
    return (
      <div>
        {this.renderTrigger()}
        <ElDialog
          closeOnPressEscape={false}
          closeOnClickModal={false}
          v-model={this.visible}
          onOpen={this.fetchVoiceList}
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
