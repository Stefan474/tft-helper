<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToCreate = () => {
  router.push('/create')
}
</script>

<template>
  <div>
    <div class="flex h-screen items-center justify-center sm:p-4 md:p-8 xl:p-32">
      <div class="grid xl:grid-cols-2 grid-cols-1 items-center gap-10 px-4 md:px-10 w-full">
        <div>
          <h1 class="mb-1 text-5xl font-semibold">
            <span class="font-bold text-accent">shhh,</span> Cheating in TFT is okay...
          </h1>
          <p class="mb-1 text-accent/50">(just don't tell riot)</p>
          <p class="mb-6 font-medium">
            Simplify how you think about TFT and focus on playing instead of juggling different
            guide sites.
          </p>
          <div class="flex justify-start gap-4">
            <button class="btn btn-secondary" @click="goToCreate">
              Make a cheat sheet
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
            <button class="btn btn-primary" @click="goToDashboard">
              Go to dashboard
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <img
            src="@/assets/promotional-hero-tft.png"
            alt=""
            class="xl:size-130 xl:w-max-140 2xl:size-140 size-100 rounded-full 3xl:size-200"
          />
        </div>
      </div>
    </div>
  </div>
</template>
