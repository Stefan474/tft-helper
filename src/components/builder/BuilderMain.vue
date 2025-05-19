<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import BoardSim from '@/components/builder/BoardSim.vue'
import ChampionItems from '@/components/builder/ChampionItems.vue'
import ItemPriority from '@/components/builder/ItemPriority.vue'
import { useBoardStore } from '@/stores/boardStore'
import { useCompositionStore } from '@/stores/compositionStore'
import ReviewData from './ReviewData.vue'

export interface CompData {
  name: string
  levelStrategy: string
}

export interface Champion {
  id: number
  name: string
  trait1: string
  trait2: string
  trait3: string
  asset_path: string
  itemIds: [number?, number?, number?]
}

export interface Field {
  x: number
  something: string
  champion?: Champion | null | undefined
}

export interface CheatSheet {
  compData: CompData
  board: Field[]
}

const compData = ref<CompData>({
  name: '',
  levelStrategy: '',
})

const compositionStore = useCompositionStore()

// Validation logic for leveling strategy
const isValid = computed(() => {
  if (compData.value.levelStrategy === '') {
    return true
  }
  return [
    'Standard',
    'Fast 8',
    'Fast 9',
    '1 cost reroll',
    '2 cost reroll',
    '3 cost reroll',
    "I don't know",
  ].includes(compData.value.levelStrategy)
})

const isValidName = computed(() => {
  if (compData.value.name.length > 20) {
    return false
  }
  return true
})

function validateSubmitOne(compData: CompData) {
  const checks = [
    {
      condition: compData.name === '',
      message: 'Please enter a name for your composition.',
      tabIndex: 1,
    },
    {
      condition: compData.name.length > 20,
      message: 'Name must be less than 20 characters long.',
      tabIndex: 1,
    },
    {
      condition: compData.name.length > 20,
      message: 'Name must be less than 20 characters long.',
      tabIndex: 1,
    },
    {
      condition: compData.levelStrategy === '',
      message: 'Please select a leveling strategy.',
      tabIndex: 1,
    },
    { condition: !isValid.value, message: 'Please select a valid leveling strategy.', tabIndex: 1 },
    { condition: !isValidName.value, message: 'Please input a valid name.', tabIndex: 1 },
  ]

  for (const check of checks) {
    if (check.condition) {
      alert(check.message)
      tabTracker.value = check.tabIndex
      return false
    }
  }
  tabTracker.value = 2

  compositionStore.setCompData(compData)

  return true
}

function validateSubmitTwo(board: Field[]) {
  let championCounter = 0
  for (const field of board) {
    if (field.champion !== null) {
      championCounter++
    }
  }
  if (championCounter < 1) {
    alert('Please place at least one champion on the board.')
    tabTracker.value = 2
    return false
  }
  if (championCounter > 10) {
    alert('Please place no more than 10 champions on the board.')
    tabTracker.value = 2
    return false
  }
  return true
}

// flow control
const boardStore = useBoardStore()
const skipStepOne = ref(false)
const skipStepTwo = ref(false)
const tabTracker = ref(1)
provide('tabTracker', tabTracker)
const unlockTabs = ref(false)

function changeTab(index: number) {
  if (index < tabTracker.value) {
    tabTracker.value = index
    return
  }
  if (index === 1) {
    tabTracker.value = index
    return
  }
  if (index === 2) {
    if (!validateSubmitOne(compData.value)) {
      tabTracker.value = 1
      return
    }
    if (skipStepOne.value) {
      tabTracker.value = index
      return
    }
    const stepOne = validateSubmitOne(compData.value)
    if (stepOne) {
      tabTracker.value = index
      skipStepOne.value = true
      return
    }
  }
  if (index === 3) {
    if (!validateSubmitOne(compData.value)) {
      tabTracker.value = 1
      return
    }
    if (!validateSubmitOne(compData.value)) {
      alert('Please fill out the form before proceeding.')
      tabTracker.value = 1
      return
    }
    if (skipStepTwo.value) {
      tabTracker.value = index
      return
    }
    const stepTwo = validateSubmitTwo(boardStore.board)
    if (stepTwo) {
      tabTracker.value = index
      skipStepTwo.value = false
      return
    }
  }
  if (index === 4) {
    if (!validateSubmitOne(compData.value)) {
      alert('Please fill out the form before proceeding.')
      tabTracker.value = 1
      return
    }
    if (!validateSubmitTwo(boardStore.board) && tabTracker.value < 3) {
      alert('Please finish setting up your board before proceeding.')
      tabTracker.value = 2
      return
    }
    unlockTabs.value = true
    tabTracker.value = index
  }
  if (index === 5) {
    if (!unlockTabs.value) {
      alert('Please finish setting up your composition before proceeding.')
      return
    }
    tabTracker.value = index
  }
}
</script>

<template>
  <div class="flex-col justify-items-center pt-5 min-h-screen px-4 bg-base-200">
    <div class="tabs tabs-lift w-full max-w-4xl">
      <!-- Tab 1 -->

      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 1"
        :checked="tabTracker === 1"
        @change="tabTracker = 1"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="changeTab(1)">Info</li>
            <li class="step" @click="changeTab(2)">Board</li>
            <li class="step" @click="changeTab(3)">Items</li>
            <li class="step" @click="changeTab(4)">Priority</li>
            <li class="step" @click="changeTab(5)">Confirm</li>
          </ul>
        </div>
        <div class="mt-5 flex-col gap-2 w-full justify-items-center">
          <fieldset class="fieldset w-full md:w-1/2 flex-col gap-2 justify-items-center">
            <legend class="fieldset-legend text-center">What is the name of your comp?</legend>

            <input type="text" class="input" placeholder="Type here" v-model="compData.name" />
            <p class="text-sm text-error text-center">
              {{ isValidName ? '' : 'Name is too long.' }}
            </p>
          </fieldset>
          <fieldset class="fieldset w-full md:w-1/2 flex-col gap-2 justify-items-center">
            <legend class="fieldset-legend text-center">What is the leveling strategy?</legend>
            <input
              type="text"
              class="input"
              placeholder="Select a leveling strategy"
              list="leveling-patterns"
              v-model="compData.levelStrategy"
            />
            <datalist id="leveling-patterns">
              <option value="Standard"></option>
              <option value="Fast 8"></option>
              <option value="Fast 9"></option>
              <option value="1 cost reroll"></option>
              <option value="2 cost reroll"></option>
              <option value="3 cost reroll"></option>
              <option value="I don't know"></option>
            </datalist>
            <p class="text-sm text-error text-center">
              {{ isValid ? '' : 'Please select a valid leveling strategy' }}
            </p>
          </fieldset>
        </div>
        <div class="w-full flex justify-center mt-5">
          <button
            class="btn btn-primary align-right"
            @click="changeTab(2)"
            :disabled="!isValid || !isValidName"
          >
            Next Step
          </button>
        </div>
      </div>

      <!-- Tab 2 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 2"
        :checked="tabTracker === 2"
        @change="tabTracker = 2"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="changeTab(1)">Info</li>
            <li class="step step-primary" @click="changeTab(2)">Board</li>
            <li class="step" @click="changeTab(3)">Items</li>
            <li class="step" @click="changeTab(4)">Priority</li>
            <li class="step" @click="changeTab(5)">Confirm</li>
          </ul>
        </div>
        <div class="text-center">
          <div class="mt-5 text-right"></div>

          Drag the champions onto the board and build your end-board. <br />
          Double click to remove a champion from the board.
          <BoardSim @change-tab="changeTab" />
        </div>
      </div>

      <!-- Tab 3 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 3"
        :checked="tabTracker === 3"
        @change="tabTracker = 3"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="changeTab(1)">Info</li>
            <li class="step step-primary" @click="changeTab(2)">Board</li>
            <li class="step step-primary" @click="changeTab(3)">Items</li>
            <li class="step" @click="changeTab(4)">Priority</li>
            <li class="step" @click="changeTab(5)">Confirm</li>
          </ul>
        </div>
        <div class="mt-5 text-center"><ChampionItems /></div>
      </div>

      <!-- Tab 4 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 4"
        :checked="tabTracker === 4"
        @change="tabTracker = 4"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="changeTab(1)">Info</li>
            <li class="step step-primary" @click="changeTab(2)">Board</li>
            <li class="step step-primary" @click="changeTab(3)">Items</li>
            <li class="step step-primary" @click="changeTab(4)">Priority</li>
            <li class="step" @click="changeTab(5)">Confirm</li>
          </ul>
        </div>
        <div class="mt-5 text-center"><ItemPriority /></div>
      </div>

      <!-- Tab 5 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 5"
        :checked="tabTracker === 5"
        @change="tabTracker = 5"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="changeTab(1)">Info</li>
            <li class="step step-primary" @click="changeTab(2)">Board</li>
            <li class="step step-primary" @click="changeTab(3)">Items</li>
            <li class="step step-primary" @click="changeTab(4)">Priority</li>
            <li class="step step-primary" @click="changeTab(5)">Confirm</li>
          </ul>
        </div>
        <div class="mt-5 text-center">
          <h3 class="text-2xl mb-2">You're almost done!</h3>
          <p class="text-sm mb-4">
            You're free to go back using the numbers above and make any last minute changes.
            <br />When you're ready, click the button below to save your build.
          </p>
          <ReviewData />
          <button class="btn btn-secondary">Save Build</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step {
  cursor: pointer;
}
</style>
