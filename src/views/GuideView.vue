<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useCompositionStore } from '@/stores/compositionStore'
import type { CheatSheetWithItems } from '@/stores/compositionStore'
import { useItemStore, type CompletedItem } from '@/stores/itemStore'
import { supabase } from '@/supabase'

const compositionStore = useCompositionStore()

const guideSheets = ref<CheatSheetWithItems[]>([])

const itemStore = useItemStore()
const itemData = ref<CompletedItem[]>([])
const currentSheet = ref<CheatSheetWithItems>()
const showDashboard = ref(false)

onMounted(() => {
  compositionStore.loadFromLocalStorage()
  guideSheets.value = compositionStore.allSavedSheets

  const first = compositionStore.allSavedSheets[0]
  if (!first) return
})

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
</script>

<template>
  <div class="w-full bg-base-100 px-4 sm:px-8 lg:px-32 py-4">
    <div
      class="grid gap-4 sm:gap-6 lg:gap-8"
      :class="{
        'grid-cols-1': true /* mobile  */,
        'lg:grid-cols-12': true /* ≥640px  */,
      }"
    >
      <!-- ─── guides / items card ─────────────────────────────── -->
      <div class="flex justify-center col-span-12 xl:col-span-7 2xl:col-span 2xl:col-start-2">
        <div
          class="bg-base-300 p-4 2xl:pt-6 sm:p-6 2xl:p-8 flex flex-col w-full rounded-xl"
          :class="{ 'h-fit': false }"
        >
          <div class="flex align-middle justify-center">
            <h3 class="text-lg lg:text-2xl font-semibold mb-4 capitalize truncate flex-grow">
              Meta comps
            </h3>
            <div class="flex gap-2 flex-col md:flex-row mb-2 md:mb-0">asd</div>
          </div>
          <div class="p-2 bg-base-100 flex flex-col gap-3 rounded-lg">
            <div
              class="flex flex-col flex-grow justify-center border-1 border-primary rounded-lg"
              v-for="sheet in guideSheets"
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

                <div class="bg-base-100 p-2 pl-1">
                  <ul class="flex flex-wrap justify-start gap-4 py-1">
                    <li v-for="field in sheet.board.filter((f) => f.champion)" :key="field.x">
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
                          class="hex w-16 h-16 object-cover object-right scale-95 origin-center"
                          :class="{ 'brightness-80': field.champion!.stars }"
                        />
                        <img
                          v-if="field.champion && field.champion.stars"
                          src="/assets/ux_images/3-star-asset_2.png"
                          class="absolute -top-2 left-2.5 origin-center w-11 opacity-80"
                        />
                        <div class="w-16 h-6 absolute bottom-[-10px] left-0 grid grid-cols-3 gap-1">
                          <!-- Slot 1 -->
                          <div class="bg-gray-800 border-primary border-1 w-5.5 h-5.5">
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
                            />
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
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <button class="btn btn-secondary btn-sm mt-2 -mb-1">Open full build</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showDashboard"></div>
</template>
