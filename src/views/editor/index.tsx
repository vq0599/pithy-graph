import { defineComponent } from "vue";
import Canvas from "./canvas";
import Sidebar from "./sidebar";
import Header from "./header";
import "./index.scss"

export default defineComponent({
  render() {
    return (
      <div class="pithy-editor-page">
        <Header />
        <div>
          <Sidebar />
          <main>
            <Canvas />
          </main>
        </div>
      </div>
    )
  }
})