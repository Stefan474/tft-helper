<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import ItemPreviewWindow from './ItemPreviewWindow.vue'

interface CompletedItem {
  id: number
  name: string
  component_1_id: number
  component_2_id: number
  stats: Record<string, string>
  asset_route: string
  item_description: string
}

const showWindow = ref(false)
const itemData = ref<CompletedItem[]>([])
const currentItem = ref<CompletedItem>()
const loading = ref(true) // track loading state

onMounted(async () => {
  const { data, error } = await supabase.from('completed_items').select('*')
  if (error) console.error('Supabase error:', error)
  else if (data) itemData.value = data as CompletedItem[]
  loading.value = false // done loading
})
</script>

<template>
  <div class="p-4 w-full flex justify-center">
    <div v-if="loading" class="flex justify-center py-8">
      <!-- conditional loading until data is fetched-->
      <span className="loading loading-bars loading-lg"></span>
    </div>

    <ul v-else class="flex gap-1 flex-wrap w-120 justify-center">
      <li v-for="item in itemData" :key="item.id" class="relative">
        <div
          class="avatar"
          @mouseenter="
            () => {
              currentItem = item
              showWindow = true
            }
          "
          @mouseleave="
            () => {
              showWindow = false
            }
          "
        >
          <div class="w-11 rounded-xl border-2 border-base-200">
            <img
              v-if="item.asset_route"
              :src="'/assets/item_images/' + item.asset_route + '.png'"
              :alt="item.name + ' item icon'"
            />
          </div>

          <div
            v-if="showWindow && currentItem?.id === item.id"
            class="absolute top-full left-1/2 -translate-x-1 z-10"
          >
            <ItemPreviewWindow :showWindow="showWindow" :item="item" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
