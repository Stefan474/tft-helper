import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemView from '@/views/ItemView.vue'
import CreateView from '@/views/CreateView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/items',
    name: 'items',
    component: ItemView,
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView,
  }
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
