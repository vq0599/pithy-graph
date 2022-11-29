import Hammer from 'hammerjs';
import { WorkspaceAPI } from '@/api';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ISlide, PreziCanvas } from '@/core';
import { calcCanvasRect } from '@/utils/tool';
import './index.scss';

export default defineComponent({
  name: 'pithy-product-page',
  setup() {
    const root = ref<HTMLDivElement>();
    const { params } = useRoute();
    const slides = ref<ISlide[]>([]);
    const width = ref(0);
    const height = ref(0);
    const current = ref(0);
    const offsetX = ref(0);
    const moving = ref(false);
    let flag = false;

    const handleResize = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight - 50;
      const rect = calcCanvasRect(containerWidth, containerHeight);
      width.value = rect.width;
      height.value = rect.height;
    };
    handleResize();

    onMounted(async () => {
      const { data } = await WorkspaceAPI.getOne(+params.id);
      slides.value = data.slides;
      window.addEventListener('resize', handleResize);
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

      const hammer = new Hammer(document.body);
      hammer.on('panmove', function (ev) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 类型定义错了
        const direction = ev.additionalEvent;
        if (!direction) return;
        if (
          current.value === slides.value.length - 1 &&
          direction === 'panleft'
        )
          return;
        if (current.value === 0 && direction === 'panright') return;

        offsetX.value = ev.deltaX;
        flag = true;
      });
      hammer.on('panend', function (ev) {
        if (Math.abs(ev.deltaX) < 50 || !flag) {
          offsetX.value = 0;
          return;
        }
        const step = ev.deltaX / Math.abs(ev.deltaX);
        moving.value = true;
        offsetX.value = 0;
        current.value -= step;
        setTimeout(() => {
          moving.value = false;
        }, 200);
        flag = false;
      });
    });
    return {
      root,
      width,
      height,
      slides,
      current,
      offsetX,
      moving,
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
          <div
            class="product-clip-wrapper"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <div
              class="product-clip-wrapper-long"
              style={{
                width: `${width * slides.length}px`,
                height: `${height}px`,
                transform: `translateX(${
                  current * -1 * width + this.offsetX
                }px)`,
                transition: this.moving ? `all 0.2s ease-in-out` : 'none',
              }}
            >
              {slides.map((slide) => (
                <PreziCanvas
                  key={slide.id}
                  width={width}
                  height={height}
                  slide={slide}
                  readonly
                />
              ))}
            </div>
          </div>
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
