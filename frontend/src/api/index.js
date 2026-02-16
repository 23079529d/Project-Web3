import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

export const apiMultipart = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'multipart/form-data' }
})

api.interceptors.request.use(config => {
  const csrftoken = Cookies.get('csrftoken')
  console.log(`[${config.method.toUpperCase()}] ${config.url} - Token:`, csrftoken)
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken
  } else {
    console.warn('CSRF token not found in cookies!')
  }
  return config
})

apiMultipart.interceptors.request.use(config => {
  const csrftoken = Cookies.get('csrftoken')
  console.log(`[${config.method.toUpperCase()}] ${config.url} (multipart) - Token:`, csrftoken)
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken
  }
  return config
})

export default {
  register(data) {
    return apiMultipart.post('/accounts/register/', data)
  },
  login(credentials) {
    return api.post('/accounts/login/', credentials)
  },
  logout() {
    return api.post('/accounts/logout/')
  },
  getCurrentUser() {
    return api.get('/accounts/me/')
  },


  getJobs() {
    return api.get('/jobs/')
  },
  getJob(id) {
    return api.get(`/jobs/${id}/`)
  },
  createJob(jobData) {
    return api.post('/jobs/', jobData)
  },

  applyToJob(jobId, formData) {
    return apiMultipart.post(`/applications/jobs/${jobId}/apply/`, formData)
  },
  getMyApplications() {
    return api.get('/applications/my/')
  },
  getApplicationDetail(id) {
    return api.get(`/applications/${id}/`)
  }
}