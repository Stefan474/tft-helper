<script setup lang="ts">
defineProps({
  showWindow: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="card bg-base-300 w-54 shadow-sm border-1 border-amber-200 mt-4">
    <div class="card-body pb-0 border-b-base-100 border-b-1 p-2">
      <div class="avatar">
        <div class="w-11 rounded-xl border-2 border-base-200">
          <img
            v-if="item.asset_route"
            :src="'/assets/item_images/' + item.asset_route + '.png'"
            :alt="item.name || item.component + ' item icon'"
            class="w-11"
          />
        </div>
        <h2 class="card-title ml-2">
          {{ item.name || item.component }}
        </h2>
      </div>
      <p v-if="item.stat_type && item.stat_value">+{{ item.stat_value }} {{ item.stat_type }}</p>
      <p v-if="item.stats">
        <!-- Display stats as key-value pairs if the 'stats' object exists -->
        <span v-for="(value, key) in item.stats" :key="key"> {{ key }}: {{ value }}  </span>
      </p>
      <div class="card-actions justify-end"></div>
    </div>
    <div
      class="card-body align-items-left p-2 pt-1 pb-2"
      v-if="item.item_description || item.description"
    >
      <p class="text-left min-w-full">
        {{ item.item_description || item.description }}
      </p>
    </div>
  </div>
</template>
