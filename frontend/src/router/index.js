import { createRouter, createWebHistory } from 'vue-router'
import TodosView from '../views/TodosView.vue'
import NewTodoView from '../views/NewTodoView.vue'

const routes = [
  {
    path: '/',
    name: 'todos',
    component: TodosView
  },
  {
    path: '/new-todo',
    name: 'new-todo',
    component: NewTodoView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
