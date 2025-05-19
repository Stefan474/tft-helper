<script setup lang="ts">
import { useItemStore } from '@/stores/itemStore'

// IF THE ITEMS ARE NOT LOADING MAKE SURE TO LOAD THE ITEM STORE AND THE BOARD STORE IN THE DAHSBOARD

const itemStore = useItemStore()
</script>

<template>
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
    <div v-if="itemStore.priorityComponentCounts.length > 0">
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
    <div v-if="!itemStore.priorityComponentCounts.length">
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
