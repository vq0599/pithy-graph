import { WorkspaceAPI } from '@/api';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ISlide } from '@/structs';
import './index.scss';
import PithyCanvas from '@/components/canvas';

const calcRect = () => {
  const maxWidth = 1920;
  const maxHeight = 1080;
  const canvasRatio = 16 / 9;
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight - 50;

  let width, height;
  // 4K屏幕，需要考虑最大值不能对于maxWidth * maxHeight
  if (containerWidth >= maxWidth && containerHeight >= maxHeight) {
    width = maxWidth;
    height = maxHeight;
  } else if (containerWidth / maxWidth < containerHeight / maxHeight) {
    width = containerWidth;
    height = containerWidth / canvasRatio;
  } else {
    width = containerHeight * canvasRatio;
    height = containerHeight;
  }

  return { height, width };
};

export default defineComponent({
  name: 'pithy-product-page',
  setup() {
    const root = ref<HTMLDivElement>();
    const { params } = useRoute();
    const slides = ref<ISlide[]>([]);
    const rect = calcRect();
    const width = ref(rect.width);
    const height = ref(rect.height);
    const current = ref(0);

    const handleCalcRect = () => {
      const rect = calcRect();
      width.value = rect.width;
      height.value = rect.height;
    };

    onMounted(async () => {
      const { data } = await WorkspaceAPI.getOne(+params.id);
      slides.value = data.slides;
      window.addEventListener('resize', handleCalcRect);
      document.addEventListener('keydown', (ev: KeyboardEvent) => {
        if (ev.code === 'F5') {
          if (root.value && !document.fullscreenElement) {
            root.value?.requestFullscreen();
          }
        } else if (ev.code === 'ArrowLeft' || ev.code === 'ArrowUp') {
          if (current.value > 0) {
            current.value--;
          }
        } else if (ev.code === 'ArrowRight' || ev.code === 'ArrowDown') {
          if (current.value < slides.value.length - 1) {
            current.value++;
          }
        }
      });
    });
    return {
      root,
      width,
      height,
      slides,
      current,
    };
  },
  methods: {
    handleSetCurrent(index: number) {
      this.current = index;
    },
  },
  render() {
    const { width, height, slides, current } = this;
    if (!slides.length) return;

    return (
      <div class="pithy-product-page" ref="root">
        <div class="product-container">
          <PithyCanvas
            key={current}
            width={width}
            height={height}
            slide={slides[current]}
            readonly
          />
        </div>
        <div class="product-controller">
          <div class="product-controller-indicator">
            {slides.map((slide, index) => (
              <span
                onClick={() => this.handleSetCurrent(index)}
                class={{ active: index === current }}
                key={slide.id}
              >
                <i></i>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
