import { computed, ref } from "vue";
import { canvasStore } from "@/stores/canvas";
import { editLayerStore } from "@/stores/edit-layer";
import { preziStore } from "@/stores/prezi";
import { IEText } from "@/structs";

export function useText(data: IEText) {
  const root = ref<HTMLDivElement>()
  const content = ref<HTMLDivElement>()
  // 选中时标记可编辑，如果有移动则禁止进入编辑
  const editable = ref(false)
  const showPlaceholder = ref(!data.payload.content)
  const active = computed(() => data.id === preziStore.currentElementId)

  const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
    const { width, height } = contentRect
    editLayerStore.setRect(width, height)
  })

  const handleMousedown = () => {
    if (canvasStore.editing) return
    if (active.value) {
      editable.value = true
    }
  }

  const handleMousemove = () => {
    if (canvasStore.editing) return
    editable.value = false
  }

  const handleMouseup = () => {
    if (editable.value && content.value && !canvasStore.editing) {
      content.value.contentEditable = 'true'
      content.value.focus()
      canvasStore.editing = true
      // 输入时监听元素大小变化，同步给编辑框
      resizeObserver.observe(root.value!)
    }
  }
  const handleBlur = (ev: Event) => {
    const $content = ev.target as HTMLDivElement
    const html = $content.innerHTML
    preziStore.updateElementPayload({ content: html }, data.id)
    $content.contentEditable = 'false'
    editable.value = false
    canvasStore.editing = false
    resizeObserver.unobserve(root.value!)
    preziStore.save(data.id)
  }

  const handleInput = (ev: Event) => {
    const text = (ev.target as HTMLDivElement).innerText.replace('\n', '')
    if (!text) {
      (ev.target as HTMLDivElement).innerHTML = '<p><br></p>'
      showPlaceholder.value = true
    } else if (showPlaceholder.value) {
      showPlaceholder.value = false
    }
  }

  return {
    editable,
    active,
    content,
    root,
    showPlaceholder,
    resizeObserver,
    handleMousedown,
    handleMousemove,
    handleMouseup,
    handleBlur,
    handleInput,
  }
}