<template>
  <div v-if="job" class="box">
    <h2 class="title is-4">{{ job.title }}</h2>
    <p><strong>Company:</strong> {{ job.company_detail?.username }}</p>
    <p><strong>Requirement:</strong> {{ job.requirement }}</p>
    <p><strong>Duty:</strong> {{ job.duty }}</p>
    <p><strong>Salary:</strong> {{ job.salary }}</p>

    <div v-if="isIndividual" class="mt-5">
      <hr />
      <h3 class="title is-5">Apply for this job</h3>
      <form @submit.prevent="submitApplication">
        <div class="field">
          <label class="label">Message (optional)</label>
          <div class="control">
            <textarea class="textarea" v-model="application.message" rows="3"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">CV (PDF/DOC)</label>
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" @change="onCVChange" accept=".pdf,.doc,.docx" required />
              <span class="file-cta">
                <span class="file-icon">📁</span>
                <span class="file-label">Choose file</span>
              </span>
              <span class="file-name">{{ cvFileName || 'No file selected' }}</span>
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" type="submit" :class="{ 'is-loading': submitting }">Apply</button>
          </div>
        </div>
        <div v-if="applyError" class="notification is-danger is-light">{{ applyError }}</div>
        <div v-if="applySuccess" class="notification is-success is-light">Application submitted!</div>
      </form>
    </div>
  </div>
  <div v-else class="has-text-centered">Loading...</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import api from '@/api'
import { toast } from 'bulma-toast'

const route = useRoute()
const store = useStore()
const job = ref(null)
const application = ref({ message: '', cv: null })
const cvFileName = ref('')
const submitting = ref(false)
const applyError = ref('')
const applySuccess = ref(false)

const isIndividual = computed(() => store.getters.isIndividual)

const fetchJob = async () => {
  const res = await api.getJob(route.params.id)
  job.value = res.data
}
onMounted(fetchJob)

const onCVChange = (e) => {
  const file = e.target.files[0]
  application.value.cv = file
  cvFileName.value = file ? file.name : ''
}

const submitApplication = async () => {
  if (!application.value.cv) {
    applyError.value = 'CV is required'
    return
  }
  submitting.value = true
  applyError.value = ''
  applySuccess.value = false
  const formData = new FormData()
  formData.append('message', application.value.message)
  formData.append('cv', application.value.cv)
  try {
    await api.applyToJob(job.value.id, formData)
    applySuccess.value = true
    toast({ message: 'Application submitted', type: 'is-success', duration: 2000 })
    application.value = { message: '', cv: null }
    cvFileName.value = ''
    document.querySelector('input[type=file]').value = ''
  } catch (err) {
    applyError.value = err.response?.data?.detail || 'Application failed'
  } finally {
    submitting.value = false
  }
}
</script>