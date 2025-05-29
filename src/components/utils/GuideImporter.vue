<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase'
import { type CheatSheetWithItems } from '@/stores/compositionStore'

const guideKey: string = '0deM9RnBIAeev9x5ndv0urapJm0FFbIQ'

const isImported = ref(false)
const importError = ref(false)
const guideSheetList = ref<CheatSheetWithItems[]>([])

async function importComps(key: string = guideKey) {
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
    guideSheetList.value = data.sheets as CheatSheetWithItems[]

    isImported.value = true
    console.log('Import successful:', data.sheets)
  } catch (err) {
    console.error('Error importing data:', err)
  }
}

onMounted(async () => {
  importComps()
})
</script>
