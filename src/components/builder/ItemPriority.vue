<script setup lang="ts">
import { useItemStore } from '@/stores/itemStore'
import ItemSuggestionGenerator from '../utils/ItemSuggestionGenerator.vue'

const itemStore = useItemStore()

const emitTabTracker = defineEmits(['change-tab'])
function nextStep() {
  emitTabTracker('change-tab', 5)
}
</script>

<template>
  <h2 class="text-2xl mb-2">Item Priority</h2>
  <p class="text-sm mb-4">Click on items to add them to your priority list (up to 6).</p>

  <div class="grid grid-cols-2 gap-4">
    <div class="bg-base-200 rounded-xl p-4 border-2 border-primary">
      <h3 class="text-lg mb-4">Your items</h3>
      <ul class="grid grid-cols-8 gap-1 w-fit">
        <li v-for="(item, index) in itemStore.remainingItems" :key="index">
          <div>
            <img
              :src="'/assets/item_images/' + item.asset_route + '.png'"
              alt="Item Image"
              class="w-11 rounded-xl border-2 border-base-200"
              @click="itemStore.addPriorityItem(item)"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="bg-base-200 rounded-xl p-4 border-2 border-secondary">
      <h3 class="text-lg mb-4">Priority items</h3>
      <ul class="grid grid-cols-8 gap-1 w-fit">
        <li v-for="(item, index) in itemStore.priorityItems" :key="index">
          <div>
            <img
              :src="'/assets/item_images/' + item.asset_route + '.png'"
              alt="Item Image"
              class="w-11 rounded-xl border-2 border-base-200"
              @click="itemStore.removePriorityItem(item)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
  <ItemSuggestionGenerator />
  <button class="btn btn-primary mt-4" @click="nextStep()">Next</button>
</template>
