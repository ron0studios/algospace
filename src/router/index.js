import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProblemsView from '@/views/ProblemsView.vue'
import ProblemDetailsView from "@/views/ProblemDetailsView"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/problems',
    name: 'problems',
    component: ProblemsView,
  },
  {
    path: '/problems/:id',
    name: "problemDetails",
    component: ProblemDetailsView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
