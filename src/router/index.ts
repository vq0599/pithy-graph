import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/editor')
    }
  ]
})

export default router
