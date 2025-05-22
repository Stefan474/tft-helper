<template>
  <Analytics />
  <NavBar />
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { Analytics } from '@vercel/analytics/vue'
</script>
