import { defineComponent } from "vue";
import Canvas from "./canvas";
import Sidebar from "./sidebar";
import Header from "./header";

export default defineComponent({
  render() {
    return (
      <div class="ss-editor-page">
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