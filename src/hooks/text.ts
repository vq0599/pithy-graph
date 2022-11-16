import { computed, onMounted, ref, watch } from 'vue';
import { canvasStore } from '@/stores/canvas';
import { preziStore } from '@/stores/prezi';
import { IEText } from '@/structs';
import { draggable } from '@/utils/draggable';

const defaultText = '<p><br></p>';

const getText = (html: string) => {
  const span = document.createElement('span');
  span.innerHTML = html;
  return span.innerText;
};

export function useText(data: IEText, readonly: boolean) {
  if (readonly)
    return {
      html: data.payload.content,
      handleBlur: undefined,
      handleInput: undefined,
      handlePaste: undefined,
      showPlaceholder: false,
    };
  const content = ref<HTMLDivElement>();
  /**
   * 选中时的可编辑标记，如果有移动则禁止进入编辑
   */
  const editable = ref(false);
  const showPlaceholder = ref(!getText(data.payload.content));
  const active = computed(() => data.id === preziStore.currentElementId);

  const addFocusListener = () => {
    if (!content.value) return;
    const onStart = () => {
      if (active.value && !canvasStore.editing) {
        editable.value = true;
      } else {
        // 不会再继续执行
        return false;
      }
    };
    const onDrag = () => {
      if (editable.value) {
        editable.value = false;
      }
    };
    const onStop = () => {
      if (editable.value) {
        content.value!.contentEditable = 'true';
        content.value!.focus();
        canvasStore.editing = true;
      }
    };
    draggable(content.value, {
      onDrag,
      onStart,
      onStop,
    });
  };

  onMounted(() => {
    addFocusListener();
  });

  // 字号、行高、宽度这三个因素会影响元素高度
  watch(
    () => `${data.payload.fontSize}-${data.payload.lineSpacing}-${data.width}`,
    () => {
      const height = content?.value?.clientHeight;
      if (height) {
        preziStore.updateElement({ height });
        preziStore.save();
      }
    }
  );

  const handleBlur = (ev: Event) => {
    const $content = ev.target as HTMLDivElement;
    const html = $content.innerHTML;
    preziStore.updateElementPayload({ content: html }, data.id);
    preziStore.updateElement(
      { width: $content.clientWidth, height: $content.clientHeight },
      data.id
    );
    $content.contentEditable = 'false';
    editable.value = false;
    canvasStore.editing = false;
    preziStore.save(data.id);
  };

  const handleInput = (ev: Event) => {
    const text = (ev.target as HTMLDivElement).innerText.replace('\n', '');
    if (!text) {
      (ev.target as HTMLDivElement).innerHTML = '<p><br></p>';
      showPlaceholder.value = true;
    } else if (showPlaceholder.value) {
      showPlaceholder.value = false;
    }
  };

  const handlePaste = (ev: ClipboardEvent) => {
    const text = ev.clipboardData?.getData('Text');
    document.execCommand('insertText', false, text);
    ev.preventDefault();
  };

  return {
    editable,
    active,
    content,
    html: data.payload.content || defaultText,
    showPlaceholder,
    handleBlur,
    handlePaste,
    handleInput,
  };
}
