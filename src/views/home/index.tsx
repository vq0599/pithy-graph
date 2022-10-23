import { WorkspaceAPI } from "@/api";
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router"
import "./index.scss"

export default defineComponent({
  setup() {
    return {
      workspaces: ref<Remove<EWorkspace, "slides">[]>([])
    }
  },
  mounted() {
    // this.getWorkspaces()
  },
  methods: {
    async getWorkspaces() {
      const { data: workspaces } = await WorkspaceAPI.getAll()
      this.workspaces = workspaces
    }
  },
  render() {
    return (
      <div class="pithy-home-page">
        <div class="workspace-list">
          {
            this.workspaces.map(({ id, title }) => (
              <RouterLink class="workspace-list-item" to={`/editor/${id}`} key={id}>
                <span>ID：{id}</span>
                <span>名称：{title}</span>
              </RouterLink>
            ))
          }
        </div>
      </div>
    )
  },
})