<script lang="ts">
import LevelTable from '@/components/LevelTable.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    LevelTable,
  },
})
</script>

<template>
  <div class="home">
    <LevelTable />
  </div>
</template>
