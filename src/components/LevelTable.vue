<script setup lang="ts">
import StandardTable from './leveling-tables/StandardTable.vue'
</script>

<template>
  <div class="tabs tabs-border h-fit">
    <input type="radio" name="my_tabs_2" class="tab" aria-label="Standard" />
    <div class="tab-content border-base-300 bg-base-100"><StandardTable /></div>

    <input type="radio" name="my_tabs_2" class="tab" aria-label="Fast 8" checked="checked" />
    <div class="tab-content border-base-300 bg-base-100"></div>

    <input type="radio" name="my_tabs_2" class="tab" aria-label="Fast 9" />
    <div class="tab-content border-base-300 bg-base-100"></div>

    <input type="radio" name="my_tabs_2" class="tab" aria-label="1-cost reroll" />
    <div class="tab-content border-base-300 bg-base-100"></div>

    <input type="radio" name="my_tabs_2" class="tab" aria-label="2-cost reroll" checked="checked" />
    <div class="tab-content border-base-300 bg-base-100"></div>

    <input type="radio" name="my_tabs_2" class="tab" aria-label="3-cost reroll" />
    <div class="tab-content border-base-300 bg-base-100"></div>
  </div>
</template>
