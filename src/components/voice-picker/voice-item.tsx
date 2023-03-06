import { IVoice } from '@/structs';
import { ElIcon } from 'element-plus';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { JXFlex, JXFlexItem } from '../base';
import { VideoPause, VideoPlay } from '@element-plus/icons-vue';
import './index.scss';

export default defineComponent({
  name: 'jx-voice-item',
  props: {
    voice: {
      type: Object as PropType<IVoice>,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const audio = ref<HTMLAudioElement>();
    const playing = ref(false);
    onMounted(() => {
      audio.value?.addEventListener('ended', () => {
        playing.value = false;
      });
    });
    return {
      audio,
      playing,
    };
  },
  methods: {
    handlePlay(ev: MouseEvent) {
      ev.stopPropagation();
      if (this.playing) {
        this.audio?.pause();
      } else {
        this.audio?.play();
      }
      this.playing = !this.playing;
    },
  },
  render() {
    const { country, language, nickname, avatarUrl, previewUrl, scene } =
      this.voice;
    return (
      <JXFlex
        tag="li"
        class={['event-enable', { active: this.active }]}
        justifyContent="space-between"
        alignItems="center"
      >
        <JXFlex alignItems="center">
          <JXFlexItem tag="span" basis="120px" shrink={0}>
            {country}-{language}
          </JXFlexItem>
          <JXFlex inline alignItems="center" style={{ flexShrink: 0 }}>
            <img src={avatarUrl} />
            <span class="ml-1">{nickname}</span>
          </JXFlex>
        </JXFlex>
        <JXFlex alignItems="center">
          <span>{scene}</span>
          <ElIcon
            class="ml-1"
            size={16}
            // @ts-ignore
            onClick={this.handlePlay}
          >
            {this.playing ? <VideoPause /> : <VideoPlay />}
          </ElIcon>
          <audio ref="audio" src={previewUrl}></audio>
        </JXFlex>
      </JXFlex>
    );
  },
});
