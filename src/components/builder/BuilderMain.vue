<script setup lang="ts">
import { ref, computed } from 'vue'
import BoardSim from '@/components/builder/BoardSim.vue'
import ChampionItems from '@/components/builder/ChampionItems.vue'
import type { Field } from '@/components/builder/BoardSim.vue'

export interface CompData {
  name: string
  levelStrategy: string
}

export interface CheatSheet {
  compData: CompData
  board: Field[]
}

const compData = ref<CompData>({
  name: '',
  levelStrategy: '',
})

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

  return true
}

const tabTracker = ref(1)
</script>

<template>
  <div class="flex-col justify-items-center pt-5 min-h-screen px-4">
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
            <li class="step step-primary" @click="tabTracker = 1">Info</li>
            <li class="step" @click="tabTracker = 2">Step 2</li>
            <li class="step" @click="tabTracker = 3">Step 3</li>
            <li class="step" @click="tabTracker = 4">Step 4</li>
            <li class="step" @click="tabTracker = 5">Step 5</li>
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
            @click="validateSubmitOne(compData)"
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
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step step-primary" @click="tabTracker = 2">Step 2</li>
            <li class="step" @click="tabTracker = 3">Step 3</li>
            <li class="step" @click="tabTracker = 4">Step 4</li>
            <li class="step" @click="tabTracker = 5">Step 5</li>
          </ul>
        </div>
        <div class="text-center">
          <div class="mt-5 text-right"></div>

          Drag the champions onto the board and build your end-board. <br />
          Double click to remove a champion from the board.
          <BoardSim />
          <button class="btn btn-secondary mt-4" @click="() => console.log('Get Board')">
            Get Board
          </button>
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
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step step-primary" @click="tabTracker = 2">Step 2</li>
            <li class="step step-primary" @click="tabTracker = 3">Step 3</li>
            <li class="step" @click="tabTracker = 4">Step 4</li>
            <li class="step" @click="tabTracker = 5">Step 5</li>
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
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step step-primary" @click="tabTracker = 2">Step 2</li>
            <li class="step step-primary" @click="tabTracker = 3">Step 3</li>
            <li class="step step-primary" @click="tabTracker = 4">Step 4</li>
            <li class="step" @click="tabTracker = 5">Step 5</li>
          </ul>
        </div>
        <div class="mt-5 text-center">Content for Tab 4</div>
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
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step step-primary" @click="tabTracker = 2">Step 2</li>
            <li class="step step-primary" @click="tabTracker = 3">Step 3</li>
            <li class="step step-primary" @click="tabTracker = 4">Step 4</li>
            <li class="step step-primary" @click="tabTracker = 5">Step 5</li>
          </ul>
        </div>
        <div class="mt-5 text-center">Content for Tab 5</div>
      </div>
    </div>
  </div>
</template>
