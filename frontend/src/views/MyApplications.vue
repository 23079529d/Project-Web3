<template>
  <div>
    <h2 class="title is-4">Applications Received</h2>
    <div v-if="applications.length" class="box">
      <div v-for="app in applications" :key="app.id" class="media">
        <div class="media-content">
          <p class="title is-5">{{ app.job_detail?.title }}</p>
          <p class="subtitle is-6">from {{ app.applicant_detail?.nickname || app.applicant_detail?.username }}</p>
          <p><small>Applied: {{ new Date(app.applied_at).toLocaleString() }}</small></p>
          <router-link :to="`/applications/${app.id}`" class="button is-small is-primary">View Details</router-link>
        </div>
      </div>
    </div>
    <p v-else class="has-text-grey">No applications yet.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const applications = computed(() => store.state.myApplications)

onMounted(() => {
  store.dispatch('fetchMyApplications')
})
</script>

<style scoped>
.media:not(:last-child) {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
</style>