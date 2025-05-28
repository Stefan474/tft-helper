<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCompositionStore } from '@/stores/compositionStore'
import type { CheatSheetWithItems } from '@/stores/compositionStore'

const compositionStore = useCompositionStore()

const guideSheets = ref<CheatSheetWithItems[]>([])

onMounted(() => {
  compositionStore.loadFromLocalStorage()
  guideSheets.value = compositionStore.allSavedSheets

  const first = compositionStore.allSavedSheets[0]
  if (!first) return
})
</script>

<template>
  <div class="w-full bg-base-100 px-4 sm:px-8 lg:px-32 py-4">
    Hello
    <ul>
      <li v-for="sheet in guideSheets" :key="sheet.compData.name">
        {{ sheet.compData.name }}
      </li>
    </ul>
  </div>
</template>
