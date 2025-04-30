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

  // 🔹 Getters
  const comboCount = computed(() => completedItems.value.length)

  // 🔹 Actions
  function addSelectedItem(item: Item) {
    selectedItems.value.push(item)
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
    completedItems.value.push(combo)
  }

  return {
    selectedItems,
    completedItems,
    comboCount,
    addSelectedItem,
    removeSelectedItem,
    setItemCombos,
    removeSelectedItemById,
    addItemCombo
  }
})
