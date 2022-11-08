import { canvasStore } from '@/stores/canvas';
import { editLayerStore } from '@/stores/edit-layer';
import { preziStore } from '@/stores/prezi';
import { IElement } from '@/structs';
import { draggable, DraggableData } from '@/utils/draggable';
import { parseStyles } from '@/utils/parse-styles';
import { CSSProperties, defineComponent, PropType, ref } from 'vue';
import './index.scss';

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
      const action = (ev.target as HTMLElement).dataset.action;
      const { width, height } = editLayerStore;
      const { x, y } = preziStore.currentElement!;
      return {
        action,
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
        action,
        originalWidth,
        originalHeight,
        originalX,
        originalY,
      }: {
        action: string;
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

      switch (action) {
        case 'left':
          changes.x = originalX + tx / scale;
          changes.width = originalWidth - tx / scale;
          break;
        case 'right':
          changes.width = originalWidth + tx / scale;
          break;
        case 'top':
          changes.y = originalY + ty / scale;
          changes.height = originalHeight - ty / scale;
          break;
        case 'bottom':
          changes.height = originalHeight + ty / scale;
          break;
        default:
          break;
      }
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
    handleMouseDown(startEvent: MouseEvent) {
      startEvent.stopPropagation();
      if (!preziStore.currentElement) return;
      const { width: oldWidth, height: oldHeight } = editLayerStore;
      const callback = (moveEvent: MouseEvent) => {
        if (!preziStore.currentElement) return;
        const threshold = 10;
        const distX = moveEvent.pageX - startEvent.pageX;
        const distY = moveEvent.pageY - startEvent.pageY;
        if (Math.abs(distX) < threshold && Math.abs(distY) < threshold) {
          return;
        }
        const width = oldWidth + distX / canvasStore.scale;
        const height = oldHeight + distY / canvasStore.scale;
        if (width < 50 || height < 50) return;
        const changes: Partial<Pick<IElement, 'height' | 'width'>> = {};
        switch (preziStore.currentElement.type) {
          case 'TEXT':
            changes.width = width;
            break;
          default:
            changes.width = width;
            changes.height = height;
            break;
        }
        preziStore.updateElement(changes);
      };
      document.onmousemove = callback;
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        preziStore.save();
      };
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
      return (
        <div class="pithy-edit-actions">
          <i data-action="left" class="action-rect-ver ver-left"></i>
          <i data-action="right" class="action-rect-ver ver-right"></i>
          <i data-action="top" class="action-rect-hor hor-top"></i>
          <i data-action="bottom" class="action-rect-hor hor-bottom"></i>
          <i data-action="bottom-right" class="action-dot dot-bottom-right"></i>
          <i data-action="top-left" class="action-dot dot-top-left"></i>
          <i data-action="bottom-left" class="action-dot dot-bottom-left"></i>
          <i data-action="top-right" class="action-dot dot-top-right"></i>
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
