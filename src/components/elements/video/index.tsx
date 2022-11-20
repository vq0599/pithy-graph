import { defineComponent, PropType } from 'vue';
import { IEVideo } from '@/structs';
import { VideoPlay, VideoPause } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { canvasStore } from '@/stores/canvas';
import { useVideo } from '@/hooks/video';
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
  setup(props) {
    return useVideo(props.data, props.readonly);
  },
  render() {
    const { url } = this.data.payload;
    return (
      <div class="pithy-element-video">
        <video ref="video" src={url} loop preload="metadata"></video>
        {canvasStore.scale > 0.15 && this.playable && (
          <ElIcon
            size={48 / canvasStore.scale}
            class={{ 'video-is-play': this.playing }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore Element的错误
            onClick={this.handleTogglePlay}
          >
            {this.playing ? <VideoPause /> : <VideoPlay />}
          </ElIcon>
        )}
      </div>
    );
  },
});
