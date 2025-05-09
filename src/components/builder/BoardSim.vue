<script setup lang="ts">
import { ref } from 'vue'
import { computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

const champFilter = ref('')

interface Champion {
  id: number
  name: string
  trait1: string
  trait2: string
  trait3: string
  asset_path: string
}
interface Field {
  x: number
  something: string
  champion?: Champion
}

const championList = ref<Champion[]>([])
const loading = ref(true) // track loading state

const fieldTracker = ref(0)

//drag and drop functionality
const draggedChampion = ref<Champion>()

function onDragStart(Champion: Champion) {
  draggedChampion.value = Champion
  console.log(draggedChampion.value)
}

function onDragStartField(field: Field) {
  draggedChampion.value = field.champion
  fieldTracker.value = field.x
}

function onDragEnter(x: number) {
  const field = board.value.find((field) => field.x === x)
  if (field) {
  }
}

function onDrop(x: number) {
  console.log('hello i am dropping')
  const field = board.value.find((field) => field.x === x)
  if (field) {
    field.champion = draggedChampion.value
    draggedChampion.value = undefined
    board.value[fieldTracker.value].champion = undefined
    console.log(board.value[fieldTracker.value].champion)
  }
}

const board = ref<Field[]>(
  Array.from({ length: 28 }, (_, i) => ({
    x: i,
    something: `${i + 1}`,
  })),
)

// fetch champion data from supabase
onMounted(async () => {
  const { data, error } = await supabase.from('champion_list').select('*')

  if (error) {
    console.error('Supabase error:', error)
  } else if (data) {
    championList.value = data as Champion[]
  }

  loading.value = false // Done loading
})

// Group fields into rows of 7
const rows = computed(() =>
  Array.from({ length: 4 }, (_, rowIndex) => board.value.slice(rowIndex * 7, rowIndex * 7 + 7)),
)

// filter champions by search input
const filteredChampions = computed(() => {
  const filter = champFilter.value.toLowerCase().trim()
  if (!filter) return championList.value

  return championList.value.filter((champion) =>
    [champion.name, champion.trait1, champion.trait2, champion.trait3].some((field) =>
      field?.toLowerCase().includes(filter),
    ),
  )
})
</script>

<template>
  <div class="flex flex-col gap-2 items-center pt-5">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="flex gap-2"
      :class="{
        'ml-8': rowIndex === 1 || rowIndex === 3, // offset rows 2 and 4
      }"
    >
      <div
        v-for="field in row"
        :key="field.x"
        class="hex w-16 bg-base-200 flex items-center justify-center text-sm font-bold border border-base-300"
        draggable="true"
        @dragover.prevent
        @drop="onDrop(field.x)"
        @dragenter="onDragEnter(field.x)"
        @dragstart="onDragStartField(field)"
      >
        <img
          v-if="field.champion"
          :src="'/assets/tft-champion/' + field.champion.asset_path + '.png'"
          :alt="field.champion.name + ' champion icon'"
          class="object-cover object-right h-full w-full"
        />
      </div>
    </div>
  </div>
  <!--Start of champion list-->
  <div v-if="loading" class="w-124 flex mt-2">
    <div class="flex justify-center py-8">
      <!-- conditional loading until data is fetched-->
      <span className="loading loading-bars loading-lg"></span>
    </div>
  </div>
  <div v-else>
    <label class="floating-label mt-7">
      <span>Search</span>
      <input
        type="text"
        placeholder="Search by name or trait"
        class="input input-md"
        v-model="champFilter"
      />
    </label>
    <div class="flex w-full max-w-4xl gap-1 flex-wrap justify-start mt-5">
      <ul v-for="champion in filteredChampions" :key="champion.id" class="flex gap-2 max-w-4xl">
        <li>
          <div
            class="w-15 rounded-xl border-2 border-base-200 h-15"
            draggable="true"
            @drag="onDragStart(champion)"
          >
            <img
              v-if="champion.asset_path"
              :src="'/assets/tft-champion/' + champion.asset_path + '.png'"
              :alt="champion.name + ' champion icon'"
              class="object-right object-cover h-full rounded-xl"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.hex {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  aspect-ratio: 1 / 1;
}
</style>
