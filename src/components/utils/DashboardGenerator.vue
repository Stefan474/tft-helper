<script setup lang="ts">
import { type CheatSheetWithItems } from '@/stores/compositionStore'
import LevelingTablePicker from '@/components/utils/LevelingTablePicker.vue'
import { ref } from 'vue'
import ItemSuggestionGenerator from './ItemSuggestionGenerator.vue'
import BoardGenerator from './BoardGenerator.vue'

defineProps<{
  currentSheet?: CheatSheetWithItems
}>()

const guideMode = ref(false)
</script>

<template>
  <div
    class="px-2 sm:px-8 lg:px-32 py-4 my-auto w-full"
    v-if="currentSheet"
    @click.self="$emit('close')"
  >
    <!-- responsive grid -->
    <div
      class="grid gap-4 sm:gap-6 lg:gap-8"
      :class="{
        'grid-cols-1': true /* mobile  */,
        'lg:grid-cols-12': true /* ≥640px  */,
      }"
    >
      <!-- ─── Board / items card ─────────────────────────────── -->
      <div class="bg-base-300 flex justify-center col-span-12 2xl:col-span-7 2xl:col-start-1">
        <div
          class="bg-base-300 p-2 sm:p-6 2xl:p-8 flex flex-col w-full rounded-xl"
          :class="{ 'h-fit': guideMode }"
        >
          <div class="flex align-middle justify-center">
            <h3 class="text-lg lg:text-2xl font-semibold mb-4 capitalize truncate flex-grow">
              {{ currentSheet?.compData.name }}
            </h3>
            <div class="flex gap-2 flex-col md:flex-row mb-2 md:mb-0">
              <button class="btn btn-sm btn-secondary" @click="$emit('close')">Close Sheet</button>
            </div>
          </div>
          <div class="bg-base-200 flex flex-col p-2 sm:p-6 flex-grow justify-center gap-4">
            <BoardGenerator
              v-if="currentSheet"
              :board="currentSheet.board"
              class="scale-60 sm:scale-80 md:scale-110 lg:scale-115 xl:scale-100"
            />
            <ItemSuggestionGenerator />
          </div>
        </div>
      </div>

      <!-- ─── Leveling table ──────────────────────────────────── -->
      <div v-if="currentSheet" class="col-span-12 sm:col-span-12 lg:col-span-12 xl:col-span-5">
        <div class="bg-base-300 p-4 sm:p-6 lg:p-8 h-full rounded-xl relative">
          <div class="flex">
            <h3 class="text-2xl mb-1 font-semibold flex-grow">Leveling Strategy</h3>
            <div class="flex align-bottom gap-2 flex-row-reverse mt-auto relative">
              <input type="checkbox" class="toggle" v-model="guideMode" />
              <div class="text-sm">Guide mode</div>
            </div>
          </div>
          <div class="badge badge-primary mb-2">{{ currentSheet.compData.levelStrategy }}</div>

          <LevelingTablePicker
            :table="currentSheet.compData.levelStrategy"
            :hide-description="!guideMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>
