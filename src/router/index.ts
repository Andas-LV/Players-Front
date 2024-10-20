import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/player/:id',
      name: 'Player',
      component: () => import('../views/Player.vue')
    },
    {
      path: '/compare',
      name: 'ComparePlayers',
      component: () => import('../views/ComparePlayers.vue')
    },
  ]
})

export default router
