import { computed, onMounted, watch, ref } from "vue";
import { canvasStore } from "@/stores/canvas";
import { editLayerStore } from "@/stores/edit-layer";
import { preziStore } from "@/stores/prezi";
import { IElement } from "@/structs";

export function useElement(data: IElement) {
  const active = computed(() => data.id === preziStore.currentElementId)
  const element = ref<HTMLDivElement>()
  const setEditLayerRect = () => {
    editLayerStore.setRect(
      element.value?.clientWidth,
      element.value?.clientHeight,
    )
  }
  const handleMousedown = (startEvent: MouseEvent) => {
    preziStore.selectElement(data.id)
    if (canvasStore.editing) return
    const startX = data.x
    const startY = data.y
    const threshold = 10
    const callback = (moveEvent: MouseEvent) => {
      const distX = moveEvent.pageX - startEvent.pageX
      const distY = moveEvent.pageY - startEvent.pageY
      if (Math.abs(distX) < threshold && Math.abs(distY) < threshold) {
        return
      }
      preziStore.updateElement({
        x: startX + distX / canvasStore.scale,
        y: startY + distY / canvasStore.scale,
      })
    }
    document.onmousemove = callback
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      preziStore.save()
    }
    
  }
  // 初始化选中
  onMounted(() => {
    if (active.value) {
      setEditLayerRect()
    }
  })
  // 点击选中
  watch(active, (val) => {
    if (val) {
      setEditLayerRect()
    }
  })
  return {
    active,
    element,
    handleMousedown
  }
}