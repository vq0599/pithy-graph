import { defineComponent } from 'vue';
import { usePreziStore, useEditorStore } from '@/stores';
import './index.scss';
import { IEAvatarDisplay } from '@/core';

export default defineComponent({
  name: 'jx-avatar-menu',
  setup() {
    const preziStore = usePreziStore();
    const editorStore = useEditorStore();
    return {
      preziStore,
      editorStore,
    };
  },
  methods: {
    handleClick(ev: MouseEvent) {
      const { naturalHeight, naturalWidth, src } =
        ev.target as HTMLImageElement;
      this.preziStore.createElement('AVATAR', {
        x: 100,
        y: 500,
        width: naturalWidth,
        height: naturalHeight,
        payload: {
          display: IEAvatarDisplay.Full,
          background: 'rgba(255,255,255,1)',
          cover: src,
          naturalHeight,
          naturalWidth,
        },
      });
      this.editorStore.closeMenu('AVATAR');
    },
  },
  render() {
    return (
      <div class="jx-avatar-menu">
        <img
          onClick={this.handleClick}
          src="https://www.jianxing.top/file_statics/4e5c9423-d5c5-439d-879e-1fea35482d10.png"
          alt=""
        />
      </div>
    );
  },
});
