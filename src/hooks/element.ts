import { computed, onMounted, watch, ref } from "vue";
import { canvasStore } from "@/stores/canvas";
import { editLayerStore } from "@/stores/edit-layer";
import { preziStore } from "@/stores/prezi";
import { IElement } from "@/structs";
import { draggable, DraggableData } from "@/utils/draggable";

export function useElement(data: IElement, readonly: boolean) {
  if (readonly) return {
    handleMousedown: undefined
  }
  const active = computed(() => data.id === preziStore.currentElementId)
  const element = ref<HTMLDivElement>()

  /**
   * 元素尺寸同步给编辑框
   */
  const setEditLayerRect = () => {
    editLayerStore.setRect(
      element.value?.clientWidth,
      element.value?.clientHeight,
    )
  }

  /**
   * 监听器，监听元素resize同步编辑框
   */
  const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
    const { width, height } = contentRect
    editLayerStore.setRect(width, height)
  })

  /**
   * 给元素添加拖拽移动
   */
  const addDragListener = () => {
    if (!element.value) return
    const threshold = 10

    const onStart = () => {
      if (canvasStore.editing) return false
      return {
        startX: data.x,
        startY: data.y,
      }
    }
    const onDrag = (
      event: MouseEvent,
      { tx, ty }: DraggableData,
      { startX, startY }: { startX: number, startY: number }
    ) => {
      if (Math.abs(tx) < threshold && Math.abs(ty) < threshold) {
        return
      }
      preziStore.updateElement({
        x: startX + tx / canvasStore.scale,
        y: startY + ty / canvasStore.scale,
      })
    }
    draggable(element.value, {
      document: true,
      onStart,
      onDrag,
    })
  }

  onMounted(() => {
    if (active.value) {
      setEditLayerRect()
      resizeObserver.observe(element.value!)
    }
    addDragListener()
  })

  // 激活选中
  watch(active, (val) => {
    if (val) {
      setEditLayerRect()
      resizeObserver.observe(element.value!)
    } else {
      resizeObserver.unobserve(element.value!)
    }
  })

  const handleMousedown = () => {
    preziStore.selectElement(data.id)
  }

  return {
    active,
    element,
    handleMousedown
  }
}