import { defineComponent, ref } from 'vue';
import { usePreziStore, useEditorStore } from '@/stores';
import { IEAvatarDisplay } from '@/core';
import './index.scss';
import { AvatarAPI } from '@/api/modules/avatar';
import { IAvatar } from '@/structs';
import { ElScrollbar } from 'element-plus';
import { JXImg } from '@/components/base';

export default defineComponent({
  name: 'jx-avatar-menu',
  setup() {
    const preziStore = usePreziStore();
    const editorStore = useEditorStore();
    const samples = ref<IAvatar[]>([]);
    return {
      samples,
      preziStore,
      editorStore,
    };
  },
  mounted() {
    this.fetchSample();
  },
  methods: {
    async fetchSample() {
      const { data } = await AvatarAPI.getList();
      this.samples = data;
    },
    handleSelect({ id, headImageUrl, fullImageUrl }: IAvatar) {
      this.preziStore.createOrUpdateAvatar({
        x: 100,
        y: 500,
        width: 300,
        height: 300,
        payload: {
          display: IEAvatarDisplay.Circle,
          relationId: id,
          headImageUrl,
          fullImageUrl,
          background: 'rgba(255,255,255,1)',
        },
      });
      this.editorStore.closeMenu('AVATAR');
    },
  },
  render() {
    return (
      <ElScrollbar class="jx-avatar-menu" tag="ul" height={300}>
        {this.samples.map((avatar) => (
          <li onClick={() => this.handleSelect(avatar)}>
            <JXImg src={avatar.headImageUrl} width={100} height={100} />
          </li>
        ))}
      </ElScrollbar>
    );
  },
});
