import { BeautifyAPI, SlideAPI } from '@/api';
import { ISlide } from '@/core';
import { ElMessage, ElScrollbar, ElIcon, ElPopover } from 'element-plus';
import { MagicStick } from '@element-plus/icons-vue';
import { defineComponent, ref } from 'vue';
import { PreziCanvas } from '@/core';
import { usePreziStore } from '@/stores/prezi';
import './index.scss';

export default defineComponent({
  name: 'pithy-beautify-box',
  setup() {
    const preziStore = usePreziStore();
    return {
      preziStore,
      slides: ref<
        Array<{
          data: ISlide;
          relations: { sourceElementId: number; templateElementId: number }[];
        }>
      >([]),
    };
  },
  methods: {
    async handleListTemplate() {
      const slideId = this.preziStore.currentSlideId;
      const {
        data: { data },
      } = await BeautifyAPI.match(slideId);
      if (!data.result) {
        ElMessage.warning('未匹配到方案！');
        return;
      }

      const slides = await Promise.all(
        data.result.map(async ({ templateSlideId, elements }) => {
          const { data } = await SlideAPI.get(templateSlideId);
          return { data, relations: elements };
        })
      );
      this.slides = slides;
    },
    handleBeautify(
      slide: ISlide,
      relations: { sourceElementId: number; templateElementId: number }[]
    ) {
      const previewSlide: ISlide = JSON.parse(JSON.stringify(slide));
      relations.forEach(({ sourceElementId, templateElementId }) => {
        const sourceElement = this.preziStore.elements.find(
          (v) => v.id === sourceElementId
        );
        const templateElement = previewSlide.elements.find(
          (v) => v.id === templateElementId
        );
        if (templateElement && sourceElement) {
          switch (sourceElement.type) {
            case 'TEXT':
              templateElement.payload.content = sourceElement.payload.content;
              break;
            case 'IMAGE':
              templateElement.payload.url = sourceElement.payload.url;
              break;
            default:
              break;
          }
        }
      });

      this.preziStore.previewSlide = previewSlide;
    },
    handleCancel() {
      this.preziStore.previewSlide = undefined;
    },
    handleSave() {
      // 暂时不知道怎么处理多出的元素
    },
    renderTrigger() {
      return (
        <span class="box-trigger" onClick={this.handleListTemplate}>
          智能美化&nbsp;&nbsp;
          <ElIcon>
            <MagicStick />
          </ElIcon>
        </span>
      );
    },
  },
  render() {
    return (
      <div class="pithy-beautify-box">
        <ElPopover
          width="100%"
          onAfter-leave={this.handleCancel}
          trigger="click"
          teleported={false}
          v-slots={{ reference: () => this.renderTrigger() }}
        >
          <ElScrollbar>
            <div class="box-template-list">
              {this.slides.map(({ data, relations }) => (
                <div
                  class="box-template-item"
                  onMouseenter={() => this.handleBeautify(data, relations)}
                >
                  <PreziCanvas width={160} height={90} slide={data} withMask />
                  <div class="box-action-layer">
                    {/* <ElButton size="small" onClick={this.handleSave}>
                      点击保存
                    </ElButton> */}
                  </div>
                </div>
              ))}
            </div>
          </ElScrollbar>
        </ElPopover>
      </div>
    );
  },
});
