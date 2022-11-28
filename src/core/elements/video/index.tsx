import { defineComponent, PropType, computed, ref } from 'vue';
import { IEVideo } from '../../types';
import { VideoPlay } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { draggable } from '@/core/utils/draggable';
import { useInject } from '@/core/store';
import './index.scss';

export default defineComponent({
  name: 'pithy-element-video',
  props: {
    data: {
      type: Object as PropType<IEVideo>,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { scale } = useInject();
    // 缩放比例太小时播放键比视频还大，就不显示了
    const btnVisible = computed(() => scale.value > 0.15);
    const video = ref<HTMLVideoElement>();
    const playing = ref<boolean>(false);
    return {
      scale,
      video,
      playing,
      btnVisible,
      flag: false,
    };
  },
  mounted() {
    if (this.video) {
      draggable(this.video, {
        onStart: () => {
          this.flag = true;
        },
        onDrag: () => {
          this.flag = false;
        },
        onStop: () => {
          if (this.flag) {
            this.handleTogglePlay();
            this.flag = false;
          }
        },
      });
    }
  },
  methods: {
    handleTogglePlay() {
      if (this.playing) {
        this.video?.pause();
      } else {
        this.video?.play();
      }
      this.playing = !this.playing;
    },
  },
  render() {
    const { url } = this.data.payload;
    return (
      <div class="pithy-element-video">
        <video ref="video" src={url} loop preload="metadata"></video>
        {this.btnVisible && !this.playing && (
          <ElIcon size={48 / this.scale}>
            <VideoPlay />
          </ElIcon>
        )}
      </div>
    );
  },
});
