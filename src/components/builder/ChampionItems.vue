<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useBoardStore } from '@/stores/boardStore'
import { supabase } from '@/supabase'
import type { Field } from '@/stores/boardStore'
import { useItemStore, type Item } from '@/stores/itemStore'

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

const itemStore = useItemStore()

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
  else if (data) {
    itemData.value = data as CompletedItem[]
    loading.value = false
    itemStore.allCompletedItems = data as CompletedItem[]
  }
})
onMounted(async () => {
  const { data, error } = await supabase.from('component_list').select('*')
  if (error) console.error('Supabase error:', error)
  else if (data) {
    itemStore.allComponents = data as Item[]
  }
})

const itemsData = computed(() => {
  const paths: Record<number, string> = {}
  const counts: Record<number, number> = {}

  itemData.value.forEach((item) => {
    // Store the asset path
    paths[item.id] = item.asset_route

    // Count occurrences
    counts[item.id] = (counts[item.id] || 0) + 1
  })

  return {
    paths, // Access path by ID
    counts, // See quantity of each item
    getPath: (id: number) => paths[id],
    getCount: (id: number) => counts[id] || 0,
  }
})

const draggedItem = ref<CompletedItem | null>(null)

function onDragStart(item: CompletedItem, event: DragEvent) {
  if (!event.dataTransfer) return
  console.log('Drag started:', item.name)
  draggedItem.value = item
}

function onDrop(event: DragEvent, field: Field, index: number) {
  event.preventDefault()
  console.log('Drop event:', boardData.value[field.x].champion!)
  if (!field.champion || !field.champion.itemIds) return
  //this check always goes through
  if (draggedItem.value) {
    field.champion.itemIds[index] = draggedItem.value.id
    itemStore.addBoardItem(draggedItem.value.id)
    console.log(`Dropped item: ${draggedItem.value.name} in slot ${index}`)
  }

  // Reset the dragged item after drop
  draggedItem.value = null
}
function removeChampionItem(field: Field, index: number) {
  const id = field.champion?.itemIds[index]
  if (id == null || id === 999) return

  // if there's no remaining copy, it's still in priority
  const existsInRemaining = itemStore.remainingItems.some((item) => item.id === id)
  if (!existsInRemaining) {
    alert(
      'You cannot remove a priority item, please remove the item from your priority item list first',
    )
    return
  }

  itemStore.removeBoardItem(id)
  field.champion!.itemIds[index] = 999
}

const emitTabTracker = defineEmits(['change-tab'])
function nextStep() {
  emitTabTracker('change-tab', 4)
}
</script>

<template>
  <h2 class="text-2xl mb-2">Champion Items</h2>
  <p class="mb-6 text-center">
    Put the ideal items onto your carries and champions you want to prioritize during the game.
    <br />
    <span class="text-warning">Double click an item to remove it.</span>
  </p>

  <div class="flex">
    <ul class="lg:w-1/2 flex flex-wrap justify-start h-fit gap-12">
      <li v-for="field in boardData.filter((f) => f.champion)" :key="field.x">
        <div class="relative">
          <div
            v-if="field.champion"
            class="hex w-full h-full absolute top-0"
            :class="{
              'bg-gray-500': field.champion.cost === 1,
              'bg-green-600': field.champion.cost === 2,
              'bg-blue-500': field.champion.cost === 3,
              'bg-purple-500': field.champion.cost === 4,
              'bg-orange-400': field.champion.cost === 5,
            }"
          ></div>

          <img
            :src="'/assets/tft-champion/' + field.champion!.asset_path + '.png'"
            alt="Champion Image"
            class="hex w-24 h-24 object-cover object-right scale-95 origin-center"
            :class="{ 'brightness-80': field.champion!.stars }"
          />
          <img
            v-if="field.champion && field.champion.stars"
            src="/assets/ux_images/3-star-asset_2.png"
            class="absolute -top-2 left-6.5 origin-center w-11"
          />
          <div class="w-24 h-8 absolute bottom-[-10px] left-0 grid grid-cols-3 gap-1">
            <!-- Slot 1 -->
            <div
              class="bg-gray-800 border-primary border-2 w-8 h-full"
              @dragover.prevent
              @drop="(e) => onDrop(e, field, 0)"
              @dblclick="removeChampionItem(field, 0)"
            >
              <img
                v-if="field.champion?.itemIds[0] && field.champion?.itemIds[0] !== 999"
                :src="
                  '/assets/item_images/' + itemsData.getPath(field.champion.itemIds[0]) + '.png'
                "
                alt="Item Image"
                class="w-full h-full object-cover rounded-xl"
              />
            </div>

            <!-- Slot 2 -->
            <div
              class="bg-gray-800 border-primary border-2 w-8 h-full"
              @dragover.prevent
              @drop="(e) => onDrop(e, field, 1)"
              @dblclick="removeChampionItem(field, 1)"
            >
              <img
                v-if="field.champion?.itemIds[1] && field.champion?.itemIds[1] !== 999"
                :src="
                  '/assets/item_images/' + itemsData.getPath(field.champion.itemIds[1]) + '.png'
                "
                alt="Item Image"
                class="w-full h-full object-cover rounded-xl"
              />
            </div>

            <!-- Slot 3 -->
            <div
              class="bg-gray-800 border-primary border-2 w-8 h-full"
              @dragover.prevent
              @drop="(e) => onDrop(e, field, 2)"
              @dblclick="removeChampionItem(field, 2)"
            >
              <img
                v-if="field.champion?.itemIds[2] && field.champion?.itemIds[2] !== 999"
                :src="
                  '/assets/item_images/' + itemsData.getPath(field.champion.itemIds[2]) + '.png'
                "
                alt="Item Image"
                class="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div
      class="mx-auto bg-base-300 p-3 rounded-xl border-2 border-primary min-h-[calc(44px*11+10px*8+84px)]"
    >
      <label class="floating-label mt-2">
        <span>Search</span>
        <input
          type="text"
          placeholder="Search Items by name"
          class="input input-sm mb-2"
          v-model="itemFilter"
        />
      </label>

      <ul class="grid grid-cols-5 gap-2">
        <li
          v-for="item in filteredItems"
          :key="item.id"
          draggable="true"
          @dragstart="(e) => onDragStart(item, e)"
        >
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

  <button class="btn btn-primary mt-4" @click="nextStep()">Next</button>
</template>
