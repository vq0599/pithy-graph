import { IEVideo } from '@/structs';
import { ref } from 'vue';

export function useVideo(data: IEVideo, readonly: boolean) {
  if (readonly) {
    return {
      playable: false,
      playing: false,
      handleTogglePlay: undefined,
    };
  }
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
    playable: true,
    playing,
    video,
    handleTogglePlay,
  };
}
