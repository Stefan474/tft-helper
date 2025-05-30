<script setup lang="ts">
import CompletedItems from '@/components/items/CompletedItems.vue'
import ComponentMixer from '@/components/items/ComponentMixer.vue'
import LevelTable from '@/components/LevelTable.vue'
</script>

<template>
  <div class="grid grid-cols-1 px-2 lg:px-32 py-4 gap-4 2xl:grid-cols-2">
    <div class="flex flex-wrap justify-center w-full">
      <div
        class="justify-center w-full mt-2 border-40 border-x-12 border-b-9 border-base-300 border-t-0 bg-base-100 rounded-lg backdrop-blur-2xl p-4 pt-0 px-0 box-border"
      >
        <h3 class="text-xl mb-2 font-bold w-full text-center bg-base-300 pb-4 pt-2">Item Mixer</h3>
        <div class="flex flex-col gap-2 mx-auto">
          <ComponentMixer :showSelectedItems="true" :showCompletedItems="true" />
          <CompletedItems />
        </div>
      </div>
    </div>
    <div class="pt-2 flex justify-center w-fit">
      <LevelTable />
    </div>
  </div>
</template>
