<script setup lang="ts">
import { useCompositionStore } from '@/stores/compositionStore'
import BoardGenerator from '../utils/BoardGenerator.vue'
import ItemSuggestionGenerator from '../utils/ItemSuggestionGenerator.vue'

const compositionStore = useCompositionStore()
</script>

<template>
  <div class="bg-secondary/30 border-primary border-1 p-4 rounded-lg shadow-lg">
    <h3 class="text-2xl mb-1 text-left">
      {{ compositionStore.cheatSheetWithItems.compData.name }}
    </h3>
    <p class="mb-6 text-left">
      {{ compositionStore.cheatSheetWithItems.compData.levelStrategy }}
    </p>

    <div class="w-full grid grid-cols-1 gap-2 mt-4">
      <div class="mx-auto">
        <div class="scale-110">
          <BoardGenerator :board="compositionStore.cheatSheetWithItems.board" />
        </div>
      </div>
    </div>
    <div class="mt-10"><ItemSuggestionGenerator /></div>
  </div>
</template>
