import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Item {
  id: number
  component: string
  stat_type: string
  asset_route: string
}

export const useItemStore = defineStore('itemStore', () => {
  // 🔹 State
  const selectedItems = ref<Item[]>([])
  const itemCombos = ref<Item[][]>([]) // or a custom type if combos have structure

  // 🔹 Getters
  const comboCount = computed(() => itemCombos.value.length)

  // 🔹 Actions
  function addSelectedItem(item: Item) {
    selectedItems.value.push(item)
  }

  function removeSelectedItem(index: number) {
    selectedItems.value.splice(index, 1)
  }

  function setItemCombos(combos: Item[][]) {
    itemCombos.value = combos
  }

  return {
    selectedItems,
    itemCombos,
    comboCount,
    addSelectedItem,
    removeSelectedItem,
    setItemCombos,
  }
})
