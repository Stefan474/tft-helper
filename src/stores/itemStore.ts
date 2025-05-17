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
  const allComponents = ref<Item[]>([]) // all components

  // 🔹 Getters

  const boardComponents = computed(() => {
    return boardItems.value.flatMap(item => {
      // lookup each component by ID; may return undefined if missing
      const comp1 = allComponents.value.find(c => c.id === item.component_1_id)
      const comp2 = allComponents.value.find(c => c.id === item.component_2_id)
      return [comp1, comp2]
    })
      // filter out any not found
      .filter((c): c is Item => Boolean(c))
  })

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

  const priorityComponents = computed(() => {
    return priorityItems.value.flatMap(item => {
      // lookup each component by ID; may return undefined if missing
      const comp1 = allComponents.value.find(c => c.id === item.component_1_id)
      const comp2 = allComponents.value.find(c => c.id === item.component_2_id)
      return [comp1, comp2]
    })
      // filter out any not found
      .filter((c): c is Item => Boolean(c))
  })

  const remainingComponents = computed(() => {
    return remainingItems.value.flatMap(item => {
      // lookup each component by ID; may return undefined if missing
      const comp1 = allComponents.value.find(c => c.id === item.component_1_id)
      const comp2 = allComponents.value.find(c => c.id === item.component_2_id)
      return [comp1, comp2]
    })
      // filter out any not found
      .filter((c): c is Item => Boolean(c))
  })

  const componentCounts = computed(() => {
    const map: Record<number, { item: Item; count: number }> = {}

    boardComponents.value.forEach(item => {
      if (map[item.id]) {
        map[item.id].count++
      } else {
        map[item.id] = { item, count: 1 }
      }
    })

    // return as an array
    return Object.values(map)
  })

  const remainingComponentCounts = computed(() => {
    const map: Record<number, { item: Item; count: number }> = {}

    remainingComponents.value.forEach(item => {
      if (map[item.id]) {
        map[item.id].count++
      } else {
        map[item.id] = { item, count: 1 }
      }
    })

    // return as an array
    return Object.values(map)
  })

  const priorityComponentCounts = computed(() => {
    const map: Record<number, { item: Item; count: number }> = {}

    priorityComponents.value.forEach(item => {
      if (map[item.id]) {
        map[item.id].count++
      } else {
        map[item.id] = { item, count: 1 }
      }
    })

    // return as an array
    return Object.values(map)
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
    boardItems,
    allCompletedItems,
    priorityItems,
    remainingItems,
    allComponents,
    boardComponents,
    priorityComponents,
    remainingComponents,
    componentCounts,
    remainingComponentCounts,
    priorityComponentCounts,
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
