<template>
  <div class="box has-text-centered">
    <h1 class="title">Welcome to JobBoard</h1>
    <p class="subtitle" v-if="!isAuthenticated">Please login or register to continue.</p>
    <p class="subtitle" v-else>Browse jobs or post a new one!</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isAuthenticated = computed(() => store.state.isAuthenticated)
</script>