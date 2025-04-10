<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '../../supabase'

const itemData = ref<CompletedItem[]>([])

onMounted(async () => {
  const { data, error } = await supabase.from('completed_items').select('*')
  if (error) console.error('Supabase error:', error)
  else if (data) itemData.value = data as CompletedItem[]
})

interface CompletedItem {
  id: number
  name: string
  component_1_id: number
  component_2_id: number
  stats: Record<string, string>
  asset_route: string
  item_description: string
}
</script>

<template>
  <ul class="flex flex-wrap gap-2 justify-center">
    <li v-for="item in itemData" :key="item.id" class="flex flex-col gap-2">
      <div class="flex justify-center">{{ item.name }}</div>
    </li>
  </ul>
</template>
