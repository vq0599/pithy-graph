import { defineComponent } from 'vue';
import DiamondShape from '@/core/elements/shape/diamond';
import EllipseShape from '@/core/elements/shape/ellipse';
import RectangleShape from '@/core/elements/shape/rectangle';
import TriangleShape from '@/core/elements/shape/triangle';
import { globalStore } from '@/stores/global';
import { IEShapePayload } from '@/structs';
import { usePreziStore } from '@/stores/pinia';
import { Palette } from '@/utils/default-style-variables';
import './index.scss';

type IEShapeAppearance = 'diamond' | 'ellipse' | 'rectangle' | 'triangle';

const fillCommonOptions = {
  fill: Palette.shapeColor,
};

const strokeCommonOptions = {
  stroke: Palette.shapeColor,
  strokeWidth: 4,
};

const list = [
  {
    Component: RectangleShape,
    appearance: 'rectangle' as IEShapeAppearance,
  },
  {
    Component: RectangleShape,
    appearance: 'rectangle' as IEShapeAppearance,
    options: {
      radius: 8,
    },
  },
  {
    Component: EllipseShape,
    appearance: 'ellipse' as IEShapeAppearance,
  },
  {
    Component: TriangleShape,
    appearance: 'triangle' as IEShapeAppearance,
  },
  {
    Component: DiamondShape,
    appearance: 'diamond' as IEShapeAppearance,
  },
].map((v) => ({ fillCommonOptions, strokeCommonOptions, ...v }));

export default defineComponent({
  name: 'pithy-shape-menu',
  setup() {
    const preziStore = usePreziStore();
    return {
      preziStore,
    };
  },
  methods: {
    handleClick(payload: Partial<IEShapePayload>) {
      this.preziStore.createElement('SHAPE', {
        x: 500,
        y: 500,
        width: 200,
        height: 200,
        payload,
      });
      globalStore.closeMenu('SHAPE');
    },
  },
  render() {
    return (
      <div class="pithy-shape-menu">
        <ul>
          {list.map(({ Component, appearance, fillCommonOptions, options }) => {
            const _options = Object.assign({}, fillCommonOptions, options);
            return (
              <li onClick={() => this.handleClick({ appearance, ..._options })}>
                <Component width={80} height={80} {..._options} />
              </li>
            );
          })}
        </ul>
        <ul>
          {list.map(
            ({ Component, appearance, strokeCommonOptions, options }) => {
              const _options = Object.assign({}, strokeCommonOptions, options);
              return (
                <li
                  onClick={() => this.handleClick({ appearance, ..._options })}
                >
                  <Component width={80} height={80} {..._options} />
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  },
});
