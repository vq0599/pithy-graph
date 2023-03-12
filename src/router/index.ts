import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home';
import DashboardView from '@/views/dashboard';
import NotFoundView from '@/views/not-found';
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus';
import { useStorage } from '@vueuse/core';
import { STORAGE_TOKEN_KEY } from '@/utils/constants';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        noAuth: true,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/editor/:id(\\d+)',
      name: 'editor',
      component: () => import('@/views/editor'),
    },
    {
      path: '/product/:id(\\d+)',
      name: 'product',
      component: () => import('@/views/product'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        noAuth: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  if (to.meta.noAuth) {
    return true;
  }
  const user = useUserStore();
  if (user.current) return true;
  const tokenRef = useStorage(STORAGE_TOKEN_KEY, '');
  if (tokenRef.value) {
    // 不要阻塞渲染
    user.initialize();
    return true;
  } else {
    ElMessage.error('认证失败，请登陆！');
    return { path: '/' };
  }
  return true;
});
