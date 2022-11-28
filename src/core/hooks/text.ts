import { onMounted, ref, computed, watch } from 'vue';
import { IElement, IEText } from '@/core/types';
import { draggable } from '@/core/utils/draggable';
import { useInject } from '../store';

const defaultText = '<p><br></p>';

const getText = (html: string) => {
  const span = document.createElement('span');
  span.innerHTML = html;
  return span.innerText;
};

export const useText = (data: IEText) => {
  const { readonly, current, emitChange } = useInject();
  if (readonly.value) {
    return {
      showPlaceholder: false,
      html: data.payload.content,
    };
  }

  /**
   * 选中时的可编辑标记，如果有移动则禁止进入编辑
   */
  const editable = ref(false);
  const active = computed(() => current.value?.id === data.id);
  const showPlaceholder = ref(!getText(data.payload.content));
  const editor = ref<HTMLDivElement>();

  const onStart = () => {
    if (active.value) {
      editable.value = true;
    } else {
      // 不会再继续执行
      return false;
    }
  };

  // 监听可能引起宽高变化的属性
  watch(
    () => [
      data.payload.content,
      data.payload.fontSize,
      data.payload.bold,
      data.payload.letterSpacing,
      data.payload.italic,
      data.payload.lineSpacing,
      data.payload.paragraphSpacing,
    ],
    () => {
      const { offsetWidth: width, offsetHeight: height } = editor.value!;
      const changes: Partial<Pick<IElement, 'width' | 'height'>> = { height };
      if (data.payload.free) {
        changes.width = width;
      }
      emitChange(data.id, changes);
    },
    {
      flush: 'post',
    }
  );

  const onDrag = () => {
    if (editable.value) {
      editable.value = false;
    }
  };
  const onStop = () => {
    if (editable.value) {
      editor.value!.contentEditable = 'true';
      editor.value!.focus();
    }
  };

  const handleInput = () => {
    const $el = editor.value!;
    const text = $el.innerText.replace('\n', '');
    if (!text) {
      $el.innerHTML = '<p><br></p>';
      showPlaceholder.value = true;
      console.log('set');
    } else if (showPlaceholder.value) {
      showPlaceholder.value = false;
    }
  };

  const handleBlur = () => {
    const $el = editor.value!;
    const { offsetHeight, offsetWidth, innerHTML } = $el;
    $el.contentEditable = 'false';
    editable.value = false;

    // 文本存在变化
    if (innerHTML !== data.payload.content) {
      emitChange(data.id, {
        width: offsetWidth,
        height: offsetHeight,
        payload: { content: innerHTML },
      });
    }
  };

  const handlePaste = (ev: ClipboardEvent) => {
    const text = ev.clipboardData?.getData('Text');
    document.execCommand('insertText', false, text);
    ev.preventDefault();
  };

  onMounted(() => {
    if (!editor.value) return;
    draggable(editor.value, {
      onDrag,
      onStart,
      onStop,
    });

    editor.value.addEventListener('input', handleInput);
    editor.value.addEventListener('blur', handleBlur);
    editor.value.addEventListener('paste', handlePaste);
  });
  return {
    showPlaceholder,
    html: data.payload.content || defaultText,
    editor,
  };
};
