import { slideStore } from "@/stores/slide";
import { IImage } from "@/structs";
import { defineComponent } from "vue";
import MediaLibrary from '@/components/media-library'
import './index.scss'

export default defineComponent({
  name: 'pithy-picture-menu',
  methods: {
    handleSelect({ url, naturalHeight, naturalWidth }: { url: string, naturalWidth: number, naturalHeight: number }) {
      const options: Partial<IImage> = {
        url,
        width: 360,
        height: 360 * naturalHeight / naturalWidth,
        naturalWidth,
        naturalHeight,
      }
      slideStore.appendElement({
        type: 'IMAGE',
        ...options,
      })
    }
  },
  render() {
    return (
      <MediaLibrary onSelect={this.handleSelect} />
    )
  }
})