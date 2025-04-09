<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'

interface ComponentItem {
  id: number
  component: string
  stat_type: string
  asset_route: string
}

const itemCombos = ref<ComponentItem[]>([])

onMounted(async () => {
  const { data, error } = await supabase.from('component_list').select('*')
  if (error) console.error('Supabase error:', error)
  else if (data) itemCombos.value = data as ComponentItem[]
})
</script>

<template>
  <div class="p-4">
    <ul class="flex gap-2">
      <li v-for="item in itemCombos" :key="item.id">
        <div class="avatar">
          <div class="w-12 rounded-xl">
            <img
              v-if="item.asset_route"
              :src="'src/assets/item_images/' + item.asset_route + '.png'"
              :alt="item.component + ' item icon'"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
