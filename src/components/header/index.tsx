import { SlideAPI, WorkspaceAPI } from '@/api';
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus';
import { defineComponent } from 'vue';
import { JXButton, JXAvatar } from '../base';
import './index.scss';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  methods: {
    async handleCreated() {
      const { data: workspace } = await WorkspaceAPI.create({
        title: '新项目',
      });
      await SlideAPI.create({
        workspaceId: workspace.id,
        background: {
          color: 'rgba(255, 255, 255, 1)',
        },
      });
      ElMessage.success('创建成功~');
      setTimeout(() => {
        this.$router.push(`/editor/${workspace.id}`);
      }, 1000);
    },
  },
  render() {
    return (
      <header class="jx-header">
        <img
          class="jx-header-logo"
          src="https://pretty.jianxing.top/brand/black-name-slogan-logo.png"
        />
        <div class="jx-header-action">
          <JXButton class="mr-2" onClick={this.handleCreated}>
            创建新视频
          </JXButton>
          <JXAvatar user={this.userStore.current} />
        </div>
      </header>
    );
  },
});
