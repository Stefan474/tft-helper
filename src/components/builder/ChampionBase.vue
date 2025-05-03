<script setup lang="ts">
import { supabase } from '../../supabase'
import { onMounted, ref } from 'vue'

interface Champion {
  id: number
  name: string
  trait1: string
  trait2: string
  trait3: string
  asset_path: string
}

const championList = ref<Champion[]>([])
const loading = ref(true) // track loading state

onMounted(async () => {
  const { data, error } = await supabase.from('champion_list').select('*')

  if (error) {
    console.error('Supabase error:', error)
  } else if (data) {
    championList.value = data as Champion[]
  }

  loading.value = false // Done loading
})
</script>

<template>
  <ul v-for="champion in championList" :key="champion.id">
    <li>{{ champion.name }}</li>
  </ul>
</template>
