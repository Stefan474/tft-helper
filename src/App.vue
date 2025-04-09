<template>
  <div class="app flex-col justify-center">
    <NavBar />
    <router-view />
  </div>

  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Test Supabase Data</h2>
    <ul>
      <li v-for="item in itemCombos" :key="item.id">
        {{ item.component }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

interface ComponentItem {
  id: number
  component: string
}

const itemCombos = ref<ComponentItem[]>([])

onMounted(async () => {
  const { data, error } = await supabase.from('component_list').select('*')

  if (error) console.error('Supabase error:', error)
  else if (data) itemCombos.value = data as ComponentItem[]
})
</script>
