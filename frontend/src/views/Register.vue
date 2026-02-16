<template>
  <div class="box" style="max-width: 500px; margin: 0 auto;">
    <h2 class="title is-4">Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Username (login ID)</label>
        <div class="control">
          <input class="input" type="text" v-model="form.username" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Nickname</label>
        <div class="control">
          <input class="input" type="text" v-model="form.nickname" />
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" v-model="form.email" required />
        </div>
      </div>
      <div class="field">
        <label class="label">User Type</label>
        <div class="control">
          <div class="select">
            <select v-model="form.user_type">
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Profile Image</label>
        <div class="file has-name">
          <label class="file-label">
            <input class="file-input" type="file" @change="onFileChange" accept="image/*" />
            <span class="file-cta">
              <span class="file-icon">📁</span>
              <span class="file-label">Choose file</span>
            </span>
            <span class="file-name">{{ fileName || 'No file selected' }}</span>
          </label>
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" v-model="form.password" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm Password</label>
        <div class="control">
          <input class="input" type="password" v-model="form.password2" required />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit" :class="{ 'is-loading': loading }">Register</button>
        </div>
      </div>
      <div v-if="error" class="notification is-danger is-light">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { toast } from 'bulma-toast'

const store = useStore()
const router = useRouter()
const form = reactive({
  username: '',
  nickname: '',
  email: '',
  user_type: 'individual',
  profile_image: null,
  password: '',
  password2: ''
})
const fileName = ref('')
const loading = ref(false)
const error = ref('')

const onFileChange = (e) => {
  const file = e.target.files[0]
  form.profile_image = file
  fileName.value = file ? file.name : ''
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  const formData = new FormData()
  Object.keys(form).forEach(key => {
    if (form[key] !== null) formData.append(key, form[key])
  })
  try {
    await store.dispatch('register', formData)
    toast({ message: 'Registration successful', type: 'is-success', duration: 2000 })
    router.push('/')
  } catch (err) {
    error.value = err.response?.data || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>