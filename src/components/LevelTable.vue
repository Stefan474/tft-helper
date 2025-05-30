<script setup lang="ts">
// individual tables
import Fast8Table from './leveling-tables/Fast8Table.vue'
import Fast9Table from './leveling-tables/Fast9Table.vue'
import StandardTable from './leveling-tables/StandardTable.vue'
import OneCostRerollTable from './leveling-tables/OneCostRerollTable.vue'
import ThreeCostRerollTable from './leveling-tables/ThreeCostRerollTable.vue'
import TwoCostRerollTable from './leveling-tables/TwoCostRerollTable.vue'
import { ref } from 'vue'

//ref for the description toggle that governs every single table's details, bound to the 'toggle details' button
const isDescriptionVisible = ref(true)
</script>

<template>
  <div class="bg-base-300 pt-0 rounded-md pb-2">
    <div class="w-full flex justify-center pt-2">
      <h2 class="text-xl font-bold text-base-content">Leveling Tables</h2>
    </div>
    <div class="w-full flex justify-center mt-2 bg-base py-1 rounded-t-md">
      <div class="flex justify-center gap-3 align-middle px-2 pb-0">
        <input
          type="button"
          class="btn btn-primary"
          value="Toggle details"
          @click="isDescriptionVisible = !isDescriptionVisible"
        />
      </div>
    </div>
    <div class="tabs tabs-border h-fit px-2">
      <input
        type="radio"
        name="my_tabs_2"
        class="tab text-lg"
        aria-label="Standard"
        checked="true"
      />
      <div class="tab-content tab-content-custom">
        <StandardTable :showDescription="isDescriptionVisible" />
      </div>

      <input type="radio" name="my_tabs_2" class="tab text-lg" aria-label="Fast 8" />
      <div class="tab-content tab-content-custom">
        <Fast8Table :showDescription="isDescriptionVisible" />
      </div>

      <input type="radio" name="my_tabs_2" class="tab text-xl" aria-label="Fast 9" />
      <div class="tab-content tab-content-custom">
        <Fast9Table :showDescription="isDescriptionVisible" />
      </div>

      <input type="radio" name="my_tabs_2" class="tab text-xl" aria-label="1-cost reroll" />
      <div class="tab-content tab-content-custom">
        <OneCostRerollTable :showDescription="isDescriptionVisible" />
      </div>

      <input type="radio" name="my_tabs_2" class="tab text-xl" aria-label="2-cost reroll" />
      <div class="tab-content tab-content-custom">
        <TwoCostRerollTable :showDescription="isDescriptionVisible" />
      </div>

      <input type="radio" name="my_tabs_2" class="tab text-xl" aria-label="3-cost reroll" />
      <div class="tab-content tab-content-custom">
        <ThreeCostRerollTable :showDescription="isDescriptionVisible" />
      </div>
    </div>
  </div>
</template>
