import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import JobList from '@/views/JobList.vue'
import JobDetail from '@/views/JobDetail.vue'
import CreateJob from '@/views/CreateJob.vue'
import MyApplications from '@/views/MyApplications.vue'
import ApplicationDetail from '@/views/ApplicationDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresGuest: true } },
  { path: '/jobs', name: 'JobList', component: JobList, meta: { requiresAuth: true } },
  { path: '/jobs/:id', name: 'JobDetail', component: JobDetail, meta: { requiresAuth: true } },
  { path: '/create-job', name: 'CreateJob', component: CreateJob, meta: { requiresAuth: true, requiresCompany: true } },
  { path: '/my-applications', name: 'MyApplications', component: MyApplications, meta: { requiresAuth: true, requiresCompany: true } },
  { path: '/applications/:id', name: 'ApplicationDetail', component: ApplicationDetail, meta: { requiresAuth: true, requiresCompany: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (!store.state.user && store.state.isAuthenticated === false) {
    await store.dispatch('fetchCurrentUser')
  }
  const isAuth = store.state.isAuthenticated
  const isCompany = store.getters.isCompany
  const isIndividual = store.getters.isIndividual

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuth) {
      next('/login')
    } else if (to.matched.some(record => record.meta.requiresCompany) && !isCompany) {
      next('/')
    } else if (to.matched.some(record => record.meta.requiresIndividual) && !isIndividual) {
      next('/')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest) && isAuth) {
    next('/')
  } else {
    next()
  }
})

export default router