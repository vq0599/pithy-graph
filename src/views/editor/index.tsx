import { defineComponent, ref } from "vue";
import Canvas from "./canvas";
import Sidebar from "./sidebar";
import Header from "./header";
import SlideMenu from './slide-menu'
import { preziStore } from "@/stores/prezi";
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
      await preziStore.initialize(+this.$route.params.id)
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