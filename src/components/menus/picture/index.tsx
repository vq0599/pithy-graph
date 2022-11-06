import { defineComponent } from 'vue';
import MediaLibrary from '@/components/media-library';
import { preziStore } from '@/stores/prezi';
import './index.scss';
import { globalStore } from '@/stores/global';

export default defineComponent({
  name: 'pithy-picture-menu',
  methods: {
    handleSelect({
      url,
      naturalHeight,
      naturalWidth,
    }: {
      url: string;
      naturalWidth: number;
      naturalHeight: number;
    }) {
      preziStore.createElement('IMAGE', {
        x: 100,
        y: 500,
        width: 500,
        height: (500 / naturalWidth) * naturalHeight,
        payload: {
          url,
          naturalHeight,
          naturalWidth,
        },
      });
      globalStore.closeMenu('IMAGE');
    },
  },
  render() {
    return <MediaLibrary onSelect={this.handleSelect} />;
  },
});
