<script setup lang="ts">
import { useCompositionStore } from '@/stores/compositionStore'
import BoardGenerator from '../utils/BoardGenerator.vue'

const compositionStore = useCompositionStore()
</script>

<template>
  <h3 class="text-2xl my-4 mb-6 text-left">
    {{ compositionStore.cheatSheetWithItems.compData.name }}
  </h3>

  <div class="w-full grid grid-cols-1 gap-2 mt-4">
    <div class="scale-120 mx-auto">
      <BoardGenerator :board="compositionStore.cheatSheetWithItems.board" />
    </div>
  </div>
</template>
