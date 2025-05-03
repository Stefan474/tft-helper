<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import ChampionBase from './ChampionBase.vue'

interface Field {
  x: number
  something: string
}

const board = ref<Field[]>(
  Array.from({ length: 28 }, (_, i) => ({
    x: i,
    something: `${i + 1}`,
  })),
)

// Group fields into rows of 7
const rows = computed(() =>
  Array.from({ length: 4 }, (_, rowIndex) => board.value.slice(rowIndex * 7, rowIndex * 7 + 7)),
)
</script>

<template>
  <div class="flex flex-col gap-2 items-center pt-5">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="flex gap-2"
      :class="{
        'ml-8': rowIndex === 1 || rowIndex === 3, // offset rows 2 and 4
      }"
    >
      <div
        v-for="field in row"
        :key="field.x"
        class="hex w-16 bg-base-200 flex items-center justify-center text-sm font-bold border border-base-300"
      >
        {{ field.something }}
      </div>
    </div>
  </div>
  <ChampionBase />
</template>

<style scoped>
.hex {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  aspect-ratio: 1 / 1;
}
</style>
