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
            :alt="item.component + ' item icon'"
          />
        </div>
        <h2 class="card-title ml-2">{{ item.component }}</h2>
      </div>
      <p>+{{ item.stat_value }} {{ item.stat_type }} <br /></p>
      <div class="card-actions justify-end"></div>
    </div>
    <div class="card-body" v-if="item.description">
      <p class="font-bold">
        {{ item.description }}
      </p>
      <div class="card-actions justify-end"></div>
    </div>
  </div>
</template>
