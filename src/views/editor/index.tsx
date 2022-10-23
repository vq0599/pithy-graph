import { defineComponent, ref } from "vue";
import Canvas from "./canvas";
import Sidebar from "./sidebar";
import Header from "./header";
import SlideMenu from './slide-menu'
import { workspaceStore } from "@/stores/workspace";
import { slideStore } from "@/stores/slide";
import "./index.scss"

export default defineComponent({
  setup() {
    return {
      ready: ref(false)
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      // 获取workspace数据
      const workspace = await workspaceStore.initialize(+this.$route.params.id)
      // 默认打开第一页
      await slideStore.setTarget(workspace.slides[0].id)
      this.ready = true
    }
  },
  render() {
    if (!this.ready) return null
    return (
      <div class="pithy-editor-page" >
        <Header />
        <div>
          <Sidebar />
          <main>
            <Canvas />
            <SlideMenu />
          </main>
        </div>
      </div>
    )
  }
})