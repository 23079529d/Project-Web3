import { createStore } from 'vuex'
import api from '@/api'

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    jobs: [],
    myApplications: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },
    SET_JOBS(state, jobs) {
      state.jobs = jobs
    },
    ADD_JOB(state, job) {
      state.jobs.push(job)
    },
    SET_MY_APPLICATIONS(state, apps) {
      state.myApplications = apps
    }
  },
  actions: {
    async register({ commit }, formData) {
      const res = await api.register(formData)
      commit('SET_USER', res.data)
      return res
    },
    async login({ commit }, credentials) {
      const res = await api.login(credentials)
      commit('SET_USER', res.data)
      return res
    },
    async logout({ commit }) {
       try {
        await api.logout()
        commit('SET_USER', null)
      } catch (error) {
        console.error('Logout failed', error)
        throw error
      }
    },
    async fetchCurrentUser({ commit }) {
      try {
        const res = await api.getCurrentUser()
        commit('SET_USER', res.data)
      } catch {
        commit('SET_USER', null)
      }
    },
    async fetchJobs({ commit }) {
      const res = await api.getJobs()
      commit('SET_JOBS', res.data)
    },
    async createJob({ commit }, jobData) {
      const res = await api.createJob(jobData)
      commit('ADD_JOB', res.data)
      return res
    },
    async fetchMyApplications({ commit }) {
      const res = await api.getMyApplications()
      commit('SET_MY_APPLICATIONS', res.data)
    }
  },
  getters: {
    isCompany: state => state.user?.user_type === 'company',
    isIndividual: state => state.user?.user_type === 'individual'
  }
})