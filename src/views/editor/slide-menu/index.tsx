import { defineComponent, ref } from "vue";
import BackgroundIcon from '@/assets/icons/background.svg?component'
import TemplateIcon from '@/assets/icons/template.svg?component'
import BeautifyIcon from '@/assets/icons/beautify.svg?component'
import MediaLibrary from "@/components/media-library";
import "./index.scss"
import { preziStore } from "@/stores/prezi";

export default defineComponent({
  name: 'pithy-slide-menu',
  setup() {
    return {
      modelVisible: ref(false)
    }
  },
  methods: {
    handleOpenMediaLib() {
      this.modelVisible = true
    },
    handleSelectBackground({ url }: { url: string }) {
      preziStore.setSlideBackground({ image: url })
    }
  },
  render() {
    return (
      <div class="pithy-slide-menu-wrapper">
        <div class="pithy-slide-menu">
          <button>
            <TemplateIcon />
            <span>模板</span>
          </button>
          <button onClick={this.handleOpenMediaLib}>
            <BackgroundIcon />
            <span>背景</span>
          </button>
          <button>
            <BeautifyIcon />
            <span>美化</span>
          </button>
        </div>
        <MediaLibrary
          withModal
          v-model={this.modelVisible}
          onSelect={this.handleSelectBackground}
        />
      </div>
    )
  }
})