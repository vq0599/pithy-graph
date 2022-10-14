import { defineComponent, ref } from "vue";
import TextIcon from '@/assets/icons/text.svg?component'
import PicIcon from '@/assets/icons/picture.svg?component'
import ShapeIcon from '@/assets/icons/shape.svg?component'
import { ElPopover } from 'element-plus'
import TextMenu from "../menu/text";
import ShapeMenu from "../menu/shape";
import ImageMenu from "../menu/image";

export default defineComponent({
  name: 'ss-editor-header',
  render() {
    return (
      <header class="ss-editor-header">
        <ul class="header-menu">
          <ElPopover showArrow={false} v-slots={{
            reference: () => (
              <li>
                <TextIcon />
                <span>文字</span>
              </li>
            )
          }}>
            <TextMenu onSelect={this.handleSelect} />
          </ElPopover>
          <ElPopover width={240} showArrow={false} v-slots={{
            reference: () => (
              <li>
                <PicIcon />
                <span>图片</span>
              </li>
            )
          }}>
            <ImageMenu />
          </ElPopover>
          <ElPopover showArrow={false} v-slots={{
            reference: () => (
              <li>
                <ShapeIcon />
                <span>图形</span>
              </li>
            )
          }}>
            <ShapeMenu />
          </ElPopover>
        </ul>
      </header>
    )
  },
  methods: {
    handleSelect(v: any) {
      console.log(v);
    }
  }
})