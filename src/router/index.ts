import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home';
import NotFoundView from '@/views/not-found';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    },
  ],
});
