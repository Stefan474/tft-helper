<script setup lang="ts">
import { onMounted, ref, inject, watch, computed } from 'vue'
import { useBoardStore } from '@/stores/boardStore'
import { supabase } from '@/supabase'
import type { Field } from '@/stores/boardStore'

interface CompletedItem {
  id: number
  name: string
  component_1_id: number
  component_2_id: number
  stats: Record<string, string>
  asset_route: string
  item_description: string
}

const boardStore = useBoardStore()
const loading = ref(true) // track loading state
const itemData = ref<CompletedItem[]>([])
const boardData = ref<Field[]>([])
const itemFilter = ref('')

const tabTracker = inject('tabTracker', ref(3))

const filteredItems = computed(() =>
  itemData.value.filter((item) =>
    item.name.toLowerCase().includes(itemFilter.value.toLowerCase().trim()),
  ),
)

watch(
  () => boardStore.board,
  (newBoard) => {
    boardData.value = newBoard
  },
  { immediate: true, deep: true },
)
onMounted(async () => {
  const { data, error } = await supabase.from('completed_items').select('*')
  if (error) console.error('Supabase error:', error)
  else if (data) itemData.value = data as CompletedItem[]
  loading.value = false // done loading
})
</script>

<template>
  <h2 class="text-2xl mb-2">Champion Items</h2>
  <p class="mb-6 text-center">
    Put the ideal items onto your carries and champions you want to prioritize during the game.
    <br />
    This will calculate the components you need to prioritize.
  </p>

  <div class="flex">
    <ul class="lg:w-1/2 flex flex-wrap justify-start h-fit gap-3">
      <li v-for="field in boardData.filter((f) => f.champion)" :key="field.x">
        <div>
          <img
            :src="'/assets/tft-champion/' + field.champion!.asset_path + '.png'"
            alt="Champion Image"
            class="hex w-22 h-22 object-cover object-right"
          />
        </div>
      </li>
    </ul>
    <div class="mx-auto bg-base-300 p-3 rounded-xl border-2 border-primary">
      <label class="floating-label mt-4">
        <span>Search</span>
        <input
          type="text"
          placeholder="Search Items by name"
          class="input input-sm mb-2"
          v-model="itemFilter"
        />
      </label>
      <ul class="w-[44*5px+4*8px] grid grid-cols-5 gap-2">
        <li v-for="item in filteredItems" :key="item.id">
          <img
            v-if="item.asset_route"
            :src="'/assets/item_images/' + item.asset_route + '.png'"
            :alt="item.name + ' item icon'"
            class="w-11 rounded-xl border-2 border-base-200"
          />
        </li>
      </ul>
    </div>
  </div>
  <button class="btn" @click="() => console.log(boardData)">Get Board</button>
</template>
