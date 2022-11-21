import { scaleKey } from '@/components/canvas/provide-keys';
import { computed, inject, ref } from 'vue';

export function useVideo() {
  const scale = inject(scaleKey, ref(1));
  // 缩放比例太小时播放键比视频还大，就不显示了
  const btnVisible = computed(() => scale.value > 0.15);
  const video = ref<HTMLVideoElement>();
  const playing = ref<boolean>(false);

  const handleTogglePlay = () => {
    if (playing.value) {
      video.value?.pause();
    } else {
      video.value?.play();
    }
    playing.value = !playing.value;
  };
  return {
    btnVisible,
    playing,
    video,
    scale,
    handleTogglePlay,
  };
}
