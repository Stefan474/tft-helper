<script setup lang="ts">
import StandardTable from './leveling-tables/StandardTable.vue'
import { ref } from 'vue'
const isDescriptionVisible = ref(false)
</script>

<template>
  <div class="bg-base-300 p-2 rounded-md">
    <div class="w-full flex justify-start mt-2">
      <div class="flex justify-center gap-2 align-middle">
        <input type="checkbox" class="toggle" v-model="isDescriptionVisible" />
        <p class="opacity-60 text-xs">hide details</p>
      </div>
    </div>
    <div class="tabs tabs-border h-fit">
      <input type="radio" name="my_tabs_2" class="tab" aria-label="Standard" checked="checked" />
      <div class="tab-content tab-content-custom">
        <StandardTable :showDescription="isDescriptionVisible" />
      </div>

      <input type="radio" name="my_tabs_2" class="tab" aria-label="Fast 8" />
      <div class="tab-content tab-content-custom"></div>

      <input type="radio" name="my_tabs_2" class="tab" aria-label="Fast 9" />
      <div class="tab-content tab-content-custom"></div>

      <input type="radio" name="my_tabs_2" class="tab" aria-label="1-cost reroll" />
      <div class="tab-content tab-content-custom"></div>

      <input type="radio" name="my_tabs_2" class="tab" aria-label="2-cost reroll" />
      <div class="tab-content tab-content-custom"></div>

      <input type="radio" name="my_tabs_2" class="tab" aria-label="3-cost reroll" />
      <div class="tab-content tab-content-custom"></div>
    </div>
  </div>
</template>
