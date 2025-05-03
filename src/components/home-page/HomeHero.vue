<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="hero min-h-screen flex w-full items-center justify-center position-relative">
    <div class="hero-content w-full lg:w-1/2 h-full bg-base-300">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">TFT Helper</h1>
        <p class="py-6">
          Simplify how you think about TFT and focus on playing instead of juggling different guide
          sites.
        </p>
        <button class="btn btn-primary" @click="router.push('/create')">Make a comp</button>
        <button class="btn btn-success mx-2">Check example comps</button>
      </div>
    </div>
    <div class="w-1/2 bg-base-300 h-lvh lg:block hidden position-absolute right-0">
      <img
        src="@/assets/transparent-hero.png"
        alt="teamfight tactics cover image"
        class="w-full h-full object-right"
      />
    </div>
  </div>
</template>
