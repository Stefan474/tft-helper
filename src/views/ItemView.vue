<script setup lang="ts">
import CompletedItems from '@/components/items/CompletedItems.vue'
import ComponentMixer from '@/components/items/ComponentMixer.vue'
</script>

<template>
  <div class="item-view flex flex-wrap justify-center">
    <div
      class="flex flex-wrap justify-center w-full max-w-4xl h-fit min-h-120 mt-5 border-2 border-base-200 rounded-xl backdrop-blur-2xl p-4"
    >
      <ComponentMixer :showSelectedItems="true" :showCompletedItems="true" />

      <CompletedItems />
    </div>
  </div>
</template>
