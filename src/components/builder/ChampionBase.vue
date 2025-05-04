<script setup lang="ts">
import { supabase } from '../../supabase'
import { onMounted, ref, computed } from 'vue'

const champFilter = ref('')

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

const filteredChampions = computed(() => {
  const filter = champFilter.value.toLowerCase().trim()
  if (!filter) return championList.value

  return championList.value.filter((champion) =>
    [champion.name, champion.trait1, champion.trait2, champion.trait3].some((field) =>
      field?.toLowerCase().includes(filter),
    ),
  )
})
</script>

<template>
  <div v-if="loading" class="w-124 flex mt-2">
    <div class="flex justify-center py-8">
      <!-- conditional loading until data is fetched-->
      <span className="loading loading-bars loading-lg"></span>
    </div>
  </div>
  <div v-else>
    <label class="floating-label mt-7">
      <span>Search</span>
      <input
        type="text"
        placeholder="Search by name or trait"
        class="input input-md"
        v-model="champFilter"
      />
    </label>
    <div class="flex w-full max-w-4xl gap-1 flex-wrap justify-start mt-5">
      <ul v-for="champion in filteredChampions" :key="champion.id" class="flex gap-2 max-w-4xl">
        <li>
          <div class="w-15 rounded-xl border-2 border-base-200 h-15">
            <img
              v-if="champion.asset_path"
              :src="'/assets/tft-champion/' + champion.asset_path + '.png'"
              :alt="champion.name + ' champion icon'"
              class="object-right object-cover h-full rounded-xl"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
