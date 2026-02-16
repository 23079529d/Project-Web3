<template>
  <div class="box" style="max-width: 400px; margin: 0 auto;">
    <h2 class="title is-4">Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" v-model="username" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" v-model="password" required />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit" :class="{ 'is-loading': loading }">Login</button>
        </div>
      </div>
      <div v-if="error" class="notification is-danger is-light">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { toast } from 'bulma-toast'

const store = useStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await store.dispatch('login', { username: username.value, password: password.value })
    toast({ message: 'Logged in successfully', type: 'is-success', duration: 2000 })
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.non_field_errors?.[0] || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>