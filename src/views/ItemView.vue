<script setup lang="ts">
import CompletedItems from '@/components/items/CompletedItems.vue'
import ComponentMixer from '@/components/items/ComponentMixer.vue'
</script>

<template>
  <div class="item-view flex flex-wrap justify-center">
    <ComponentMixer />
    <CompletedItems />
  </div>
</template>
