<template>
  <div id="app">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item has-text-weight-bold is-size-4">JobBoard</router-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/jobs" class="navbar-item">Jobs</router-link>
          </div>
          <div class="navbar-end">
            <template v-if="!isAuthenticated">
              <router-link to="/login" class="navbar-item">Login</router-link>
              <router-link to="/register" class="navbar-item">Register</router-link>
            </template>

            <template v-else>
              

              <div v-if="isCompany" class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  <figure class="image is-32x32" style="margin: 0;">
                    <img 
                      :src="user?.profile_image ? user.profile_image : '/default-avatar.png'" 
                      alt="Avatar"
                      style="border-radius: 50%; object-fit: cover; width: 100%; height: 100%;"
                    >
                  </figure>
                  <span>{{ user?.nickname || user?.username }}</span>
                </a>
                <div class="navbar-dropdown">
                  <router-link to="/create-job" class="navbar-item">Post Job</router-link>
                  <router-link to="/my-applications" class="navbar-item">Applications</router-link>
                </div>
              </div>
              
              <div v-else style="display: flex; align-items: center; gap: 6px;">
                  <figure class="image is-32x32" style="margin: 0;">
                    <img 
                      :src="user?.profile_image ? user.profile_image : '/default-avatar.png'" 
                      alt="Avatar"
                      style="border-radius: 50%; object-fit: cover; width: 100%; height: 100%;"
                    >
                  </figure>
                  <span>{{ user?.nickname || user?.username }}</span>
              </div>
              
              <a class="navbar-item" @click.prevent="handleLogout">Logout</a>
            </template>

          </div>
        </div>
      </div>
    </nav>
    <main class="section">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { toast } from 'bulma-toast'

const store = useStore()
const router = useRouter()
const user = computed(() => store.state.user)
const isAuthenticated = computed(() => store.state.isAuthenticated)
const isCompany = computed(() => store.getters.isCompany)

const handleLogout = async () => {
  await store.dispatch('logout')
  toast({ message: 'Logged out successfully', type: 'is-success', duration: 2000 })
  router.push('/')
}
</script>

<style scoped>
.navbar-item.is-active {
  font-weight: 600;
}
</style>