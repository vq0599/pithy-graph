import { parseStyles } from '@/core/utils/parse-styles';
import { CSSProperties, defineComponent } from 'vue';
import { useEditLayerInject, useInject } from '@/core/store';
import { useResize } from '@/core/hooks/resize';
import { useEvent } from '@/core/hooks/event';
import './index.scss';

/**
 * 如果不是需要全部的拖拽按钮，就定义出来
 */
const controllerDisplayRecord: Record<string, string[]> = {
  TEXT: ['left', 'right'],
  VIDEO: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
};

export default defineComponent({
  setup() {
    const { scale, current, moving } = useInject();
    useEvent();
    return {
      scale,
      current,
      moving,
      ...useEditLayerInject(),
      ...useResize(),
    };
  },
  computed: {
    styles(): CSSProperties {
      if (!this.current) return {};
      const { x, y, rotate } = this.current;
      const { width, height } = this;
      return parseStyles(
        {
          width: width,
          height: height,
          x: x,
          y: y,
          rotate,
        },
        this.scale
      );
    },
  },
  methods: {
    renderAlignLines() {
      const { scale, vLines, hLines } = this;
      const VLines = vLines.map(({ length, value, origin }) => (
        <span
          class="v-line"
          style={{
            transform: `translate(${value * scale}px, ${origin * scale}px)`,
            height: `${length * scale}px`,
          }}
        />
      ));
      const HLines = hLines.map(({ length, value, origin }) => (
        <span
          class="h-line"
          style={{
            transform: `translate(${origin * scale}px, ${value * scale}px)`,
            width: `${length * scale}px`,
          }}
        />
      ));
      return VLines.concat(HLines);
    },
    renderAlignElements() {
      return this.aligned.map(({ raw: { x, y, w, h } }) => {
        const style = parseStyles({ x, y, width: w, height: h }, this.scale);
        return <div class="pithy-align-frame" style={style}></div>;
      });
    },
    renderActionDots() {
      if (!this.current || this.moving) return;
      const { type } = this.current;
      // 如果拖拽中，则只显示在拖拽的按钮
      const filters = this.resizing
        ? [this.resizing]
        : controllerDisplayRecord[type];

      const controllers = [
        <i
          key="left"
          draggable="false"
          data-action="left"
          class="action-rect-ver ver-left"
        />,
        <i
          key="right"
          draggable="false"
          data-action="right"
          class="action-rect-ver ver-right"
        />,
        <i
          key="top"
          draggable="false"
          data-action="top"
          class="action-rect-hor hor-top"
        />,
        <i
          key="bottom"
          draggable="false"
          data-action="bottom"
          class="action-rect-hor hor-bottom"
        />,
        <i
          key="bottom-right"
          draggable="false"
          data-action="bottom-right"
          class="action-dot dot-bottom-right"
        />,
        <i
          key="top-left"
          draggable="false"
          data-action="top-left"
          class="action-dot dot-top-left"
        />,
        <i
          key="bottom-left"
          draggable="false"
          data-action="bottom-left"
          class="action-dot dot-bottom-left"
        />,
        <i
          key="top-right"
          draggable="false"
          data-action="top-right"
          class="action-dot dot-top-right"
        />,
      ];
      return (
        <div class="pithy-edit-actions">
          {filters
            ? controllers.filter((el) => filters.includes(el.key as string))
            : controllers}
        </div>
      );
    },
  },
  render() {
    return (
      <div class="pithy-edit-layer">
        <div class="pithy-edit-layer-inner" ref="element">
          {this.current && (
            <div class="pithy-edit-frame" style={this.styles}>
              {this.renderActionDots()}
            </div>
          )}
          {this.renderAlignElements()}
          {this.renderAlignLines()}
        </div>
      </div>
    );
  },
});
