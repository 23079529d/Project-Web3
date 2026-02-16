<template>
  <div v-if="application" class="box">
    <h2 class="title is-4">Application Details</h2>
    <p><strong>Job:</strong> {{ application.job_detail?.title }}</p>
    <p><strong>Company:</strong> {{ application.job_detail?.company_detail?.username }}</p>
    <p><strong>Applicant:</strong> {{ application.applicant_detail?.nickname || application.applicant_detail?.username }}</p>
    <p><strong>Message:</strong> {{ application.message || '(No message)' }}</p>
    <p><strong>CV:</strong> <a :href="application.cv" target="_blank" class="button is-small is-link">Download CV</a></p>
    <p><strong>Applied at:</strong> {{ new Date(application.applied_at).toLocaleString() }}</p>
  </div>
  <div v-else class="has-text-centered">Loading...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'

const route = useRoute()
const application = ref(null)

onMounted(async () => {
  const res = await api.getApplicationDetail(route.params.id)
  application.value = res.data
})
</script>