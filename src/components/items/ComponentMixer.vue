<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import ItemPreviewWindow from './ItemPreviewWindow.vue'
import { useItemStore } from '@/stores/itemStore.ts'

defineProps({
  showSelectedItems: {
    type: Boolean,
    default: false,
  },
  showCompletedItems: {
    type: Boolean,
    default: false,
  },
})

interface ComponentItem {
  id: number
  component: string
  stat_type: string
  asset_route: string
}

const store = useItemStore()

const showWindow = ref(false)

const itemCombos = ref<ComponentItem[]>([])

const currentItem = ref<ComponentItem>()

// const selectedItems = ref<ComponentItem[]>([])

const loading = ref(true) // track loading state

/*function addItemSelection(item: ComponentItem) {
  store.addSelectedItem(item)
  //add conditional adding items
}*/

onMounted(async () => {
  const { data, error } = await supabase.from('component_list').select('*')

  if (error) {
    console.error('Supabase error:', error)
  } else if (data) {
    itemCombos.value = data as ComponentItem[]
  }

  loading.value = false // Done loading
})
</script>

<template>
  <p class="">Components</p>
  <div v-if="showSelectedItems" class="p-4 h-full w-full flex justify-center bg-base-100">
    <div v-if="loading" class="flex justify-center py-8">
      <!-- conditional loading until data is fetched-->
      <span className="loading loading-bars loading-lg"></span>
    </div>
    <ul v-else class="flex gap-1 flex-wrap justify-center w-120">
      <li v-for="item in itemCombos" :key="item.id" class="relative">
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
          @click="
            () => {
              store.addSelectedItem(item)
            }
          "
        >
          <div class="w-11 rounded-xl border-2 border-base-200">
            <img
              v-if="item.asset_route"
              :src="'/assets/item_images/' + item.asset_route + '.png'"
              :alt="item.component + ' item icon'"
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
  <div
    v-if="showSelectedItems"
    class="grid grid-cols-1 grid-flow-row gap-4 justify-items-stretch md:grid-cols-2"
  >
    <div
      class="mt-4 gap-2 w-62 flex-col bg-base-200 p-1 min-h-48 border-2 border-base-200 rounded-xl"
    >
      <p class="font-bold text-center">Selected Items</p>
      <ul class="flex gap-1 flex-wrap py-2">
        <li
          v-for="(item, index) in store.selectedItems"
          :key="index"
          class="relative"
          @click="store.removeSelectedItem(index)"
        >
          <div class="avatar">
            <div class="w-11 rounded-xl border-2 border-base-200">
              <img
                v-if="item.asset_route"
                :src="'/assets/item_images/' + item.asset_route + '.png'"
                :alt="item.component + ' item icon'"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div
      class="mt-4 gap-2 w-62 flex-col justify-center p-1 bg-base-300 border-2 border-base-200 rounded-xl"
    >
      <div class="font-bold text-center">Completed Items</div>
      <ul class="flex gap-1 flex-wrap py-2">
        <li v-for="(item, index) in store.completedItems" :key="index" class="relative">
          <div class="avatar">
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
  </div>
</template>
