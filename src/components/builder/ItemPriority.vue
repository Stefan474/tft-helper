<script setup lang="ts">
import { useItemStore } from '@/stores/itemStore'

const itemStore = useItemStore()
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
    <div class="bg-base-200 rounded-xl p-4 border-2 border-primary">
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
  <div class="bg-base-200 rounded-xl p-4 border-2 border-primary mt-4">
    <!--Priority components calc--->
    <p class="text-left mb-1 font-bold" v-if="itemStore.priorityComponents.length > 0">
      High priority components
    </p>
    <ul class="grid grid-cols-8 gap-1 w-fit">
      <li
        v-for="(item, idx) in itemStore.priorityComponentCounts.sort((a, b) => b.count - a.count)"
        :key="item.item.id"
      >
        <div class="flex align-middle justify-center relative">
          <p class="text-lg bottom-0 left-0 bg-primary/30 rounded-2xl font-bold absolute">
            {{ item.count }}x
          </p>
          <img
            :src="'/assets/item_images/' + item.item.asset_route + '.png'"
            alt="Item Image"
            class="w-9 rounded-xl border-2 border-base-200 m-1 mx-w"
          />
          <span class="font-bold my-auto" v-if="idx < itemStore.priorityComponentCounts.length - 1">
            →
          </span>
        </div>
      </li>
    </ul>
    <!--Remaining components calc--->
    <div v-if="itemStore.boardComponents.length !== itemStore.remainingComponentCounts.length">
      <p class="text-left mb-1 font-bold" v-if="itemStore.remainingComponents.length > 0">
        Lower priority components
      </p>
      <ul class="grid grid-cols-8 gap-1 w-fit">
        <li
          v-for="(item, idx) in itemStore.remainingComponentCounts.sort(
            (a, b) => b.count - a.count,
          )"
          :key="item.item.id"
        >
          <div class="flex align-middle justify-center relative">
            <p class="text-lg bottom-0 left-0 bg-primary/30 rounded-2xl font-bold absolute">
              {{ item.count }}x
            </p>
            <img
              :src="'/assets/item_images/' + item.item.asset_route + '.png'"
              alt="Item Image"
              class="w-9 rounded-xl border-2 border-base-200 m-1 mx-w"
            />
            <span
              class="font-bold my-auto"
              v-if="idx < itemStore.remainingComponentCounts.length - 1"
            >
              →
            </span>
          </div>
        </li>
      </ul>
    </div>
    <!--All components calc--->
    <div v-if="itemStore.boardComponents.length === itemStore.remainingComponentCounts.length">
      <p class="text-left mb-1 font-bold">Component breakdown</p>
      <ul class="grid grid-cols-8 gap-1 w-fit">
        <li
          v-for="(item, idx) in itemStore.componentCounts.sort((a, b) => b.count - a.count)"
          :key="item.item.id"
        >
          <div class="flex align-middle justify-center relative">
            <p class="text-lg bottom-0 left-0 bg-primary/30 rounded-2xl font-bold absolute">
              {{ item.count }}x
            </p>
            <img
              :src="'/assets/item_images/' + item.item.asset_route + '.png'"
              alt="Item Image"
              class="w-9 rounded-xl border-2 border-base-200 m-1 mx-w"
            />
            <span class="font-bold my-auto" v-if="idx < itemStore.componentCounts.length - 1">
              →
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
