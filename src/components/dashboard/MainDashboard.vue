<script setup lang="ts">
import { useCompositionStore } from '@/stores/compositionStore'

import BoardGenerator from '../utils/BoardGenerator.vue'
import ItemSuggestionGenerator from '../utils/ItemSuggestionGenerator.vue'
import { onMounted, ref } from 'vue'
import { useItemStore } from '@/stores/itemStore'
import type { CheatSheetWithItems } from '@/stores/compositionStore'
import LevelingTablePicker from '../utils/LevelingTablePicker.vue'
import router from '@/router'

const compositionStore = useCompositionStore()
const itemStore = useItemStore()
const activeSheet = ref<CheatSheetWithItems>()
const showPicker = ref(false)
const guideMode = ref(false)
const togglePicker = () => (showPicker.value = !showPicker.value)

onMounted(() => {
  compositionStore.loadFromLocalStorage()

  const first = compositionStore.allSavedSheets[0]
  if (!first) return

  compositionStore.setFullSheet(first)
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

function deleteSheet(sheet: CheatSheetWithItems) {
  compositionStore.deleteSheet(sheet)
}

const makeNewComp = () => {
  router.push('/create')
}
</script>

<template>
  <div class="w-full bg-base-100 px-4 sm:px-8 lg:px-32 py-4" v-if="activeSheet">
    <!-- responsive grid -->
    <div
      class="grid gap-4 sm:gap-6 lg:gap-8"
      :class="{
        'grid-cols-1': true /* mobile  */,
        'lg:grid-cols-12': true /* ≥640px  */,
      }"
    >
      <!-- ─── Board / items card ─────────────────────────────── -->
      <div class="flex justify-center col-span-12 xl:col-span-7 2xl:col-span-6 2xl:col-start-2">
        <div
          class="bg-base-300 p-4 sm:p-6 2xl:p-8 flex flex-col w-full rounded-xl"
          :class="{ 'h-fit': guideMode }"
        >
          <div class="flex align-middle justify-center">
            <h3 class="text-2xl font-semibold mb-4 capitalize truncate flex-grow">
              {{ activeSheet?.compData.name }}
            </h3>
            <button class="btn btn-primary" @click="togglePicker">Pick a different comp</button>
          </div>
          <div class="flex flex-col bg-base-200 p-4 sm:p-6 flex-grow justify-center gap-4">
            <BoardGenerator v-if="activeSheet" :board="activeSheet.board" />
            <ItemSuggestionGenerator />
          </div>
        </div>
      </div>

      <!-- ─── Leveling table ──────────────────────────────────── -->
      <div v-if="activeSheet" class="col-span-12 sm:col-span-12 lg:col-span-12 xl:col-span-4">
        <div class="bg-base-300 p-4 sm:p-6 lg:p-8 h-full rounded-xl">
          <div class="flex">
            <h3 class="text-2xl mb-1 font-semibold flex-grow">Leveling Strategy</h3>
            <div class="flex align-bottom gap-2 flex-row-reverse mt-auto relative">
              <input type="checkbox" class="toggle" v-model="guideMode" />
              <div class="text-sm">Guide mode</div>
            </div>
          </div>
          <div class="badge badge-primary mb-2">{{ activeSheet.compData.levelStrategy }}</div>

          <LevelingTablePicker
            :table="activeSheet.compData.levelStrategy"
            :hide-description="!guideMode"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- ▸ COMP-PICKER POPUP ◂ -->
  <div
    v-if="showPicker"
    class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
    @click.self="showPicker = false"
  >
    <div
      class="fixed bottom-0 sm:bottom-auto sm:absolute sm:right-8 sm:top-16 w-full sm:w-96 lg:w-[28rem] bg-base-300 rounded-t-2xl sm:rounded-lg p-4 sm:p-6 overflow-y-auto max-h-[85vh] sm:max-h-[70vh] z-50"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">Pick a comp</h3>
      </div>

      <div class="space-y-2">
        <div
          v-for="sheet in compositionStore.allSavedSheets"
          :key="sheet.compData.name"
          class="bg-base-200 p-3 rounded hover:bg-base-100 cursor-pointer transition flex"
        >
          <div class="flex-grow h-full" @click="(setCurrentSheet(sheet), (showPicker = false))">
            {{ sheet.compData.name }}
          </div>
          <div
            class="bg-red-500 rounded-lg px-3"
            @click="(deleteSheet(sheet), (showPicker = true))"
          >
            X
          </div>
        </div>

        <button class="btn btn-secondary w-full mt-4" @click="makeNewComp">Make a new comp</button>
      </div>
    </div>
  </div>
  <div class="flex justify-center items-center w-full h-120" v-if="!activeSheet">
    <div class="bg-base-300 p-6 sm:p-8 rounded-xl flex flex-col items-center gap-4">
      <h3 class="text-2xl font-semibold">No comp selected</h3>
      <p class="text-md text-center">You need to create a comp first.</p>
      <button class="btn btn-secondary" @click="makeNewComp">Make a new comp</button>
    </div>
  </div>
</template>
