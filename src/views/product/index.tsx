import { WorkspaceAPI } from '@/api';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ISlide } from '@/structs';
import PithyCanvas from '@/components/canvas';
import Hammer from 'hammerjs';
import './index.scss';

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
    const offsetX = ref(0);
    let flag = false;

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

      const hammer = new Hammer(document.body);
      hammer.on('panleft', function (ev) {
        if (current.value === slides.value.length - 1) return;
        offsetX.value = ev.deltaX;
        flag = true;
      });
      hammer.on('panright', function (ev) {
        if (current.value === 0) return;
        offsetX.value = ev.deltaX;
        flag = true;
      });
      hammer.on('panend', function (ev) {
        if (Math.abs(ev.deltaX) < 50 || !flag) {
          offsetX.value = 0;
          return;
        }
        console.log('放手执行了', ev.deltaX);
        const step = ev.deltaX / Math.abs(ev.deltaX);
        offsetX.value = 0;
        current.value -= step;
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
              }}
            >
              {slides.map((slide) => (
                <PithyCanvas
                  key={slide.id}
                  width={width}
                  height={height}
                  slide={slide}
                  readonly
                />
              ))}
            </div>

            {/* <PithyCanvas
              key={current}
              width={width}
              height={height}
              slide={slides[current]}
              readonly
            /> */}
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
