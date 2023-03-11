import { defineComponent, ref } from 'vue';
import { ElIcon } from 'element-plus';
import { ArrowLeft, ArrowDown } from '@element-plus/icons-vue';
import { RouterLink } from 'vue-router';
import IconPlay from '@/assets/svg/play.svg?component';
import { useEditorStore, usePreziStore } from '@/stores';
import JXIconButton from '@/components/base/icon-button';
import JXButton from '@/components/base/button';
import HeaderMenu from './menu';
import './index.scss';

export default defineComponent({
  name: 'jx-editor-header',
  setup() {
    const editorStore = useEditorStore();
    const preziStore = usePreziStore();
    const titleInputVisible = ref(false);
    const titleInput = ref<HTMLInputElement>();
    return {
      editorStore,
      preziStore,
      titleInput,
      titleInputVisible,
    };
  },
  methods: {
    setTitle(ev: FocusEvent) {
      const title = (ev.target as HTMLInputElement).value;
      this.preziStore.updateWorkspace({ title });
      this.titleInputVisible = false;
    },
    handleToEdit() {
      this.titleInputVisible = true;
      this.$nextTick(() => {
        this.titleInput?.focus();
      });
    },
  },
  render() {
    return (
      <header class="jx-editor-header">
        <div class="header-left">
          <RouterLink to="/dashboard">
            <JXIconButton size="l">
              <ElIcon>
                <ArrowLeft />
              </ElIcon>
            </JXIconButton>
          </RouterLink>
          <div class="header-title-editable">
            {this.titleInputVisible && (
              <input
                type="text"
                ref="titleInput"
                onBlur={this.setTitle}
                value={this.preziStore.title}
              />
            )}
            {!this.titleInputVisible && [
              <span class="title-plain" onClick={this.handleToEdit}>
                {this.preziStore.title}
              </span>,
              <JXIconButton class="dropdown-entry" size="l">
                <ElIcon>
                  <ArrowDown />
                </ElIcon>
              </JXIconButton>,
            ]}
          </div>
        </div>
        <div class="header-menu-wrapper">
          <HeaderMenu />
        </div>
        {/* <ul class="header-menu">
          {list.map(({ label, Icon, Menu, key, popperClass }) => (
            <ElPopover
              persistent={false}
              popperClass={popperClass}
              trigger="click"
              hideAfter={0}
              v-model:visible={this.editorStore.menuVisible[key]}
              width="auto"
              showArrow={false}
              v-slots={{
                reference: () => (
                  <li>
                    <Icon />
                    <span>{label}</span>
                  </li>
                ),
              }}
            >
              <Menu />
            </ElPopover>
          ))}
        </ul> */}
        <div class="header-action">
          <JXButton type="secondary">
            {{
              icon: () => <IconPlay />,
              default: () => '预览',
            }}
          </JXButton>
          <JXButton>生成视频</JXButton>
        </div>
      </header>
    );
  },
});
