import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useBoardStore } from './boardStore'
import { useItemStore } from './itemStore'
import type { CompData, CheatSheet } from '@/components/builder/BuilderMain.vue'
import type { Field } from '@/stores/boardStore'
import type { CompletedItem } from '@/stores/itemStore'


export interface CheatSheetWithItems {
  compData: CompData
  board: Field[]
  completedItems: CompletedItem[]
  priorityItems: CompletedItem[]
}


export const useCompositionStore = defineStore('compositionStore', () => {
  // 🔹 State

  const compData = ref<CompData>({
    name: '',
    levelStrategy: '',
  })
  const boardStore = useBoardStore()
  const itemStore = useItemStore()
  const cheatSheet = computed<CheatSheet>(() => ({
    compData: compData.value,
    board: boardStore.board
  }))

  const cheatSheetWithItems = computed<CheatSheetWithItems>(() => ({
    compData: compData.value,
    board: boardStore.board,
    completedItems: itemStore.boardItems,
    priorityItems: itemStore.priorityItems,

  }))

  function setCompData(newCompData: CompData) {
    compData.value = newCompData
    console.log('Composition data updated:', compData.value)
  }

  return {
    cheatSheet,
    compData,
    cheatSheetWithItems,
    setCompData
  }
})

