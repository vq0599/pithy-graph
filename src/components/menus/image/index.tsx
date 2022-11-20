import { defineComponent } from 'vue';
import MediaLibrary from '@/components/media-library';
import { preziStore } from '@/stores/prezi';
import { globalStore } from '@/stores/global';
import { IElementTypes } from '@/structs';
import './index.scss';

export default defineComponent({
  name: 'pithy-image-menu',
  methods: {
    handleSelect({
      url,
      type,
      naturalHeight,
      naturalWidth,
    }: {
      type: IElementTypes;
      url: string;
      naturalWidth: number;
      naturalHeight: number;
    }) {
      preziStore.createElement(type, {
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
