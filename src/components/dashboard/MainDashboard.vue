<script setup lang="ts">
import { useCompositionStore } from '@/stores/compositionStore'

import BoardGenerator from '../utils/BoardGenerator.vue'
import Fast8Table from '../leveling-tables/Fast8Table.vue'
import ItemSuggestionGenerator from '../utils/ItemSuggestionGenerator.vue'
import { onMounted, ref } from 'vue'
import { useItemStore } from '@/stores/itemStore'
import type { CheatSheetWithItems } from '@/stores/compositionStore'

const compositionStore = useCompositionStore()
const itemStore = useItemStore()
const activeSheet = ref<CheatSheetWithItems>()

onMounted(() => {
  compositionStore.loadFromLocalStorage()
  compositionStore.setFullSheet(compositionStore.allSavedSheets[0])
  activeSheet.value = compositionStore.savedFullSheet
  if (activeSheet.value) {
    itemStore.setSheetItems(activeSheet.value.completedItems, activeSheet.value.priorityItems)
    console.log('activeSheet', activeSheet)
  }
})

function testFunction(sheet: CheatSheetWithItems) {
  compositionStore.setFullSheet(sheet)
  console.log('hello', sheet)
  activeSheet.value = sheet
}
</script>

<template>
  <div class="p-4 w-full bg-base-100 px-32">
    <div class="grid grid-cols-12 gap-4 w-full">
      <div class="col-span-6 bg-accent p-4 pt-2 flex justify-center">
        <div class="inline-block transform origin-top">
          <div v-if="activeSheet">
            <BoardGenerator :board="activeSheet.board" />
          </div>

          <ItemSuggestionGenerator />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 col-span-4">
        <div class="bg-base-100">
          <div class="text-x p-2 ml-4 mt-4 overflow-y-scroll">
            <h3 class="text-xl mb-2">Pick a comp</h3>
            <div class="bg-base-300 p-2 pb-4">
              <div
                class="bg-base-200 p-2 mt-2"
                v-for="sheet in compositionStore.allSavedSheets"
                :key="sheet.compData.name"
                @click="testFunction(sheet)"
              >
                {{ sheet.compData.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-green-200">
          <Fast8Table :show-description="true" />
        </div>
      </div>
    </div>
  </div>
</template>
