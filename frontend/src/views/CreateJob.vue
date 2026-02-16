<template>
  <div class="box" style="max-width: 600px; margin: 0 auto;">
    <h2 class="title is-4">Post a New Job</h2>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Job Title</label>
        <div class="control">
          <input class="input" type="text" v-model="form.title" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Requirement</label>
        <div class="control">
          <textarea class="textarea" v-model="form.requirement" rows="4" required></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Duty</label>
        <div class="control">
          <textarea class="textarea" v-model="form.duty" rows="4" required></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Salary</label>
        <div class="control">
          <input class="input" type="text" v-model="form.salary" required />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit" :class="{ 'is-loading': submitting }">Post Job</button>
        </div>
      </div>
      <div v-if="error" class="notification is-danger is-light">{{ error }}</div>
      <div v-if="success" class="notification is-success is-light">Job posted successfully!</div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '@/api'
import { toast } from 'bulma-toast'

const form = reactive({
  title: '',
  requirement: '',
  duty: '',
  salary: ''
})
const submitting = ref(false)
const error = ref('')
const success = ref(false)

const handleSubmit = async () => {
  submitting.value = true
  error.value = ''
  success.value = false
  try {
    await api.createJob(form)
    success.value = true
    toast({ message: 'Job created', type: 'is-success', duration: 2000 })
    form.title = ''
    form.requirement = ''
    form.duty = ''
    form.salary = ''
  } catch (err) {
    error.value = err.response?.data || 'Creation failed'
  } finally {
    submitting.value = false
  }
}
</script>