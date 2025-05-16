<script setup lang="ts">
import { ref, computed, onMounted, watch, inject } from 'vue'
import { supabase } from '@/supabase'
import { useBoardStore } from '@/stores/boardStore'

const champFilter = ref('')
interface Champion {
  id: number
  name: string
  trait1: string
  trait2: string
  trait3: string
  asset_path: string
  itemIds: [999, 999, 999]
}
export interface Field {
  x: number
  something: string
  champion?: Champion | null
}

const championList = ref<Champion[]>([])
const loading = ref(true)
const board = ref<Field[]>(
  Array.from({ length: 28 }, (_, i) => ({
    x: i,
    something: `${i + 1}`,
    champion: null,
  })),
)

const boardStore = useBoardStore()

watch(
  board,
  (newBoard) => {
    boardStore.setBoard(newBoard)
  },
  { deep: true },
)

const fieldTracker = ref<number | null>(null)
const draggedChampion = ref<Champion | null>(null)

onMounted(async () => {
  const { data, error } = await supabase.from('champion_list').select('*')
  if (error) console.error('Supabase error:', error)
  else if (data) championList.value = data as Champion[]
  loading.value = false
  // Sync the board with the store
})

const rows = computed(() =>
  Array.from({ length: 4 }, (_, rowIndex) => board.value.slice(rowIndex * 7, rowIndex * 7 + 7)),
)

const filteredChampions = computed(() => {
  const filter = champFilter.value.toLowerCase().trim()
  if (!filter) return championList.value
  return championList.value.filter((c) =>
    [c.name, c.trait1, c.trait2, c.trait3].some((f) => f?.toLowerCase().includes(filter)),
  )
})

// ——— SVG-based drag preview helper ———
const DRAG_IMG_SIZE = 64

function createSvgDragImage(path: string): SVGSVGElement {
  const svgNS = 'http://www.w3.org/2000/svg'
  const size = DRAG_IMG_SIZE

  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('width', `${size}`)
  svg.setAttribute('height', `${size}`)
  svg.style.position = 'absolute'
  svg.style.top = '-9999px'
  svg.style.left = '-9999px'

  // defs + hex clipPath …
  const defs = document.createElementNS(svgNS, 'defs')
  const clipPath = document.createElementNS(svgNS, 'clipPath')
  const clipId = `hexClip-${Math.random().toString(36).slice(2)}`
  clipPath.setAttribute('id', clipId)
  const poly = document.createElementNS(svgNS, 'polygon')
  poly.setAttribute(
    'points',
    [
      [size * 0.25, 0],
      [size * 0.75, 0],
      [size, size * 0.5],
      [size * 0.75, size],
      [size * 0.25, size],
      [0, size * 0.5],
    ]
      .map(([x, y]) => `${x},${y}`)
      .join(' '),
  )
  clipPath.appendChild(poly)
  defs.appendChild(clipPath)
  svg.appendChild(defs)

  // image element: cover + right-align via preserveAspectRatio
  const img = document.createElementNS(svgNS, 'image')
  img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', path)
  img.setAttribute('width', `${size}`)
  img.setAttribute('height', `${size}`)
  img.setAttribute('clip-path', `url(#${clipId})`)
  img.setAttribute('preserveAspectRatio', 'xMaxYMid slice')
  svg.appendChild(img)

  document.body.appendChild(svg)
  return svg
}

// ——— Drag from champion list ———
function onDragStart(champion: Champion, event: DragEvent) {
  if (!event.dataTransfer) return
  event.dataTransfer.effectAllowed = 'move'
  draggedChampion.value = champion
  fieldTracker.value = null
  document.body.classList.add('dragging')

  const path = `/assets/tft-champion/${champion.asset_path}.png`
  const svgEl = createSvgDragImage(path)
  event.dataTransfer.setDragImage(svgEl, DRAG_IMG_SIZE / 2, DRAG_IMG_SIZE / 2)

  requestAnimationFrame(() => {
    if (document.body.contains(svgEl)) document.body.removeChild(svgEl)
  })
}

// ——— Drag from existing field ———
function onDragStartField(field: Field, event: DragEvent) {
  if (!field.champion || !event.dataTransfer) {
    event.preventDefault()
    return
  }
  draggedChampion.value = field.champion
  fieldTracker.value = field.x
  document.body.classList.add('dragging')

  const path = `/assets/tft-champion/${field.champion.asset_path}.png`
  const svgEl = createSvgDragImage(path)
  event.dataTransfer.setDragImage(svgEl, DRAG_IMG_SIZE / 2, DRAG_IMG_SIZE / 2)

  requestAnimationFrame(() => {
    if (document.body.contains(svgEl)) document.body.removeChild(svgEl)
  })
}

// ——— Drop & swap logic ———
function onDrop(x: number, event?: DragEvent) {
  const targetField = board.value.find((f) => f.x === x)
  if (!targetField) return

  if (fieldTracker.value === null) {
    const id = draggedChampion.value?.id
    // if that champ.id is already on another field, block it
    if (id != null && board.value.some((f) => f.champion?.id === id)) {
      alert('You cannot place a champion that’s already on the board.')
      if (event?.currentTarget) {
        ;(event.currentTarget as HTMLElement).classList.remove('field-highlight')
      }
      draggedChampion.value = null
      fieldTracker.value = null
      return
    }
    // otherwise, assign it
    targetField.champion = draggedChampion.value
  } else {
    const source = board.value.find((f) => f.x === fieldTracker.value)
    if (source && source !== targetField) {
      const tmp = targetField.champion
      targetField.champion = source.champion
      source.champion = tmp
    }
  }

  if (event?.currentTarget) {
    ;(event.currentTarget as HTMLElement).classList.remove('field-highlight')
  }

  draggedChampion.value = null
  fieldTracker.value = null
}

function onDragEnter(event: DragEvent) {
  if (event.currentTarget) (event.currentTarget as HTMLElement).classList.add('field-highlight')
}
function onDragLeave(event: DragEvent) {
  if (event.currentTarget) (event.currentTarget as HTMLElement).classList.remove('field-highlight')
}

function onDragOverHex(event: DragEvent) {
  event.preventDefault() // keep the drop zone active
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

function onDragEnd() {
  document.body.classList.remove('dragging')
}

function addDragging(champion?: Champion | null) {
  if (champion) {
    document.body.classList.add('dragging')
  }
}

function removeChampion(champion?: Champion | null) {
  if (champion) {
    const field = board.value.find((f) => f.champion?.id === champion.id)
    if (field) field.champion = null
  }
}

const tabTracker = inject('tabTracker', ref(2))
function nextStep() {
  boardStore.setBoard(board.value)
  tabTracker.value = 3
}
</script>

<template>
  <div class="flex flex-col gap-2 items-center pt-5">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="flex gap-2"
      :class="{
        'ml-8': rowIndex === 1 || rowIndex === 3,
      }"
    >
      <div
        v-for="field in row"
        :key="field.x"
        class="hex w-16 bg-base-200 flex items-center justify-center text-sm font-bold border border-base-300"
        :draggable="!!field.champion"
        @dragover="onDragOverHex($event)"
        @drop="onDrop(field.x, $event)"
        @dragstart="onDragStartField(field, $event)"
        @dragenter="onDragEnter($event)"
        @dragleave="onDragLeave($event)"
        @mouseleave="onDragEnd()"
        @mouseover="addDragging(field.champion)"
        @dblclick="removeChampion(field.champion)"
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

  <div v-if="loading" class="w-124 flex mt-2">
    <div class="flex justify-center py-8">
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
    <div class="flex w-full max-w-4xl gap-1 flex-wrap justify-start mt-5">
      <ul v-for="champion in filteredChampions" :key="champion.id" class="flex gap-2 max-w-4xl">
        <li>
          <div
            class="w-15 rounded-xl border-2 border-base-200 h-15"
            draggable="true"
            @dragstart="onDragStart(champion, $event)"
            @dragend="onDragEnd()"
            @mouseleave="onDragEnd()"
            @mouseover="addDragging(champion)"
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
    <div>
      <button class="btn btn-primary mt-4" @click="nextStep()">Next</button>
    </div>
  </div>
</template>

<style scoped>
.hex {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  aspect-ratio: 1 / 1;
}

.field-highlight {
  filter: brightness(1.5);
  border: 2px 0px solid #4fd1c5 !important;
}
</style>

<style>
body.dragging,
body.dragging .hex {
  cursor: grabbing !important;
}
.hex {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  aspect-ratio: 1 / 1;
}
</style>
