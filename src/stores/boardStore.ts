// src/stores/boardStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Champion {
  id: number
  name: string
  trait1: string
  trait2: string
  trait3: string
  asset_path: string
  stars?: boolean,
  itemIds: [number?, number?, number?]
}

export interface Field {
  x: number
  something: string
  champion?: Champion | null | undefined
}

export const useBoardStore = defineStore('board', () => {
  // State
  const board = ref<Field[]>(
    Array.from({ length: 28 }, (_, i) => ({
      x: i,
      something: `${i + 1}`,
      champion: null,
    }))
  )


  // Actions
  function setBoard(newBoard: Field[]) {
    board.value = newBoard
    console.log('Board updated:', board.value)
    for (const field of board.value) {
      if (field.champion) {
        if (!field.champion.itemIds) {
          field.champion.itemIds = [999, 999, 999]
        }
      }
    }
  }

  function addItemToChampion(x: number, item: number) {
    const fieldIndex = board.value.findIndex(field => field.x === x)
    if (fieldIndex !== -1 && board.value[fieldIndex].champion) {
      const champion = board.value[fieldIndex].champion
      if (!champion.itemIds) {
        champion.itemIds = [item]

      } else if (champion.itemIds.length < 3) {
        champion.itemIds.push(item)

      } else {
        console.error('Champion already has 3 items')
        return
      }
    } else {
      console.error('Field not found or no champion in this field')
      return
    }

  }

  function updateField(x: number, updates: Partial<Field>) {
    const fieldIndex = board.value.findIndex(field => field.x === x)
    if (fieldIndex !== -1) {
      board.value[fieldIndex] = { ...board.value[fieldIndex], ...updates }
    }
  }

  function resetBoard() {
    board.value = Array.from({ length: 28 }, (_, i) => ({
      x: i,
      something: `${i + 1}`,
      champion: null,
    }))
  }

  // Keep original functions for convenience in case of refactoring
  function addChampion(x: number, champion: Champion) {
    updateField(x, { champion })
  }

  function removeChampion(x: number) {
    updateField(x, { champion: null })
  }

  return {
    board,
    setBoard,
    updateField,
    addChampion,
    removeChampion,
    resetBoard,
    addItemToChampion
  }
})
