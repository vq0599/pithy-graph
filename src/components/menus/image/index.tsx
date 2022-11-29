import { defineComponent } from 'vue';
import MediaLibrary from '@/components/media-library';
import { IElementTypes } from '@/core';
import { usePreziStore, useEditorStore } from '@/stores';
import './index.scss';

export default defineComponent({
  name: 'pithy-image-menu',
  setup() {
    const preziStore = usePreziStore();
    const editorStore = useEditorStore();
    return {
      preziStore,
      editorStore,
    };
  },
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
      this.preziStore.createElement(type, {
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
      this.editorStore.closeMenu('IMAGE');
    },
  },
  render() {
    return <MediaLibrary onSelect={this.handleSelect} />;
  },
});
