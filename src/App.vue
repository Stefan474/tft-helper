<template>
  <NavBar />
  <div class="app lg:px-32">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
