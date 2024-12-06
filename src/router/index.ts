import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router';
import Home from '@/views/Home/index.vue';
import CreateEditUser from '@/views/User/CreateEditUser/index.vue';
import ShowUser from '@/views/User/Show/index.vue';
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/create',
      name: 'CreateUser',
      component: CreateEditUser,
    },
    {
      path: '/update/:id',
      name: 'EditUser',
      component: CreateEditUser,
    },
    {
      path: '/show/:id',
      name: 'ShowUser',
      component: ShowUser,
    },
  ],
})

export default router
