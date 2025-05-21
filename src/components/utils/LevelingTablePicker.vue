<script setup lang="ts">
import Fast8Table from '../leveling-tables/Fast8Table.vue'
import Fast9Table from '../leveling-tables/Fast9Table.vue'
import StandardTable from '../leveling-tables/StandardTable.vue'
import OneCostRerollTable from '../leveling-tables/OneCostRerollTable.vue'
import TwoCostRerollTable from '../leveling-tables/TwoCostRerollTable.vue'
import ThreeCostRerollTable from '../leveling-tables/ThreeCostRerollTable.vue'

const tableOptions = defineProps<{
  table: string
  hideDescription: boolean
}>()
</script>

<template>
  <div v-if="tableOptions.table === 'Fast 8'">
    <Fast8Table :show-description="hideDescription" />
  </div>
  <div v-else-if="tableOptions.table === 'Fast 9'">
    <Fast9Table :show-description="hideDescription" />
  </div>
  <div v-else-if="tableOptions.table === 'Standard'">
    <StandardTable :show-description="hideDescription" />
  </div>
  <div v-else-if="tableOptions.table === '1 cost reroll'">
    <OneCostRerollTable :show-description="hideDescription" />
  </div>
  <div v-else-if="tableOptions.table === '2 cost reroll'">
    <TwoCostRerollTable :show-description="hideDescription" />
  </div>
  <div v-else-if="tableOptions.table === '3 cost reroll'">
    <ThreeCostRerollTable :show-description="hideDescription" />
  </div>
  <div v-else>
    <StandardTable :show-description="hideDescription" />
  </div>
</template>
