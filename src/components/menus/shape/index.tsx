import { defineComponent } from 'vue';
import DiamondShape from '@/components/elements/shape/diamond';
import EllipseShape from '@/components/elements/shape/ellipse';
import RectangleShape from '@/components/elements/shape/rectangle';
import TriangleShape from '@/components/elements/shape/triangle';
import { globalStore } from '@/stores/global';
import { IEShapePayload } from '@/structs';
import { preziStore } from '@/stores/prezi';
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
  methods: {
    handleClick(payload: Partial<IEShapePayload>) {
      preziStore.createElement('SHAPE', {
        x: 500,
        y: 500,
        width: 100,
        height: 100,
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
