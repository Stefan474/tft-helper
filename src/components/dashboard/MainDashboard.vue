<script setup lang="ts">
import { useCompositionStore } from '@/stores/compositionStore'

import BoardGenerator from '../utils/BoardGenerator.vue'
import ItemSuggestionGenerator from '../utils/ItemSuggestionGenerator.vue'
import { onMounted, ref } from 'vue'
import { useItemStore } from '@/stores/itemStore'
import type { CheatSheetWithItems } from '@/stores/compositionStore'
import LevelingTablePicker from '../utils/LevelingTablePicker.vue'

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

//changes the dashboard info to display
function setCurrentSheet(sheet: CheatSheetWithItems) {
  compositionStore.setFullSheet(sheet)
  activeSheet.value = sheet
}
</script>

<template>
  <div class="p-4 w-full bg-base-100 px-32">
    <div class="grid grid-cols-12 gap-4 w-full">
      <div class="col-span-1"></div>
      <div class="col-span-5 flex justify-center h-fit justify-self-end">
        <div class="bg-base-300 p-4">
          <h3 class="text-2xl font-semibold mb-2">{{ activeSheet?.compData.name }}</h3>

          <div class="inline-block transform origin-top bg-base-200 p-4">
            <div v-if="activeSheet">
              <BoardGenerator :board="activeSheet.board" />
            </div>

            <ItemSuggestionGenerator />
          </div>
          <div class="w-full flex mt-4">
            <button class="btn btn-secondary">Download as image</button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 col-span-3">
        <div v-if="activeSheet" class="bg-base-300 p-4">
          <h3 class="text-2xl mb-2 font-semibold">Board</h3>
          <LevelingTablePicker
            :table="activeSheet.compData.levelStrategy"
            :hide-description="true"
          />
        </div>
        <div class="bg-base-100">
          <div class="text-x p-2 ml-4 mt-4 overflow-y-scroll">
            <h3 class="text-xl mb-2">Pick a comp</h3>
            <div class="bg-base-300 p-2 pb-4">
              <div
                class="bg-base-200 p-2 mt-2"
                v-for="sheet in compositionStore.allSavedSheets"
                :key="sheet.compData.name"
                @click="setCurrentSheet(sheet)"
              >
                {{ sheet.compData.name }}
              </div>
              <button class="btn btn-primary mt-4">Download Image</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
