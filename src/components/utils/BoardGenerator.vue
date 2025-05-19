<script setup lang="ts">
import { computed } from 'vue'
import type { Field } from '@/stores/boardStore'
import { useItemStore } from '@/stores/itemStore'

// IF THE ITEMS ARE NOT LOADING MAKE SURE TO LOAD THE ITEM STORE AND THE BOARD STORE IN THE DAHSBOARD

const props = defineProps<{
  board: Field[]
}>()

// compute 4 rows of 7 cells each from the passed-in board
const rows = computed<Field[][]>(() =>
  Array.from({ length: 4 }, (_, row) => props.board.slice(row * 7, row * 7 + 7)),
)

const itemStore = useItemStore()
</script>

<template>
  <div class="flex flex-col gap-2 items-center pt-5">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="flex gap-2"
      :class="{ 'ml-8': rowIndex === 1 || rowIndex === 3 }"
    >
      <div v-for="field in row" :key="field.x" class="relative w-16">
        <!-- clipped hex background + champion -->
        <div
          class="hex bg-base-200 flex items-center justify-center text-sm font-bold border border-base-300"
        >
          <img
            v-if="field.champion"
            :src="`/assets/tft-champion/${field.champion.asset_path}.png`"
            :alt="`${field.champion.name} icon`"
            class="object-cover object-right h-full w-full"
          />
        </div>

        <!-- positioned outside of the clipped hex -->
        <div
          class="absolute bottom-[5px] left-0 w-16 h-4 grid grid-cols-3 pointer-events-none scale-110 z-10"
          v-if="field.champion && !field.champion.itemIds.every((id) => id === 999)"
        >
          <template v-for="slotIndex in 3" :key="slotIndex">
            <div class="bg-gray-800 border-primary border-1 w-full h-full rounded-md">
              <img
                v-if="
                  field.champion?.itemIds[slotIndex - 1] &&
                  field.champion?.itemIds[slotIndex - 1] !== 999
                "
                :src="
                  '/assets/item_images/' +
                  itemStore.allCompletedItems.find(
                    (i) => i.id === field.champion?.itemIds[slotIndex - 1],
                  )!.asset_route +
                  '.png'
                "
                alt="Item Image"
                class="w-full h-full object-cover rounded-xl"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hex {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  aspect-ratio: 1 / 1;
  overflow: hidden; /* optional, ensures champion image stays inside */
}
.ml-8 {
  margin-left: 2rem;
}
</style>
