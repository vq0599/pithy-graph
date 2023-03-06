import { defineComponent, FunctionalComponent } from 'vue';
import { ElTooltip, ElPopover } from 'element-plus';
import IconText from '@/assets/svg/text.svg?component';
import IconImage from '@/assets/svg/image.svg?component';
import IconShape from '@/assets/svg/shape.svg?component';
import IconVideo from '@/assets/svg/video.svg?component';
import IconRecord from '@/assets/svg/record.svg?component';
import IconMan from '@/assets/svg/man.svg?component';
import TextMenu from '@/components/menus/text';
import ImageMenu from '@/components/menus/image';
import ShapeMenu from '@/components/menus/shape';
import AvatarMenu from '@/components/menus/avatar';
import { useEditorStore } from '@/stores';
import { IElementTypes } from '@/core';

export default defineComponent({
  name: 'header-menu',
  setup() {
    const editorStore = useEditorStore();
    return {
      editorStore,
    };
  },
  methods: {
    renderPopover(
      type: IElementTypes,
      label: string,
      Icon: FunctionalComponent,
      // 这个咋定义
      Component: any
    ) {
      const { menuVisible } = this.editorStore;
      return (
        <ElPopover
          showArrow={false}
          trigger="click"
          width={'auto'}
          v-model:visible={menuVisible[type]}
          offset={8}
          popperStyle={{ padding: 0 }}
        >
          {{
            reference: () => (
              <li>
                <Icon />
                <span>{label}</span>
              </li>
            ),
            default: () => <Component />,
          }}
        </ElPopover>
      );
    },
  },
  render() {
    return (
      <ul class="header-menu">
        {this.renderPopover('TEXT', '文字', IconText, TextMenu)}
        {this.renderPopover('IMAGE', '图片', IconImage, ImageMenu)}
        {this.renderPopover('SHAPE', '图形', IconShape, ShapeMenu)}
        <ElTooltip content="敬请期待">
          <li>
            <IconVideo />
            <span>视频</span>
          </li>
        </ElTooltip>
        <ElTooltip content="敬请期待">
          <li>
            <IconRecord />
            <span>录制</span>
          </li>
        </ElTooltip>
        {this.renderPopover('AVATAR', '数字人', IconMan, AvatarMenu)}
      </ul>
    );
  },
});
