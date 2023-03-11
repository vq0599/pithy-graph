import { SlideAPI, WorkspaceAPI } from '@/api';
import { IWorkspace } from '@/structs';
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import './index.scss';

export default defineComponent({
  setup() {
    return {
      workspaces: ref<Remove<IWorkspace, 'slides'>[]>([]),
    };
  },
  mounted() {
    this.getWorkspaces();
  },
  methods: {
    async getWorkspaces() {
      const { data: workspaces } = await WorkspaceAPI.getAll();
      this.workspaces = workspaces;
    },
    async handleClick() {
      const { data: workspace } = await WorkspaceAPI.create({
        title: '新项目',
      });
      await SlideAPI.create({ workspaceId: workspace.id });
      this.workspaces.push(workspace);
    },
  },
  render() {
    return (
      <div class="jx-dashboard-page">
        <div class="workspace-list">
          {this.workspaces.map(({ id, title }) => (
            <RouterLink
              class="workspace-list-item"
              to={`/editor/${id}`}
              key={id}
            >
              <span>ID：{id}</span>
              <span>名称：{title}</span>
            </RouterLink>
          ))}
        </div>
        <button onClick={this.handleClick}>创建新项目</button>
      </div>
    );
  },
});
