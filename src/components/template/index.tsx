import { BeautifyAPI, SlideAPI } from '@/api';
import { ISlide } from '@/core';
import { ElButton, ElMessage, ElScrollbar } from 'element-plus';
import { defineComponent, ref } from 'vue';
import PithyCanvas from '@/core/components/canvas';
import { usePreziStore } from '@/stores/pinia';
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
  },
  render() {
    return (
      <div class="pithy-beautify-box">
        <ElButton onClick={this.handleListTemplate}>AI-TO</ElButton>
        <ElScrollbar>
          <div class="pithy-templates">
            {this.slides.map(({ data, relations }) => (
              <div onClick={() => this.handleBeautify(data, relations)}>
                <PithyCanvas width={160} height={90} slide={data} readonly />
              </div>
            ))}
          </div>
        </ElScrollbar>
      </div>
    );
  },
});
