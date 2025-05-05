<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'
import { supabase } from '../../supabase'

//CHAMP SELECT STUFF

const champFilter = ref('')

interface Champion {
  id: number
  name: string
  trait1: string
  trait2: string
  trait3: string
  asset_path: string
}

const championList = ref<Champion[]>([])
const loading = ref(true) // track loading state

onMounted(async () => {
  const { data, error } = await supabase.from('champion_list').select('*')

  if (error) {
    console.error('Supabase error:', error)
  } else if (data) {
    championList.value = data as Champion[]
  }

  loading.value = false // Done loading
})

const filteredChampions = computed(() => {
  const filter = champFilter.value.toLowerCase().trim()
  if (!filter) return championList.value

  return championList.value.filter((champion) =>
    [champion.name, champion.trait1, champion.trait2, champion.trait3].some((field) =>
      field?.toLowerCase().includes(filter),
    ),
  )
})

function handleBoardDrop(event) {
  const { added } = event

  if (!added) return

  // Get the dropped champion and target index
  const { newIndex, element: champion } = added

  // Only update the champion property of the existing field
  if (newIndex >= 0 && newIndex < board.value.length) {
    board.value[newIndex].champion = champion

    // Remove the newly added item since we've assigned it to an existing field
    board.value = board.value.filter((field) => field.x < 28)
  }
}

//CHAMP SELECT END

interface Field {
  x: number
  something: string
  champion?: Champion
}

const board = ref<Field[]>(
  Array.from({ length: 28 }, (_, i) => ({
    x: i,
    something: `${i + 1}`,
  })),
)

// Group fields into rows of 7
const rows = computed(() =>
  Array.from({ length: 4 }, (_, rowIndex) => board.value.slice(rowIndex * 7, rowIndex * 7 + 7)),
)

function onStart(event: any) {
  // Add a class to the body during drag operations
  document.body.classList.add('dragging-champion')
}

// Add this function to handle the end of dragging
function onEnd(event: any) {
  // Remove the class when dragging ends
  document.body.classList.remove('dragging-champion')

  // If the item was dropped on the board, handle it
  if (event.to.classList.contains('board-container')) {
    const index = event.newIndex
    const champion = event.item.__draggable_context.element

    // Update the champion property on the correct field
    if (index >= 0 && index < board.value.length) {
      board.value[index].champion = champion
    }

    // Prevent the default behavior of adding a new item
    return false
  }
}
</script>

<template>
  <!-- Board draggable -->
  <draggable
    :list="board"
    class="flex flex-wrap gap-2 items-center pt-5 board-container"
    tag="ul"
    :group="{ name: 'champions', put: true }"
    item-key="x"
    @change="handleBoardDrop"
    :move="(event) => true"
  >
    <template #item="{ element }">
      <div
        class="hex w-16 bg-base-200 flex items-center justify-center text-sm font-bold border border-base-300 board-field"
        :class="{ 'has-champion': element.champion }"
      >
        <template v-if="element.champion">
          <img
            :src="'/assets/tft-champion/' + element.champion.asset_path + '.png'"
            :alt="element.champion.name + ' champion icon'"
            class="object-cover object-right h-full w-full"
          />
        </template>
        <template v-else>
          {{ element.something }}
        </template>
      </div>
    </template>
  </draggable>

  >
  <div v-if="loading" class="w-124 flex mt-2">
    <div class="flex justify-center py-8">
      <!--Loading until data is fetched-->
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
    <draggable
      :list="filteredChampions"
      tag="ul"
      class="flex w-full max-w-4xl gap-1 flex-wrap justify-start mt-5"
      :group="{ name: 'champions', pull: 'clone', put: false }"
      :clone="(Champion: Champion) => Champion"
      item-key="id"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{ element }">
        <li>
          <div class="w-15 rounded-xl border-2 border-base-200 h-15">
            <img
              v-if="element.asset_path"
              :src="'/assets/tft-champion/' + element.asset_path + '.png'"
              :alt="element.name + ' champion icon'"
              class="object-right object-cover h-full rounded-xl"
            />
          </div>
        </li>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.hex {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  aspect-ratio: 1 / 1;
  position: relative;
}

:global(body.dragging-champion) .board-container {
  position: relative;
}

:global(body.dragging-champion) .board-field {
  z-index: 1;
}

:global(body.dragging-champion) .board-container .sortable-ghost {
  opacity: 0.5;
  position: absolute;
  z-index: 0;
}

:global(body.dragging-champion) .board-container .sortable-drag {
  opacity: 0.8;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}
</style>
