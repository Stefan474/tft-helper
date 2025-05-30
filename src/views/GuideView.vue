<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useCompositionStore } from '@/stores/compositionStore'
import type { CheatSheetWithItems } from '@/stores/compositionStore'
import { useItemStore, type CompletedItem } from '@/stores/itemStore'
import { supabase } from '@/supabase'
import DashboardGenerator from '@/components/utils/DashboardGenerator.vue'
import ItemPreviewWindow from '@/components/items/ItemPreviewWindow.vue'

const compositionStore = useCompositionStore()
const guideKey: string = 'FAEv7bNjetFGS0EsFlTOZZb3cB4VjixL' //change to the current guide key
const isImported = ref(false)
const importError = ref(false)
const guideSheetList = ref<CheatSheetWithItems[]>([])
const currentItem = ref<CompletedItem>()
const currentSheetIndex = ref('')
const currentChampion = ref('')
const currentSlot = ref('')

const itemStore = useItemStore()
const itemData = ref<CompletedItem[]>([])
const currentSheet = ref<CheatSheetWithItems>()
const showDashboard = ref(false)
const showItemPreview = ref(false)

//import handling
async function importComps(key: string = guideKey) {
  if (!key) {
    console.warn('No key provided for import')
    return
  }

  try {
    //  fetch a row based on key row
    const { data, error } = await supabase
      .from('saved_sheets')
      .select('sheets')
      .eq('key', key)
      .single()

    if (error) {
      importError.value = true
      throw error
    }
    if (!data || data.sheets == null) {
      console.warn(`No sheets found for key "${key}"`)
      return
    }
    guideSheetList.value = data.sheets as CheatSheetWithItems[]
    console.log('guideSheetList', guideSheetList)

    isImported.value = true
    console.log('Import successful:', data.sheets)
  } catch (err) {
    console.error('Error importing data:', err)
  }
}

onMounted(async () => {
  await importComps()

  compositionStore.loadFromLocalStorage()

  const first = guideSheetList.value[0]
  console.log('first', first)

  if (!first) return

  currentSheet.value = first
  compositionStore.setFullSheet(first)
})

//item handling
onMounted(async () => {
  const { data, error } = await supabase.from('completed_items').select('*')
  if (error) console.error('Supabase error:', error)
  else if (data) {
    itemData.value = data as CompletedItem[]
    itemStore.allCompletedItems = data as CompletedItem[]
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

function setCurrentSheet(sheet: CheatSheetWithItems) {
  compositionStore.setFullSheet(sheet)
  currentSheet.value = sheet
  showDashboard.value = true
}

function deleteSheet(sheet: CheatSheetWithItems) {
  compositionStore.deleteSheet(sheet)
}

function addSheet(sheet: CheatSheetWithItems) {
  compositionStore.saveAndAddToLocalStorage(sheet)
}
</script>

<template>
  <div class="w-full bg-base-100 px-4 sm:px-8 lg:px-32 py-4 relative">
    <div
      class="grid gap-4 sm:gap-6 lg:gap-8"
      :class="{
        'grid-cols-1': true /* mobile  */,
        'lg:grid-cols-12': true /* ≥640px  */,
      }"
    >
      <!-- ─── guides / items card ─────────────────────────────── -->
      <div class="flex justify-center col-span-12 xl:col-span-7 2xl:col-start-1">
        <div
          class="bg-base-300 p-4 2xl:pt-6 sm:p-6 2xl:p-8 flex flex-col w-full rounded-xl"
          :class="{ 'h-fit': false }"
        >
          <div class="flex align-middle justify-center">
            <h3 class="text-lg lg:text-2xl font-semibold mb-2 capitalize truncate flex-grow">
              Meta cheat sheets
            </h3>
          </div>
          <p class="text-sm mb-4">Up to date meta comps for you to yoink and use.</p>

          <div class="p-2 bg-base-300 flex flex-col gap-3 rounded-lg">
            <div
              class="flex flex-col flex-grow justify-center border-1 border-primary rounded-lg"
              v-for="sheet in guideSheetList"
              :key="sheet.compData.name"
            >
              <div class="bg-base-300 p-4 pt-2 px-3 pb-3 rounded-lg">
                <div class="flex flex-col">
                  <p class="text-md capitalize mb-2 flex-grow font-semibold">
                    {{ sheet.compData.name }}
                  </p>
                  <div class="badge badge-secondary mb-2 text-black">
                    {{ sheet.compData.levelStrategy }}
                  </div>
                </div>

                <div class="bg-base-100 rounded-lg p-2 pt-0.5 pl-1">
                  <ul
                    class="flex flex-wrap md:justify-start gap-4 py-1 justify-center pt-2 lg:pt-1"
                  >
                    <li
                      v-for="field in sheet.board
                        .filter((f) => f.champion)
                        .slice()
                        .sort((a, b) => {
                          // sort by item slots
                          const ah = a.champion?.itemIds.some((id) => id !== 999)
                          const bh = b.champion?.itemIds.some((id) => id !== 999)
                          return ah === bh ? 0 : ah ? -1 : 1
                        })"
                      :key="field.x"
                    >
                      <div class="relative">
                        <img
                          v-if="field.champion && field.champion.stars"
                          src="/assets/ux_images/3-star-asset_2.png"
                          class="absolute top-0 left-3.5 origin-center w-9 opacity-90 z-40"
                        />
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
                          class="hex h-16 object-cover object-right scale-95 origin-center"
                          :class="{ 'brightness-80': field.champion!.stars }"
                        />

                        <div
                          class="w-16 h-6 absolute bottom-[-10px] left-0 grid grid-cols-3 gap-1"
                          v-if="field.champion?.itemIds.some((id) => id !== 999)"
                        >
                          <!-- Slot 1 -->
                          <div
                            class="bg-gray-800 border-primary border-1 w-5.5 h-5.5"
                            @mouseenter="
                              {
                                ;(showItemPreview = true),
                                  (currentItem = itemData.find(
                                    (i) => i.id === field.champion?.itemIds[0],
                                  )),
                                  (currentSheetIndex = sheet.compData.name),
                                  (currentChampion = field.champion?.name),
                                  (currentSlot = 'Slot 1')
                              }
                            "
                            @mouseleave="showItemPreview = false"
                          >
                            <img
                              v-if="
                                field.champion?.itemIds[0] && field.champion?.itemIds[0] !== 999
                              "
                              :src="
                                '/assets/item_images/' +
                                itemsData.getPath(field.champion.itemIds[0]) +
                                '.png'
                              "
                              alt="Item Image"
                              class="w-full h-full object-cover rounded-xl"
                            />
                            <div
                              v-if="
                                showItemPreview &&
                                currentItem?.id === field.champion?.itemIds[0] &&
                                currentSheetIndex === sheet.compData.name &&
                                currentChampion === field.champion?.name &&
                                currentSlot === 'Slot 1'
                              "
                            >
                              <ItemPreviewWindow
                                :item="itemData.find((i) => i.id === field.champion?.itemIds[0])"
                                :champion="field.champion"
                                :showWindow="!showItemPreview"
                                class="z-1000"
                              />
                            </div>
                          </div>

                          <!-- Slot 2 -->
                          <div class="bg-gray-800 border-primary border-1 w-5.5 h-5.5">
                            <img
                              v-if="
                                field.champion?.itemIds[1] && field.champion?.itemIds[1] !== 999
                              "
                              :src="
                                '/assets/item_images/' +
                                itemsData.getPath(field.champion.itemIds[1]) +
                                '.png'
                              "
                              alt="Item Image"
                              class="w-full h-full object-cover rounded-xl"
                              @mouseenter="
                                {
                                  ;(showItemPreview = true),
                                    (currentItem = itemData.find(
                                      (i) => i.id === field.champion?.itemIds[1],
                                    )),
                                    (currentSheetIndex = sheet.compData.name),
                                    (currentChampion = field.champion?.name),
                                    (currentSlot = 'Slot 2')
                                }
                              "
                              @mouseleave="showItemPreview = false"
                            />
                            <div
                              v-if="
                                showItemPreview &&
                                currentItem?.id === field.champion?.itemIds[1] &&
                                currentSheetIndex === sheet.compData.name &&
                                currentChampion === field.champion?.name &&
                                currentSlot === 'Slot 2'
                              "
                            >
                              <ItemPreviewWindow
                                :item="itemData.find((i) => i.id === field.champion?.itemIds[1])"
                                :champion="field.champion"
                                :showWindow="!showItemPreview"
                                class="z-1000"
                              />
                            </div>
                          </div>

                          <!-- Slot 3 -->
                          <div class="bg-gray-800 border-primary border-1 w-5.5 h-5.5">
                            <img
                              v-if="
                                field.champion?.itemIds[2] && field.champion?.itemIds[2] !== 999
                              "
                              :src="
                                '/assets/item_images/' +
                                itemsData.getPath(field.champion.itemIds[2]) +
                                '.png'
                              "
                              alt="Item Image"
                              class="w-full h-full object-cover rounded-xl"
                              @mouseenter="
                                {
                                  ;(showItemPreview = true),
                                    (currentItem = itemData.find(
                                      (i) => i.id === field.champion?.itemIds[2],
                                    )),
                                    (currentSheetIndex = sheet.compData.name),
                                    (currentChampion = field.champion?.name),
                                    (currentSlot = 'Slot 3')
                                }
                              "
                              @mouseleave="showItemPreview = false"
                            />
                            <div
                              v-if="
                                showItemPreview &&
                                currentItem?.id === field.champion?.itemIds[2] &&
                                currentSheetIndex === sheet.compData.name &&
                                currentChampion === field.champion?.name &&
                                currentSlot === 'Slot 3'
                              "
                            >
                              <ItemPreviewWindow
                                :item="itemData.find((i) => i.id === field.champion?.itemIds[2])"
                                :champion="field.champion"
                                :showWindow="!showItemPreview"
                                class="z-1000"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="flex gap-2">
                  <button
                    class="btn btn-secondary btn-sm mt-2 -mb-1"
                    @click="setCurrentSheet(sheet)"
                  >
                    Show cheat sheet
                  </button>
                  <button class="btn btn-primary btn-sm mt-2 -mb-1" @click="addSheet(sheet)">
                    Add to your comps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-12 lg:col-span-12 xl:col-span-4">
        <div class="w-full h-[80vh] sticky top-21 gap-2 flex flex-col">
          <div class="h-2/3 pb-4 bg-base-300 rounded-lg">
            <div class="bg-base-300 rounded-lg p-4 h-full">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">Your Cheat Sheets</h3>
              </div>

              <div class="space-y-2 h-10/11 pl-3 pt-3 overflow-y-scroll bg-base-200 rounded-lg">
                <div
                  v-for="sheet in compositionStore.allSavedSheets"
                  :key="sheet.compData.name"
                  class="bg-base-100 border-secondary border-1 py-0 p-3 pl-0 rounded-lg hover:bg-base-100 hover:brightness-110 cursor-pointer transition flex"
                >
                  <img
                    :src="`/assets/tft-champion/${sheet.board.find((cell) => cell.champion)?.champion?.asset_path}.png`"
                    class="w-16 object-cover object-right rounded-l-lg"
                  />
                  <div class="py-3 flex pl-3 w-full">
                    <div class="flex-grow h-full" @click="setCurrentSheet(sheet)">
                      {{ sheet.compData.name }}
                    </div>
                    <div class="bg-primary text-black rounded-lg px-3" @click="deleteSheet(sheet)">
                      X
                    </div>
                  </div>
                </div>
                <div v-if="compositionStore.allSavedSheets.length === 0" class="text-error p-4">
                  You have no saved comps.<br />
                  Add one from the guide or create one yourself.
                </div>
              </div>
            </div>
          </div>
          <div class="h-1/2 bg-red-200 hidden"></div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showDashboard && currentSheet">
    <div class="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm flex overflow-scroll">
      <DashboardGenerator
        :currentSheet="currentSheet"
        :key="currentSheet.compData.name"
        @close="showDashboard = false"
      />
    </div>
  </div>
</template>
