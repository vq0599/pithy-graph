import { canvasStore } from '@/stores/canvas';
import { editLayerStore } from '@/stores/edit-layer';
import { preziStore } from '@/stores/prezi';
import { IElement } from '@/structs';
import { draggable, DraggableData } from '@/utils/draggable';
import { parseStyles } from '@/utils/parse-styles';
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
      const threshold = 10;
      const { scale } = canvasStore;

      if (Math.abs(tx) < threshold && Math.abs(ty) < threshold) {
        return;
      }

      const changes: Partial<Pick<IElement, 'height' | 'width' | 'x' | 'y'>> =
        {};

      // TODO: 处理等比缩放的情况
      const realTx = tx / scale;
      const realTy = ty / scale;
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
        <i key="left" data-action="left" class="action-rect-ver ver-left" />,
        <i key="right" data-action="right" class="action-rect-ver ver-right" />,
        <i key="top" data-action="top" class="action-rect-hor hor-top" />,
        <i
          key="bottom"
          data-action="bottom"
          class="action-rect-hor hor-bottom"
        />,
        <i
          key="bottom-right"
          data-action="bottom-right"
          class="action-dot dot-bottom-right"
        />,
        <i
          key="top-left"
          data-action="top-left"
          class="action-dot dot-top-left"
        />,
        <i
          key="bottom-left"
          data-action="bottom-left"
          class="action-dot dot-bottom-left"
        />,
        <i
          key="top-right"
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
