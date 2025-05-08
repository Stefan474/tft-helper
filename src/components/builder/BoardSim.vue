<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'
import { supabase } from '../../supabase'
import type { change, start, end } from 'vuedraggable'

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

// Store the currently dragged champion and target index
const dragState = ref({
  dragging: false,
  draggedChampion: null as Champion | null,
  targetIndex: -1,
  sourceIndex: -1,
  sourceList: '', // 'board' or 'champions'
})

function handleBoardDrop(event: change) {
  const { added, moved } = event

  if (added) {
    // Get the dropped champion and target index
    const { newIndex, element: champion } = added
    document.body.className

    if (newIndex !== undefined && newIndex >= 0 && newIndex < board.value.length) {
      // Create a copy of the board to maintain reactivity
      const updatedBoard = [...board.value]

      // Update the champion property of the existing field
      updatedBoard[newIndex].champion = champion

      // Only keep the original fields, preventing duplicates
      board.value = updatedBoard.filter((field, index) => index < 28)
    }
  } else if (moved) {
    // Handle reordering within the board
    // We'll use the final position after the animation completes
  }
}

function onStart(event: start) {
  dragState.value.dragging = true

  // Check which list we're dragging from
  if (event.from.classList.contains('board-container')) {
    dragState.value.sourceList = 'board'
    dragState.value.sourceIndex = event.oldIndex
    dragState.value.draggedChampion = board.value[event.oldIndex]?.champion || null
  } else {
    dragState.value.sourceList = 'champions'
    dragState.value.draggedChampion = event.item.__draggable_context.element
  }

  // Add a class to the body during drag operations
  document.body.classList.add('dragging-champion')
}

function onEnd(event: end) {
  // Remove the class when dragging ends
  document.body.classList.remove('dragging-champion')
  dragState.value.dragging = false

  // Handle the drop logic only when actually dropped
  if (event.to.classList.contains('board-container') && dragState.value.draggedChampion) {
    // Find the target element - we need to determine what hex we're hovering over
    const targetElement = event.originalEvent?.target?.closest('.board-field')
    let targetIndex = -1

    if (targetElement) {
      // Find the index by looking at the DOM structure
      const allFields = Array.from(document.querySelectorAll('.board-container .board-field'))
      targetIndex = allFields.indexOf(targetElement)
    } else {
      // Fallback to vuedraggable's newIndex if we can't find by DOM
      targetIndex = event.newIndex
    }

    // Update the champion property on the correct field
    if (targetIndex !== undefined && targetIndex >= 0 && targetIndex < board.value.length) {
      // Make a copy of the board to trigger reactivity properly
      const updatedBoard = [...board.value]
      updatedBoard[targetIndex].champion = dragState.value.draggedChampion
      board.value = updatedBoard
    }

    // Ensure the board doesn't grow beyond its intended size
    if (board.value.length > 28) {
      board.value = board.value.filter((_, index) => index < 28)
    }
  }

  // Reset drag state
  dragState.value.draggedChampion = null
  dragState.value.targetIndex = -1
  dragState.value.sourceIndex = -1
  dragState.value.sourceList = ''

  // Prevent the default behavior of adding a new item
  return false
}
</script>

<template>
  <!-- Board draggable -->
  <div class="flex flex-col items-center">
    <draggable
      :list="board"
      class="flex flex-wrap gap-2 items-center pt-5 board-container w-2/3"
      tag="ul"
      :group="{ name: 'champions', put: true }"
      item-key="x"
      @change="handleBoardDrop"
      @start="onStart"
      @end="onEnd"
      :animation="300"
      ghost-class="ghost-class"
      :force-fallback="true"
    >
      <template #item="{ element }">
        <div
          class="hex w-16 bg-base-200 flex items-center justify-center text-sm font-bold border border-base-300 board-field"
          :class="{ 'has-champion': element.champion, hidden: element.x > 28 }"
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
  </div>

  <div v-if="loading" class="w-full flex mt-2">
    <div class="flex justify-center py-8">
      <!--Loading until data is fetched-->
      <span class="loading loading-bars loading-lg"></span>
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
      :animation="150"
      ghost-class="ghost-champion"
      :force-fallback="true"
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

.ghost-class {
  opacity: 0.2;
  background-color: #ccc;
  pointer-events: none; /* Ensure ghost doesn't interfere with hover detection */
}

.ghost-champion {
  opacity: 0.4;
  pointer-events: none; /* Ensure ghost doesn't interfere with hover detection */
}

/* Highlight the hex cell being hovered over during drag */
:global(body.dragging-champion) .board-field:hover {
  border: 2px solid #4a9eff !important;
  box-shadow: 0 0 10px rgba(74, 158, 255, 0.6);
  z-index: 10;
}

:global(body.dragging-champion) .board-container {
  position: relative;
}

:global(body.dragging-champion) .board-field {
  z-index: 1;
}

:global(body.dragging-champion) .board-container .sortable-ghost {
  opacity: 0.3;
  position: absolute;
  z-index: 0;
}

:global(body.dragging-champion) .board-container .sortable-drag {
  opacity: 0.8;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

/* These styles help create a cleaner dragging experience */
.sortable-drag {
  z-index: 100;
}

.sortable-ghost {
  visibility: hidden;
}
</style>
