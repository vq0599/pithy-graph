import { createApp } from 'vue';
import App from './app';
import router from './router';
import 'normalize.css';
import '@/styles/index.scss';
// import 'suitcss-utils'

const app = createApp(App);

app.use(router);

app.mount('#app');
