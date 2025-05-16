import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export interface Item {
  id: number
  component: string
  stat_type: string
  asset_route: string
}

interface CompletedItem {
  id: number
  name: string
  component_1_id: number
  component_2_id: number
  stats: Record<string, string>
  asset_route: string
  item_description: string
}

export const useItemStore = defineStore('itemStore', () => {
  // 🔹 State
  const selectedItems = ref<Item[]>([])
  const completedItems = ref<CompletedItem[]>([]) // built items
  const boardItems = ref<CompletedItem[]>([]) // items on the board
  const allCompletedItems = ref<CompletedItem[]>([]) // all items

  // 🔹 Getters
  const comboCount = computed(() => completedItems.value.length)

  // 🔹 Actions
  function addSelectedItem(item: Item) {
    if (selectedItems.value.length < 15)
      selectedItems.value.push(item)
    else alert('You can only select 15 items at a time')
  }

  function removeSelectedItem(index: number) {
    selectedItems.value.splice(index, 1)
  }

  function removeSelectedItemById(id: number) {
    const index = selectedItems.value.findIndex(item => item.id === id)
    if (index !== -1) selectedItems.value.splice(index, 1)
  }

  function setItemCombos(combos: CompletedItem[]) {
    completedItems.value = combos
  }

  function addItemCombo(combo: CompletedItem) {
    if (completedItems.value.length < 15)
      completedItems.value.push(combo)
    else alert('You can only build 15 items at a time')
  }

  function addBoardItem(id: number) {
    console.log('checking for item with id:', id)
    const item = allCompletedItems.value.find(item => item.id === id)
    if (item) {
      boardItems.value.push(item)
    }
  }

  function removeBoardItem(id: number) {
    const index = boardItems.value.findIndex(item => item.id === id)
    if (index !== -1) {
      boardItems.value.splice(index, 1)
      console.log('current board items:', boardItems.value)
    }
  }

  return {
    selectedItems,
    completedItems,
    comboCount,
    boardItems,
    allCompletedItems,
    removeBoardItem,
    addBoardItem,
    addSelectedItem,
    removeSelectedItem,
    setItemCombos,
    removeSelectedItemById,
    addItemCombo
  }
})
