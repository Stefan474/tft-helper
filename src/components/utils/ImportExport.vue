<script lang="ts" setup>
import router from '@/router'
import { supabase } from '@/supabase'
import { ref } from 'vue'

const props = defineProps<{
  type: string
}>()

const copyValue = ref<string>('')
const isExported = ref(false)
const isImported = ref(false)
const pastedKey = ref<string>('')
const importError = ref(false)

function generateIdKey(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789'

  let key = ''
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return key
}

async function exportFromLocalStorage(key: string) {
  // 1) grab the raw JSON string
  const raw = localStorage.getItem('savedSheets')
  if (!raw) {
    console.warn('No saved sheets in localStorage – nothing to export.')
    return
  }

  // 2) parse it once
  let dataToExport: string
  try {
    dataToExport = JSON.parse(raw)
  } catch (err) {
    console.error('Invalid JSON in savedSheets:', err)
    return
  }

  // 3) bail if it’s empty
  if (!dataToExport || (Array.isArray(dataToExport) && dataToExport.length === 0)) {
    console.warn('Parsed data is empty – skipping export.')
    return
  }
  console.log('dataToExport:', dataToExport)

  // 4) insert into your `saved_sheets` table
  const { data, error } = await supabase.from('saved_sheets').insert([
    {
      key,
      sheets: dataToExport, // pass the JS object/array directly
    },
  ])

  if (error) {
    console.error('Error exporting data:', error)
  } else {
    console.log('Data exported successfully:', data)
    isExported.value = true
    copyValue.value = key
  }
}

function copyKeyValue() {
  navigator.clipboard.writeText(copyValue.value)
}

function exportComps() {
  console.log('export')
  const key = generateIdKey()
  exportFromLocalStorage(key)
}

//import handlers

async function importComps(key: string) {
  if (!key) {
    console.warn('No key provided for import')
    return
  }

  try {
    //  fetch a row based on key row
    const { data, error } = await supabase
      .from('saved_sheets')
      .select('sheets')
      .eq('key', key)
      .single()

    if (error) {
      importError.value = true
      throw error
    }
    if (!data || data.sheets == null) {
      console.warn(`No sheets found for key "${key}"`)
      return
    }

    // 2) Persist to localStorage under the same key your export reads
    localStorage.setItem('savedSheets', JSON.stringify(data.sheets))

    // 3) If you have a store method to rehydrate, call it now:
    // compositionStore.loadFromLocalStorage()

    // 4) Mark as imported so your UI updates
    isImported.value = true
    console.log('Import successful:', data.sheets)
  } catch (err) {
    console.error('Error importing data:', err)
  }
}
</script>

<template>
  <div v-show="props.type === 'import'" class="flex flex-col items-center">
    <p class="text-sm text-center mb-1">Paste the key below to import cheat sheets! <br /></p>
    <input
      type="text"
      placeholder="paste key here"
      :disabled="isImported"
      v-model="pastedKey"
      class="input input-primary mt-2"
    />

    <p class="text-sm text-center mt-4 text-error" v-if="importError && !isImported">
      Invalid key, make sure it's correct and if error persists generate a new one <br />
    </p>
    <p class="text-sm text-center mt-4 text-success" v-if="isImported">
      Import successful! Press the button below or refresh the page. <br />
    </p>

    <div class="flex gap-4">
      <button
        class="btn btn-secondary w-fit mt-4"
        @click="importComps(pastedKey)"
        :disabled="isImported"
        v-if="!isImported"
      >
        Import from key
      </button>
      <button
        class="btn btn-secondary w-fit mt-4"
        @click="
          () => {
            router.go(0)
          }
        "
        v-if="isImported"
      >
        See your sheets
      </button>
    </div>
  </div>
  <div v-show="props.type === 'export'" class="flex flex-col items-center">
    <p v-if="!isExported" class="text-sm text-left mb-4">
      Export your saved comps to share with others or import them on other devices.
    </p>
    <p v-else class="text-sm text-center mb-4">
      Copy the key below and use it on any other device to get your comps! <br />
    </p>
    <input
      type="text"
      placeholder="key will appear here"
      disabled
      class="input input-primary mt-2 cursor-pointer"
      v-model="copyValue"
    />
    <p class="text-sm text-center mb-4 mt-2" v-if="isExported">
      <span class="text-primary font-semibold">
        The key is time limited to a few days, but you only need to use it once to transfer your
        data.
      </span>
    </p>

    <div class="flex gap-4">
      <button class="btn btn-primary w-fit mt-4" @click="exportComps()" :disabled="isExported">
        Export
      </button>
      <button class="btn btn-secondary w-fit mt-4" :disabled="!isExported" @click="copyKeyValue()">
        Copy key
      </button>
    </div>
  </div>
</template>

<style scoped>
.input :disabled {
  opacity: 0.8;
  cursor: pointer;
}
</style>
