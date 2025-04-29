<script setup lang="ts">
import { useItemStore } from '@/stores/itemStore.ts'

const store = useItemStore()
</script>
<template>
  <div class="mt-4 gap-2 w-60 flex justify-center">
    <ul class="flex gap-1 flex-wrap py-2">
      <li v-for="item in store.selectedItems" :key="item.id">
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
</template>
