<template>
  <div class="app flex-col justify-center">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
