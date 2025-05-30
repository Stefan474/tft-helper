<script setup lang="ts">
import CompletedItems from '@/components/items/CompletedItems.vue'
import ComponentMixer from '@/components/items/ComponentMixer.vue'
import LevelTable from '@/components/LevelTable.vue'
</script>

<template>
  <div class="grid grid-cols-1 px-32 py-4 gap-4 2xl:grid-cols-2">
    <div class="item-view flex flex-wrap justify-center">
      <div
        class="flex flex-wrap justify-center w-full max-w-4xl h-fit min-h-120 mt-2 border-40 border-x-12 border-b-12 border-base-300 border-t-0 bg-base-100 rounded-lg backdrop-blur-2xl p-4 pt-0 px-0"
      >
        <h3 class="text-xl mb-2 font-bold w-full text-center bg-base-300 pb-4 pt-2">Item Mixer</h3>

        <ComponentMixer :showSelectedItems="true" :showCompletedItems="true" />
        <CompletedItems />
      </div>
    </div>
    <div class="pt-2 max-w-4xl flex justify-center ml-8">
      <LevelTable />
    </div>
  </div>
</template>
