import { UserAPI } from '@/api/modules/user';
import { ElMessage } from 'element-plus';
import { defineComponent, ref } from 'vue';
import { JXButton } from '../base';
import { useStorage } from '@vueuse/core';
import { STORAGE_TOKEN_KEY } from '@/utils/constants';
import './index.scss';

export default defineComponent({
  name: 'jx-auth-box',
  setup() {
    const status = ref<'login' | 'register'>('login');
    const account = ref('');
    const password = ref('');
    const invitedByCode = ref('');
    const verificationCode = ref('');
    const token = useStorage(STORAGE_TOKEN_KEY, '');
    return {
      token,
      status,
      account,
      password,
      invitedByCode,
      verificationCode,
    };
  },

  methods: {
    async handleLogin() {
      const { data } = await UserAPI.login(this.account, this.password);
      if (data.code) {
        ElMessage.error(data.message);
        return;
      }
      this.token = data.data.token;
      ElMessage.success('登录成功~');
      setTimeout(() => {
        this.$router.push('/dashboard');
      }, 1000);
    },
    handleRegister() {
      ElMessage.error('暂未取到短信验证码签名，明天再来看看吧');
      // const { account, password, invitedByCode, verificationCode } = this;
      // UserAPI.register({
      //   nickname: `新用户${account.substring(account.length - 4)}`,
      //   phone: account,
      //   password,
      //   invitedByCode,
      //   verificationCode,
      // });
    },
    handleVerify() {
      ElMessage.error('暂未取到短信验证码签名，明天再来看看吧');
    },
    renderLoginBox() {
      return (
        <div class="jx-auth-box">
          <span class="box-title">登录&nbsp;简形</span>
          <div class="box-form">
            <input v-model={this.account} placeholder="输入用于登录的手机号" />
            <input v-model={this.password} placeholder="输入密码" />
          </div>
          <JXButton
            class="box-submit-button"
            width="158px"
            onClick={this.handleLogin}
          >
            登录
          </JXButton>
          <span class="box-tips">
            还没有账号，<a onClick={() => (this.status = 'register')}>去注册</a>
          </span>
        </div>
      );
    },
    renderRegisterBox() {
      return (
        <div class="jx-auth-box">
          <span class="box-title">注册&nbsp;简形</span>
          <div class="box-form">
            <input v-model={this.account} placeholder="输入用于注册的手机号" />
            <div class="box-ver-code">
              <input v-model={this.verificationCode} placeholder="输入验证码" />
              <button onClick={this.handleVerify}>获取验证码</button>
            </div>
            <input v-model={this.password} placeholder="输入密码" />
            <input v-model={this.invitedByCode} placeholder="输入邀请码" />
          </div>
          <JXButton
            class="box-submit-button"
            width="158px"
            onClick={this.handleRegister}
          >
            注册
          </JXButton>
          <span class="box-tips">
            已有账号，<a onClick={() => (this.status = 'login')}>去登录</a>
          </span>
        </div>
      );
    },
  },
  render() {
    if (this.status === 'login') {
      return this.renderLoginBox();
    } else {
      return this.renderRegisterBox();
    }
  },
});
