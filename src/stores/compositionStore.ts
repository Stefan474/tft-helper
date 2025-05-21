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

  const allSavedSheets = ref<CheatSheetWithItems[]>([])

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

  const savedFullSheet = ref<CheatSheetWithItems>({
    compData: {
      name: '',
      levelStrategy: '',
    },
    board: [],
    completedItems: [],
    priorityItems: [],
  })

  function setFullSheet(data: CheatSheetWithItems) {
    savedFullSheet.value.compData = data.compData
    savedFullSheet.value.board = data.board
    savedFullSheet.value.completedItems = data.completedItems
    savedFullSheet.value.priorityItems = data.priorityItems
    itemStore.boardItems = data.completedItems
    itemStore.priorityItems = data.priorityItems
  }

  //handling local storage

  function saveToLocalStorage() {
    const existing = JSON.parse(localStorage.getItem('savedSheets') || '[]')
    existing.push(savedFullSheet.value)

    localStorage.setItem('savedSheets', JSON.stringify(existing))

    allSavedSheets.value = existing

    console.log('Saved to local storage:', allSavedSheets)
  }

  function loadFromLocalStorage() {
    try {
      const existing = JSON.parse(localStorage.getItem('savedSheets') || '[]')
      allSavedSheets.value = existing
      console.log('Loaded from local storage:', allSavedSheets)
    } catch (e) {
      console.error('Failed to load from localStorage:', e)
      allSavedSheets.value = []
    }
  }

  function saveAndAddToLocalStorage(savedSheet: CheatSheetWithItems) {
    setFullSheet(savedSheet)
    saveToLocalStorage()
  }

  function deleteSheet(sheetToRemove: CheatSheetWithItems) {
    allSavedSheets.value = allSavedSheets.value.filter(
      sheet => sheet !== sheetToRemove
    )

    localStorage.setItem(
      'savedSheets',
      JSON.stringify(allSavedSheets.value)
    )
  }


  return {
    cheatSheet,
    compData,
    cheatSheetWithItems,
    savedFullSheet,
    allSavedSheets,
    deleteSheet,
    saveAndAddToLocalStorage,
    loadFromLocalStorage,
    saveToLocalStorage,
    setFullSheet,
    setCompData
  }
})

