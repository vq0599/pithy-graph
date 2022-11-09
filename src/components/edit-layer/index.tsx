import { canvasStore } from '@/stores/canvas';
import { editLayerStore } from '@/stores/edit-layer';
import { preziStore } from '@/stores/prezi';
import { IElement } from '@/structs';
import { draggable, DraggableData } from '@/utils/draggable';
import { parseStyles } from '@/utils/parse-styles';
import { calcPointsOfIntersection } from '@/utils/tool';
import { CSSProperties, defineComponent, PropType, ref } from 'vue';
import './index.scss';

/**
 * 如果不是需要全部的拖拽按钮，就定义出来
 */
const controllerDisplayRecord: Record<string, string[]> = {
  TEXT: ['left', 'right'],
};

export default defineComponent({
  props: {
    canvas: {
      type: Object as PropType<HTMLDivElement>,
    },
  },
  setup() {
    const layer = ref<HTMLDivElement>();
    return {
      layer,
    };
  },
  computed: {
    styles(): CSSProperties {
      if (!preziStore.currentElement) return {};
      const { width, height } = editLayerStore;
      const { x, y, rotate } = preziStore.currentElement;
      const { scale } = canvasStore;
      // +10/-5: 留点空隙更便于看光标
      return parseStyles({
        width: width * scale,
        height: height * scale,
        x: x * scale,
        y: y * scale,
        rotate,
      });
    },
  },
  mounted() {
    if (this.layer) {
      draggable(this.layer, {
        onStart: this.handleDragStart,
        onDrag: this.handleDragMove,
        onStop: this.handleDragStop,
        document: true,
      });
    }
  },
  methods: {
    handleDragStart(ev: MouseEvent) {
      ev.stopPropagation();
      const actions = (ev.target as HTMLElement).dataset.action;
      const { width, height } = editLayerStore;
      const { x, y } = preziStore.currentElement!;
      return {
        actions,
        originalWidth: width,
        originalHeight: height,
        originalX: x,
        originalY: y,
      };
    },
    handleDragMove(
      ev: MouseEvent,
      { tx, ty }: DraggableData,
      {
        actions,
        originalWidth,
        originalHeight,
        originalX,
        originalY,
      }: {
        actions: string;
        originalWidth: number;
        originalHeight: number;
        originalX: number;
        originalY: number;
      }
    ) {
      if (!preziStore.currentElement) return;
      const threshold = 10;
      const { scale } = canvasStore;

      if (Math.abs(tx) < threshold && Math.abs(ty) < threshold) {
        return;
      }

      const changes: Partial<Pick<IElement, 'height' | 'width' | 'x' | 'y'>> =
        {};

      // TODO: 处理等比缩放的情况
      let realTx = tx / scale;
      let realTy = ty / scale;

      // 拖拽四个点
      if (actions.includes('-')) {
        let p1;
        let p2;

        if (actions === 'top-right' || actions === 'bottom-left') {
          // 右上点和左下点
          p1 = { x: originalX + originalWidth, y: originalY };
          p2 = {
            x: originalX,
            y: originalY + originalHeight,
          };
        } else {
          // 右下点和左上点
          p1 = { x: originalX, y: originalX };
          p2 = {
            x: p1.x + originalWidth,
            y: p1.y + originalHeight,
          };
        }

        const p = { x: p2.x + realTx, y: p2.y + realTy };
        // 拖拽鼠标点与直线[p1-p2]的垂直交点
        const moveto = calcPointsOfIntersection(p, p1, p2);
        realTx = moveto.x - p2.x;
        realTy = moveto.y - p2.y;
      }

      actions.split('-').forEach((action) => {
        switch (action) {
          case 'left':
            changes.x = originalX + realTx;
            changes.width = originalWidth - realTx;
            break;
          case 'right':
            changes.width = originalWidth + realTx;
            break;
          case 'top':
            changes.y = originalY + realTy;
            changes.height = originalHeight - realTy;
            break;
          case 'bottom':
            changes.height = originalHeight + realTy;
            break;
          default:
            break;
        }
      });

      if (
        (changes.height || Number.MAX_SAFE_INTEGER) < 50 ||
        (changes.width || Number.MAX_SAFE_INTEGER) < 50
      )
        return;
      preziStore.updateElement(changes);
    },
    handleDragStop() {
      preziStore.save();
    },
    renderAlignLines() {
      const { scale } = canvasStore;
      const { vLines, hLines } = editLayerStore;
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
    renderActionDots() {
      const { type } = preziStore.currentElement!;
      const filters = controllerDisplayRecord[type];
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
        <div class="pithy-edit-layer-inner" ref="layer">
          {preziStore.currentElement && (
            <div class="pithy-edit-frame" style={this.styles}>
              {this.renderActionDots()}
            </div>
          )}
          {this.renderAlignLines()}
        </div>
      </div>
    );
  },
});
