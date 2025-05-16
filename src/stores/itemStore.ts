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
  const priorityItems = ref<CompletedItem[]>([]) // items with priority


  // 🔹 Getters
  const comboCount = computed(() => completedItems.value.length)

  const remainingItems = computed(() => {
    // start with all board items
    const rem = [...boardItems.value]
    // remove exactly one match per priority item
    priorityItems.value.forEach(p => {
      const idx = rem.findIndex(item => item.id === p.id)
      if (idx !== -1) rem.splice(idx, 1)
    })
    return rem
  })

  const boardItemComponents = computed(() => {
    return boardItems.value.map(item => item.component_1_id)
  })

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

  function addPriorityItem(item: CompletedItem) {
    // limit total priority items
    if (priorityItems.value.length >= 6) {
      alert('You can only have 6 priority items at a time')
      return
    }
    // ensure there's a remaining copy on the board
    if (!remainingItems.value.some(i => i.id === item.id)) {
      alert(`You cannot add more ${item.name} to priority if you don't have that many on the board.`)
      return
    }
    // add to priority
    priorityItems.value.push(item)
  }

  function removePriorityItem(item: CompletedItem) {
    const idx = priorityItems.value.findIndex(i => i.id === item.id)
    if (idx !== -1) {
      priorityItems.value.splice(idx, 1)
    }
  }

  return {
    selectedItems,
    completedItems,
    comboCount,
    boardItems,
    allCompletedItems,
    priorityItems,
    remainingItems,
    addPriorityItem,
    removePriorityItem,
    removeBoardItem,
    addBoardItem,
    addSelectedItem,
    removeSelectedItem,
    setItemCombos,
    removeSelectedItemById,
    addItemCombo
  }
})
