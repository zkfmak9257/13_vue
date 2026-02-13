import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/posts',
      name: 'PostList',
      component: () => import('@/views/posts/PostList.vue')
    },
    {
      path: '/posts/create',
      name: 'PostCreate',
      component: () => import('@/views/posts/PostCreate.vue')
    },
    {
      path: '/posts/:id',
      name: 'PostDetail',
      component: () => import('@/views/posts/PostDetail.vue')
    },
    {
      path: '/posts/:id/edit',
      name: 'PostEdit',
      component: () => import('@/views/posts/PostEdit.vue')
    }
  ],
})

export default router
