<template>
  <div>
    <h2 class="title is-4">All Jobs</h2>
    <div v-if="jobs.length" class="columns is-multiline">
      <div v-for="job in jobs" :key="job.id" class="column is-one-third">
        <div class="card">
          <div class="card-content">
            <p class="title is-5">{{ job.title }}</p>
            <p class="subtitle is-6">{{ job.company_detail?.username }}</p>
            <p class="has-text-weight-semibold has-text-primary">{{ job.salary }}</p>
          </div>
          <footer class="card-footer">
            <router-link :to="`/jobs/${job.id}`" class="card-footer-item">View</router-link>
          </footer>
        </div>
      </div>
    </div>
    <p v-else class="has-text-grey">No jobs available.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const jobs = computed(() => store.state.jobs)

onMounted(() => {
  store.dispatch('fetchJobs')
})
</script>